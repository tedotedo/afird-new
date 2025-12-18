'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { resizeImageForAnalysis, convertToBase64 } from '@/services/imageService';
import { analyzeFoodImage } from '@/services/geminiService';
import { FoodAnalysisResult } from '@/types/nutrition';
import ChristmasLoading from '@/components/ChristmasLoading';

export default function CameraScreen() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [cameraStarted, setCameraStarted] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  const INSTALL_SNOOZE_KEY = 'pwaInstallDismissedUntil';
  const INSTALL_HIDE_KEY = 'pwaInstallHideForever';
  const PROMPT_COOLDOWN_DAYS = 7;

  useEffect(() => {
    // Detect if app is already installed / standalone; show prompt otherwise (respect snooze/forever hide)
    if (typeof window !== 'undefined') {
      const isStandalone = window.matchMedia?.('(display-mode: standalone)').matches || (window.navigator as any).standalone;
      if (isStandalone) {
        setShowInstallPrompt(false);
        return;
      }
      try {
        const hideForever = localStorage.getItem(INSTALL_HIDE_KEY) === 'true';
        if (hideForever) {
          setShowInstallPrompt(false);
          return;
        }
        const dismissedUntil = parseInt(localStorage.getItem(INSTALL_SNOOZE_KEY) || '0', 10);
        const now = Date.now();
        if (dismissedUntil && dismissedUntil > now) {
          setShowInstallPrompt(false);
          return;
        }
      } catch (e) {
        // If storage unavailable, fall back to showing prompt
      }
      setShowInstallPrompt(true);
    }
  }, []);

  useEffect(() => {
    if (cameraStarted) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode, cameraStarted]);

  const startCamera = async () => {
    try {
      stopCamera(); // Stop any existing stream
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setError(null);
      }
    } catch (err: any) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please grant camera permissions and try again.');
      setCameraStarted(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleCapture = async () => {
    if (!videoRef.current) return;

    try {
      setAnalyzing(true);
      setError(null);

      // Create canvas and capture frame
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      ctx.drawImage(videoRef.current, 0, 0);
      
      // Convert to blob then to File
      canvas.toBlob(async (blob) => {
        if (!blob) {
          throw new Error('Failed to capture image');
        }
        
        // Check file size (50 MB limit for Supabase free tier)
        const maxSize = 50 * 1024 * 1024; // 50 MB in bytes
        if (blob.size > maxSize) {
          setError(`Image is too large. Maximum file size is 50 MB. Your image is ${(blob.size / (1024 * 1024)).toFixed(2)} MB.`);
          setAnalyzing(false);
          return;
        }
        
        const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
        await processImage(file, canvas.toDataURL('image/jpeg'));
      }, 'image/jpeg', 0.9);
    } catch (err: any) {
      console.error('Error capturing photo:', err);
      setError('Failed to capture photo. Please try again.');
      setAnalyzing(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (50 MB limit for Supabase free tier)
      const maxSize = 50 * 1024 * 1024; // 50 MB in bytes
      if (file.size > maxSize) {
        setError(`Image is too large. Maximum file size is 50 MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)} MB.`);
        return;
      }

      setAnalyzing(true);
      setError(null);
      
      // Create data URL for display
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        await processImage(file, dataUrl);
      };
      reader.onerror = () => {
        setError('Failed to read file');
        setAnalyzing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (file: File, originalDataUrl: string) => {
    try {
      // Resize image for API optimization
      const resized = await resizeImageForAnalysis(file, 1024);

      // Convert to base64
      const base64 = await convertToBase64(resized.dataUrl);

      // Analyze with Gemini
      const nutritionalData = await analyzeFoodImage(base64, resized.mimeType);

      // Create result with current date/time (use resized preview to keep storage small)
      const result: FoodAnalysisResult = {
        imageUri: resized.dataUrl,
        dateTime: new Date(),
        nutritionalData,
      };

      // Create a File from the resized image for saving
      const imageBlob = await (await fetch(resized.dataUrl)).blob();
      const imageFile = new File([imageBlob], 'food-photo.jpg', { type: resized.mimeType || 'image/jpeg' });
      const objectUrl = URL.createObjectURL(imageFile);

      try {
        // Store result and lightweight file reference in sessionStorage
        sessionStorage.setItem('analysisResult', JSON.stringify(result));
        sessionStorage.setItem('analysisImageFile', JSON.stringify({
          objectUrl,
          name: 'food-photo.jpg',
          type: imageFile.type,
        }));
      } catch (storageErr: any) {
        console.error('Failed to store analysis data', storageErr);
        URL.revokeObjectURL(objectUrl);
        setError('Could not save analysis data locally (browser storage limit). Try a smaller or closer photo, then retry.');
        setAnalyzing(false);
        return;
      }

      router.push('/results');
    } catch (err: any) {
      console.error('Error processing image:', err);
      const errorMessage = err.message || 'Failed to analyze food image. Please try again.';
      setError(errorMessage);
      
      // If it's a quota error, provide additional guidance
      if (errorMessage.toLowerCase().includes('quota')) {
        setTimeout(() => {
          setError(null);
        }, 10000); // Auto-dismiss after 10 seconds for quota errors
      }
    } finally {
      setAnalyzing(false);
    }
  };

  const toggleCameraFacing = () => {
    setFacingMode(current => current === 'user' ? 'environment' : 'user');
  };

  const handleDismissInstallPrompt = (forever = false) => {
    try {
      if (forever) {
        localStorage.setItem(INSTALL_HIDE_KEY, 'true');
        localStorage.removeItem(INSTALL_SNOOZE_KEY);
      } else {
        const snoozeUntil = Date.now() + PROMPT_COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
        localStorage.setItem(INSTALL_SNOOZE_KEY, snoozeUntil.toString());
      }
    } catch (e) {
      // Ignore storage errors
    }
    setShowInstallPrompt(false);
  };

  if (analyzing) {
    return <ChristmasLoading />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex-1 relative pb-24 sm:pb-16">
        {cameraStarted ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-slate-900 to-black flex items-center justify-center px-6 text-center">
            <div className="space-y-4 max-w-md">
              <h1 className="text-2xl font-bold text-white">Food Nutrition Analyzer</h1>
              <p className="text-sm text-slate-200">
                We’ll ask for camera access when you tap Start. If prompted, choose “Always Allow” to skip repeated prompts.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setCameraStarted(true);
                    setError(null);
                  }}
                  className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition shadow-lg"
                >
                  Start camera
                </button>
                <label className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white cursor-pointer hover:bg-opacity-20 transition backdrop-blur-sm border border-white/10">
                  <span className="text-sm font-semibold">Or pick from gallery</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>
              {showInstallPrompt && (
                <div className="mt-2 w-full text-left bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-slate-100">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold">Add to Home Screen</p>
                      <p className="text-xs text-slate-200 mt-1">
                        iPhone: Share → “Add to Home Screen”. Android (Chrome): ⋮ → “Add to Home screen”.
                      </p>
                    </div>
                    <button
                      onClick={() => handleDismissInstallPrompt()}
                      className="text-xs text-slate-200 hover:text-white"
                    >
                      Dismiss
                    </button>
                  </div>
                  <button
                    onClick={() => handleDismissInstallPrompt(true)}
                    className="mt-2 text-xs text-slate-200 underline hover:text-white"
                  >
                    Don’t show again
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 flex flex-col pointer-events-none">
          {cameraStarted && (
            <div className="bg-gradient-to-b from-black/70 to-transparent p-6 pt-16 text-center">
              <h1 className="text-2xl font-bold text-white drop-shadow">Food Nutrition Analyzer</h1>
            </div>
          )}

          <div className="flex-1"></div>

          <div className="bg-gradient-to-t from-black/80 via-black/60 to-black/20 p-4 pb-4 sm:pb-6 pointer-events-auto">
            <div className="flex justify-around items-center gap-2">
              <label className="px-3 py-2 sm:px-4 rounded-lg bg-white bg-opacity-20 text-white cursor-pointer hover:bg-opacity-30 transition backdrop-blur-sm">
                <span className="text-xs sm:text-sm font-semibold">Gallery</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>

              <button
                onClick={handleCapture}
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center hover:scale-105 transition shadow-2xl z-10 relative disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={analyzing || !cameraStarted}
                style={{
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 4px 6px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-500"></div>
              </button>

              <button
                onClick={toggleCameraFacing}
                className="px-3 py-2 sm:px-4 rounded-lg bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition backdrop-blur-sm disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={!cameraStarted}
              >
                <span className="text-xs sm:text-sm font-semibold">Flip</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded">
          <p>{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-sm underline"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

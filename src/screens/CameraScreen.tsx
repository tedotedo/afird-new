'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { resizeImageForAnalysis, convertToBase64 } from '@/services/imageService';
import { analyzeFoodImage } from '@/services/geminiService';
import { FoodAnalysisResult } from '@/types/nutrition';
import ChristmasLoading from '@/components/ChristmasLoading';

const INSTALL_SNOOZE_KEY = 'pwaInstallDismissedUntil';
const INSTALL_HIDE_KEY = 'pwaInstallHideForever';
const PROMPT_COOLDOWN_DAYS = 7;
const CAMERA_USED_KEY = 'cameraPermissionGranted';

export default function CameraScreen() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const topGalleryInputRef = useRef<HTMLInputElement>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [cameraStarted, setCameraStarted] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [checkingPermission, setCheckingPermission] = useState(true);

  const handleGalleryClick = () => {
    if (galleryInputRef.current) {
      galleryInputRef.current.click();
    }
  };

  const handleTopGalleryClick = () => {
    if (topGalleryInputRef.current) {
      topGalleryInputRef.current.click();
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if camera permission was previously granted and auto-start
      const checkCameraPermission = async () => {
        try {
          const hasUsedCamera = localStorage.getItem(CAMERA_USED_KEY) === 'true';

          if (hasUsedCamera && navigator.permissions) {
            const permission = await navigator.permissions.query({ name: 'camera' as PermissionName });
            if (permission.state === 'granted') {
              // Permission already granted, auto-start camera
              setCameraStarted(true);
            }
          }
        } catch {
          // Permissions API not supported or error, show manual start
        } finally {
          setCheckingPermission(false);
        }
      };

      checkCameraPermission();

      // Detect if app is already installed / standalone; show prompt otherwise (respect snooze/forever hide)
      const isStandalone = window.matchMedia?.('(display-mode: standalone)').matches || (window.navigator as any).standalone;
      if (!isStandalone) {
        try {
          const hideForever = localStorage.getItem(INSTALL_HIDE_KEY) === 'true';
          if (!hideForever) {
            const dismissedUntil = parseInt(localStorage.getItem(INSTALL_SNOOZE_KEY) || '0', 10);
            const now = Date.now();
            if (!dismissedUntil || dismissedUntil <= now) {
              setShowInstallPrompt(true);
            }
          }
        } catch {
          // If storage unavailable, fall back to showing prompt
          setShowInstallPrompt(true);
        }
      }
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

        // Remember that camera permission was granted for future visits
        try {
          localStorage.setItem(CAMERA_USED_KEY, 'true');
        } catch {
          // Ignore storage errors
        }
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

  if (analyzing || checkingPermission) {
    return <ChristmasLoading />;
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black overflow-hidden flex flex-col">
      <div className="flex-1 relative min-h-0 overflow-hidden">
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
              <h1 className="text-2xl font-bold text-white">ARFID Wellness Tracker</h1>
              <p className="text-sm text-slate-200">
                We'll ask for camera access when you tap Start. If prompted, choose "Always Allow" to skip repeated prompts.
              </p>
              
              {/* Photography Tips */}
              <div className="bg-blue-900/40 border border-blue-400/30 rounded-lg p-4 backdrop-blur-sm text-left">
                <h3 className="text-sm font-semibold text-blue-100 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  Tips for Best Accuracy
                </h3>
                <ul className="space-y-1.5 text-xs text-blue-50">
                  <li className="flex gap-2">
                    <span className="text-blue-300 flex-shrink-0">•</span>
                    <span>Take photo from <strong>directly above</strong> the food</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-300 flex-shrink-0">•</span>
                    <span>Include a <strong>fork, coin, or hand</strong> for scale</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-300 flex-shrink-0">•</span>
                    <span>Photograph <strong>before mixing or eating</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-300 flex-shrink-0">•</span>
                    <span>You can add notes about hidden ingredients after</span>
                  </li>
                </ul>
              </div>
              
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
                <button
                  onClick={handleTopGalleryClick}
                  type="button"
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white hover:bg-opacity-20 transition backdrop-blur-sm border border-white/10 cursor-pointer"
                >
                  <span className="text-sm font-semibold">Or pick from gallery</span>
                </button>
                <input
                  ref={topGalleryInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
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
        
        {/* Title overlay when camera is active */}
        {cameraStarted && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-6 pt-16 text-center pointer-events-none">
            <h1 className="text-2xl font-bold text-white drop-shadow">ARFID Wellness Tracker</h1>
          </div>
        )}
      </div>

      {/* Bottom controls - always visible, not overlapping */}
      <div className="flex-shrink-0 bg-black px-4 py-3 pb-[max(env(safe-area-inset-bottom),12px)]">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleGalleryClick}
            type="button"
            className="px-4 py-2.5 rounded-lg bg-white/20 text-white cursor-pointer hover:bg-white/30 transition backdrop-blur-sm"
          >
            <span className="text-sm font-semibold">Gallery</span>
          </button>
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            onClick={handleCapture}
            className="w-18 h-18 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center hover:scale-105 transition shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={analyzing || !cameraStarted}
            style={{
              width: '72px',
              height: '72px',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 4px 6px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="w-14 h-14 rounded-full bg-blue-500"></div>
          </button>

          <button
            onClick={toggleCameraFacing}
            className="px-4 py-2.5 rounded-lg bg-white/20 text-white hover:bg-white/30 transition backdrop-blur-sm disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={!cameraStarted}
          >
            <span className="text-sm font-semibold">Flip</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
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

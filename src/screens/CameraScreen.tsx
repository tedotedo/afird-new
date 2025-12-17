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

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

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
      setError('Unable to access camera. Please grant camera permissions.');
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

      // Create result with current date/time
      const result: FoodAnalysisResult = {
        imageUri: originalDataUrl, // Use original for display
        dateTime: new Date(),
        nutritionalData,
      };

      // Store result and image file in sessionStorage
      sessionStorage.setItem('analysisResult', JSON.stringify(result));
      
      // Convert data URL to File for saving
      const response = await fetch(originalDataUrl);
      const blob = await response.blob();
      const imageFile = new File([blob], 'food-photo.jpg', { type: 'image/jpeg' });
      
      // Store file info (we'll convert back to File in ResultsScreen)
      sessionStorage.setItem('analysisImageFile', JSON.stringify({
        dataUrl: originalDataUrl,
        name: 'food-photo.jpg',
        type: 'image/jpeg',
      }));

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

  if (analyzing) {
    return <ChristmasLoading />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex-1 relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 flex flex-col">
          <div className="bg-black bg-opacity-50 p-6 pt-16 text-center">
            <h1 className="text-2xl font-bold text-white">Food Nutrition Analyzer</h1>
          </div>

          <div className="flex-1"></div>

          <div className="bg-black bg-opacity-50 p-4 pb-32 sm:pb-12 pb-safe">
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
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center hover:scale-105 transition shadow-2xl z-10 relative"
                disabled={analyzing}
                style={{
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 4px 6px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-blue-500"></div>
              </button>

              <button
                onClick={toggleCameraFacing}
                className="px-3 py-2 sm:px-4 rounded-lg bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition backdrop-blur-sm"
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

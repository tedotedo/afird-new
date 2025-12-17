import React from 'react';

interface FoodImageDisplayProps {
  imageUri: string;
}

export default function FoodImageDisplay({ imageUri }: FoodImageDisplayProps) {
  return (
    <div className="w-full h-72 rounded-2xl overflow-hidden bg-gray-200 mb-5 shadow-lg">
      <img
        src={imageUri}
        alt="Food"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

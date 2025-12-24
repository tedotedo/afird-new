import React from 'react';

const DisclaimerBanner = () => {
    return (
        <div className="bg-yellow-100 border-b border-yellow-200 p-4">
            <div className="container mx-auto px-4 text-center">
                <p className="text-yellow-800 text-sm font-medium flex items-center justify-center gap-2">
                    <span className="text-lg">⚠️</span>
                    <span>
                        <strong>Medical Disclaimer:</strong> This application is for tracking and educational purposes only.
                        It is not a substitute for professional medical advice, diagnosis, or treatment.
                    </span>
                </p>
            </div>
        </div>
    );
};

export default DisclaimerBanner;

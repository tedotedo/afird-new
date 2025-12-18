import React from 'react';
import { NutrientInfo } from '@/data/nutritionInfo';

interface NutrientDetailCardProps {
  nutrient: NutrientInfo;
  onClose: () => void;
}

export default function NutrientDetailCard({ nutrient, onClose }: NutrientDetailCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'vitamin':
        return 'from-green-500 to-green-600';
      case 'mineral':
        return 'from-purple-500 to-purple-600';
      case 'macronutrient':
        return 'from-blue-500 to-blue-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vitamin':
        return '🍊';
      case 'mineral':
        return '💎';
      case 'macronutrient':
        return '🥗';
      default:
        return '📊';
    }
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'WHO':
        return 'bg-blue-100 text-blue-800';
      case 'NIH':
        return 'bg-purple-100 text-purple-800';
      case 'Mayo Clinic':
        return 'bg-green-100 text-green-800';
      case 'Harvard Health':
        return 'bg-red-100 text-red-800';
      case 'CDC':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto" onClick={onClose}>
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div 
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`bg-gradient-to-br ${getCategoryColor(nutrient.category)} p-6 text-white relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex items-center gap-4">
              <div className="text-5xl">{getCategoryIcon(nutrient.category)}</div>
              <div>
                <h2 className="text-3xl font-bold">{nutrient.name}</h2>
                <p className="text-white/90 mt-1 capitalize">{nutrient.category}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Function */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <span>🎯</span> What It Does
              </h3>
              <p className="text-gray-700">{nutrient.function}</p>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>✨</span> Health Benefits
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {nutrient.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Children Info */}
            {nutrient.childrenInfo && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <span>👶</span> Important for Children
                </h3>
                <p className="text-blue-800">{nutrient.childrenInfo}</p>
              </div>
            )}

            {/* Food Sources */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>🍽️</span> Food Sources
              </h3>
              <div className="flex flex-wrap gap-2">
                {nutrient.foodSources.map((source, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium">
                    {source}
                  </span>
                ))}
              </div>
            </div>

            {/* Deficiency Symptoms */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>⚠️</span> Deficiency Symptoms
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {nutrient.deficiencySymptoms.map((symptom, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-red-500 mt-1">•</span>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excess Symptoms (if applicable) */}
            {nutrient.excessSymptoms && nutrient.excessSymptoms.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>🔺</span> Excess Symptoms
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {nutrient.excessSymptoms.map((symptom, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Absorption Tips */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>💡</span> Absorption Tips
              </h3>
              <ul className="space-y-2">
                {nutrient.absorptionTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-500 mt-1">→</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>🔄</span> Interactions
              </h3>
              <ul className="space-y-2">
                {nutrient.interactions.map((interaction, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-purple-500 mt-1">→</span>
                    <span>{interaction}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Authoritative Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>🔗</span> Learn More
              </h3>
              <div className="space-y-2">
                {nutrient.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition group"
                  >
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-blue-600">
                        {link.label}
                      </p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded mt-1 inline-block ${getSourceBadgeColor(link.source)}`}>
                        {link.source}
                      </span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-xs text-yellow-800">
                <strong>Disclaimer:</strong> This information is for educational purposes only and should not replace professional medical advice. Always consult with a healthcare provider or registered dietitian for personalized nutrition guidance.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t">
            <button
              onClick={onClose}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


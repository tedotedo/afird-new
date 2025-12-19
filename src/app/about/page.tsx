'use client';

import React from 'react';
import AuthGuard from '@/components/AuthGuard';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About the Author</h1>
            <p className="text-xl text-blue-100">
              Professional expertise meets personal understanding
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl mt-8 space-y-8">
          {/* Main Bio Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Author Photo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-64 h-96 rounded-lg overflow-hidden border-4 border-indigo-200 shadow-lg">
                  <Image
                    src="/author-photo.jpg"
                    alt="Dr. Odet Aszkenasy"
                    width={256}
                    height={384}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                I qualified in medicine in London in 1982 and my early career took me through various specialties, from general adult medicine, through to paediatrics, including working with the Royal Free Hospital team in the children's kidney transplantation unit. After gaining my Diploma of the Membership and subsequently the Fellowship of the Royal College of Physicians, as well as the Diploma in Child Health, in 1996 I entered neurodevelopmental paediatrics, initially with a particular interest in childhood epilepsy and subsequently specialising in autism.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg my-8">
                <p className="text-gray-700 italic">
                  "The best approach combines scientific rigour with honest, straightforward communication. That's what I've tried to bring to this work."
                </p>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                My wife, a paediatric radiologist, and I made the then rather unconventional decision to home educate our two children. She gave up work entirely, while I scaled back to part-time NHS hours and ran a small cosmetic clinic to make ends meet. It was an intense period that gave me an insider's view of child development and autism from the other side of the consulting room desk.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Along the way, I took what some might consider a detour into public health medicine and spent some time working in the USA. It turned out to be anything but a detour. Learning epidemiology and statistics taught me how to read between the lines of medical research—to spot when a study is genuinely onto something and when it's telling us less than the headlines suggest. That skill has proved invaluable when navigating the often confusing world of autism research and emerging treatments.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                In my current work as the clinical lead for autism in a busy paediatric service in the north east of England, I meet families every week who are trying to understand their child's needs and the reasons for their difficulties. I've learned that the best approach combines scientific rigour with honest, straightforward communication. That's what I've tried to bring to this resource.
              </p>
            </div>
          </div>

          {/* Qualifications Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎓</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Qualifications & Experience</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Medical Education</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Qualified in Medicine, London (1982)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>MRCP (Member of Royal College of Physicians)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>FRCP (Fellow of Royal College of Physicians)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Diploma in Child Health</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Public Health Medicine training (USA)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Clinical Specialties</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Neurodevelopmental Paediatrics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Autism Spectrum Conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Childhood Epilepsy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Paediatric Kidney Transplantation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Epidemiology & Medical Statistics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Current Role Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👨‍⚕️</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Current Work</h2>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              As Clinical Lead for Autism in a busy paediatric service in the North East of England, I work directly with families navigating the challenges of neurodevelopmental conditions, including ARFID. This frontline experience, combined with my background in epidemiology and research interpretation, allows me to bridge the gap between clinical evidence and practical family support.
            </p>

            <div className="bg-green-50 rounded-lg p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Why This App?</h3>
              <p className="text-gray-700">
                Through my clinical work and personal experience as a parent, I've seen firsthand how crucial it is for families to track nutritional intake and growth patterns, particularly for children with ARFID. This app is designed to give families the tools they need to monitor their child's nutrition while providing access to evidence-based information and support resources. It combines the scientific understanding I've developed over four decades in medicine with the practical insights gained from raising my own children and supporting countless families in clinical practice.
              </p>
            </div>
          </div>

          {/* Personal Insight Section */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl text-white">👨‍👩‍👧‍👦</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">A Personal Perspective</h2>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Home educating our two children while maintaining clinical work gave me a unique vantage point. I wasn't just observing child development and neurodiversity from the consulting room—I was living it daily. This dual perspective has profoundly shaped how I approach supporting families. I understand both the clinical complexities and the everyday realities of supporting a child with additional needs.
            </p>

            <p className="text-gray-700 italic">
              The intense period of juggling part-time NHS work, running a cosmetic clinic, and being deeply involved in our children's education taught me that there's no one-size-fits-all approach. Every family is different, every child is unique, and the best support comes from combining evidence-based practice with genuine understanding and flexibility.
            </p>
          </div>

          {/* Closing Message */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Supporting Your Journey</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Whether you're a parent navigating ARFID for the first time or a professional seeking better tools to support families, I hope this app provides you with the practical resources and evidence-based information you need. My goal is to make the complex world of nutritional monitoring and growth tracking accessible, understandable, and genuinely helpful.
            </p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}


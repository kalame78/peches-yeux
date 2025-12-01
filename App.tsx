import React, { useState } from 'react';
import { Eye, Shield, BookOpen, Layers, Brain } from 'lucide-react';
import IntroSection from './components/IntroSection';
import AwrahSimulator from './components/AwrahSimulator';
import EvilEyeModule from './components/EvilEyeModule';
import FlashcardsModule from './components/FlashcardsModule';
import Chatbot from './components/Chatbot';

enum Tab {
  Intro = 'intro',
  Simulator = 'simulator',
  EvilEye = 'evileye',
  Flashcards = 'flashcards'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Intro);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20 relative">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg text-white">
              <Eye size={24} />
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900 tracking-tight leading-none">Les Péchés des Yeux</h1>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Fiche Interactive n°8</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-gray-200/50 p-1.5 rounded-xl md:inline-flex overflow-x-auto">
          <button
            onClick={() => setActiveTab(Tab.Intro)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === Tab.Intro
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            }`}
          >
            <BookOpen size={18} />
            Définitions
          </button>
          <button
            onClick={() => setActiveTab(Tab.Simulator)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === Tab.Simulator
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            }`}
          >
            <Layers size={18} />
            Simulateur
          </button>
          <button
            onClick={() => setActiveTab(Tab.EvilEye)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === Tab.EvilEye
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            }`}
          >
            <Shield size={18} />
            Mauvais Œil
          </button>
          <button
            onClick={() => setActiveTab(Tab.Flashcards)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === Tab.Flashcards
                ? 'bg-white text-amber-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            }`}
          >
            <Brain size={18} />
            Flashcards
          </button>
        </div>

        {/* Content Render */}
        <div className="min-h-[500px]">
          {activeTab === Tab.Intro && <IntroSection />}
          {activeTab === Tab.Simulator && <AwrahSimulator />}
          {activeTab === Tab.EvilEye && <EvilEyeModule />}
          {activeTab === Tab.Flashcards && <FlashcardsModule />}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t mt-12 py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>Basé sur la Fiche N°8 - Les Péchés des Yeux.</p>
          <p className="mt-1">Application éducative.</p>
        </div>
      </footer>

      {/* Global Chatbot Widget */}
      <Chatbot />
    </div>
  );
};

export default App;
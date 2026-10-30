import React, { useState } from 'react';
import Header from './components/Header';
import VisionInspector from './components/VisionInspector';
import FoodRecognitionTab from './components/FoodRecognitionTab';
import FreshnessDetectionTab from './components/FreshnessDetectionTab';
import HygieneMonitoringTab from './components/HygieneMonitoringTab';
import CookingAssistantTab from './components/CookingAssistantTab';
import PersonalizedNutritionTab from './components/PersonalizedNutritionTab';
import AnalyticsTab from './components/AnalyticsTab';
import ExplainReasoningModal from './components/ExplainReasoningModal';
import { FOOD_PRESETS } from './data/foodData';

export default function App() {
  const [activeTab, setActiveTab] = useState('recognition');
  const [selectedPreset, setSelectedPreset] = useState(FOOD_PRESETS[0]);
  const [selectedBoxId, setSelectedBoxId] = useState(FOOD_PRESETS[0].bboxes[0]?.id || null);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isReasoningModalOpen, setIsReasoningModalOpen] = useState(false);
  const [isLiveCamActive, setIsLiveCamActive] = useState(false);

  // Web Speech API helper
  const speakText = (text) => {
    if (!isVoiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  const handleSelectPreset = (newPreset) => {
    setSelectedPreset(newPreset);
    setSelectedBoxId(newPreset.bboxes[0]?.id || null);
    if (speakText) {
      speakText(`Loaded scenario: ${newPreset.name}`);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedPreset={selectedPreset}
        setSelectedPreset={handleSelectPreset}
        presets={FOOD_PRESETS}
        isVoiceEnabled={isVoiceEnabled}
        setIsVoiceEnabled={setIsVoiceEnabled}
        onOpenReasoningModal={() => setIsReasoningModalOpen(true)}
        onOpenLiveCam={() => setIsLiveCamActive(prev => !prev)}
        isLiveCamActive={isLiveCamActive}
      />

      {/* Main Container */}
      <main style={{
        maxWidth: 1440,
        margin: '0 auto',
        padding: '24px 24px 60px 24px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }}>
        {/* Upper Core: Vision Inspector & Multimodal Stream */}
        <section aria-label="Computer Vision Multimodal Inspector">
          <VisionInspector
            preset={selectedPreset}
            selectedBoxId={selectedBoxId}
            setSelectedBoxId={setSelectedBoxId}
            presets={FOOD_PRESETS}
            onSelectPreset={handleSelectPreset}
            speakText={speakText}
            isLiveCamActive={isLiveCamActive}
            setIsLiveCamActive={setIsLiveCamActive}
          />
        </section>

        {/* Lower Core: Active Modality Tab Content */}
        <section aria-label="Food Intelligence Analysis Modules">
          {activeTab === 'recognition' && (
            <FoodRecognitionTab preset={selectedPreset} speakText={speakText} />
          )}

          {activeTab === 'freshness' && (
            <FreshnessDetectionTab preset={selectedPreset} speakText={speakText} />
          )}

          {activeTab === 'hygiene' && (
            <HygieneMonitoringTab preset={selectedPreset} speakText={speakText} />
          )}

          {activeTab === 'cooking' && (
            <CookingAssistantTab preset={selectedPreset} speakText={speakText} />
          )}

          {activeTab === 'nutrition' && (
            <PersonalizedNutritionTab preset={selectedPreset} speakText={speakText} />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsTab preset={selectedPreset} />
          )}
        </section>
      </main>

      {/* Transparent AI Reasoning Modal */}
      <ExplainReasoningModal
        isOpen={isReasoningModalOpen}
        onClose={() => setIsReasoningModalOpen(false)}
        preset={selectedPreset}
      />

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(6, 9, 19, 0.95)',
        padding: '24px 24px',
        color: 'var(--text-muted)',
        fontSize: '0.8rem'
      }}>
        <div style={{
          maxWidth: 1440,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>🥗 <strong>FoodVerse AI Platform</strong></span>
            <span>•</span>
            <span>Computer Vision & Multimodal LLM Intelligence</span>
            <span>•</span>
            <span style={{ color: 'var(--emerald-400)' }}>All 5 Modalities Active</span>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <span>USDA FoodData Central</span>
            <span>•</span>
            <span>FDA Food Code 2024</span>
            <span>•</span>
            <span>HACCP ISO 22000 Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

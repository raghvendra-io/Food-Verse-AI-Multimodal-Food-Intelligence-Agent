import React from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Eye, 
  ShieldCheck, 
  Flame, 
  Dna, 
  BarChart3, 
  Camera, 
  Cpu, 
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  selectedPreset,
  setSelectedPreset,
  presets,
  isVoiceEnabled,
  setIsVoiceEnabled,
  onOpenReasoningModal,
  onOpenLiveCam,
  isLiveCamActive
}) {
  const tabs = [
    { id: 'recognition', label: 'Food Recognition & Nutri-Vision', icon: Eye, count: '4 Items' },
    { id: 'freshness', label: 'Freshness & Spoilage AI', icon: Sparkles, count: `${selectedPreset.freshness.index}% Fresh` },
    { id: 'hygiene', label: 'Restaurant Hygiene & HACCP', icon: ShieldCheck, count: 'Grade A' },
    { id: 'cooking', label: 'Smart Cooking Coach', icon: Flame, count: 'Live Heatmap' },
    { id: 'nutrition', label: 'Personalized Nutrition Engine', icon: Dna, count: 'Adaptive' },
    { id: 'analytics', label: 'Platform Analytics', icon: BarChart3, count: 'Reports' }
  ];

  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(9, 13, 22, 0.92)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Top Bar */}
      <div style={{
        maxWidth: 1440,
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        {/* Brand identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
            fontSize: 22
          }}>
            🥗
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(90deg, #ffffff 0%, #a7f3d0 60%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                FoodVerse AI
              </span>
              <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                <span className="status-dot pulse"></span>
                MULTIMODAL v4.2
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Autonomous Food Intelligence • Freshness • HACCP Safety • Culinary Co-Pilot
            </p>
          </div>
        </div>

        {/* Global Controls & Preset Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {/* Preset Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 10,
            padding: '4px 10px'
          }}>
            <Layers size={14} color="var(--emerald-400)" />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>PRESET:</span>
            <select
              value={selectedPreset.id}
              onChange={(e) => {
                const found = presets.find(p => p.id === e.target.value);
                if (found) setSelectedPreset(found);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-main)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
                maxWidth: 200
              }}
            >
              {presets.map(p => (
                <option key={p.id} value={p.id} style={{ background: '#0f172a', color: '#fff' }}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Live Camera Button */}
          <button
            onClick={onOpenLiveCam}
            className={`btn-secondary ${isLiveCamActive ? 'badge-emerald' : ''}`}
            style={{
              padding: '6px 12px',
              fontSize: '0.8rem',
              borderColor: isLiveCamActive ? 'var(--emerald-500)' : 'var(--border-subtle)'
            }}
            title="Toggle Live Webcam or Custom Media Analysis"
          >
            <Camera size={15} color={isLiveCamActive ? 'var(--emerald-400)' : 'var(--text-muted)'} />
            <span>{isLiveCamActive ? 'Camera Active' : 'Live Camera / Upload'}</span>
          </button>

          {/* Voice Guidance Toggle */}
          <button
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className="btn-icon"
            title={isVoiceEnabled ? 'Voice Guidance Active (Click to Mute)' : 'Voice Guidance Muted (Click to Enable)'}
            style={{
              borderColor: isVoiceEnabled ? 'var(--emerald-500)' : 'var(--border-subtle)',
              color: isVoiceEnabled ? 'var(--emerald-400)' : 'var(--text-dim)'
            }}
          >
            {isVoiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Explain Reasoning Button */}
          <button
            onClick={onOpenReasoningModal}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            <Cpu size={14} color="var(--cyan-400)" />
            <span>AI Reasoning</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav style={{
        maxWidth: 1440,
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 16px',
                background: isActive ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                border: 'none',
                borderBottom: isActive ? '3px solid var(--emerald-400)' : '3px solid transparent',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-main)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              <Icon size={16} color={isActive ? 'var(--emerald-400)' : 'var(--text-dim)'} />
              <span>{tab.label}</span>
              <span style={{
                fontSize: '0.7rem',
                padding: '1px 6px',
                borderRadius: 6,
                background: isActive ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                color: isActive ? 'var(--emerald-300)' : 'var(--text-dim)',
                fontFamily: 'var(--font-mono)'
              }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}

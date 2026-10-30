import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Thermometer, 
  ShieldAlert, 
  RefreshCw, 
  Sliders, 
  ArrowRight,
  TrendingDown,
  Info,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Droplets
} from 'lucide-react';

export default function FreshnessDetectionTab({ preset, speakText }) {
  const [agedDays, setAgedDays] = useState(0);

  // Dynamic degradation calculations based on simulated aging
  const baseFreshness = preset.freshness.index;
  const currentFreshness = Math.max(12, baseFreshness - (agedDays * 14));
  const baseShelfLife = preset.freshness.shelfLifeHoursRemaining;
  const currentShelfLife = Math.max(0, baseShelfLife - (agedDays * 24));
  const spoilageProb = Math.min(96, Math.max(2, (agedDays * 22) + 3));

  const getFreshnessColor = (score) => {
    if (score >= 80) return 'var(--emerald-400)';
    if (score >= 50) return 'var(--amber-400)';
    return 'var(--rose-400)';
  };

  const getFreshnessStatusText = (score) => {
    if (score >= 80) return 'Peak Freshness & Safe';
    if (score >= 50) return 'Moderate Senescence - Cook Promptly';
    return 'Critical Spoilage - Pathogen Hazard';
  };

  const handleSimulateAging = () => {
    const nextDays = (agedDays + 1) % 4;
    setAgedDays(nextDays);
    if (speakText) {
      if (nextDays === 0) {
        speakText(`Resetting to baseline fresh condition.`);
      } else {
        speakText(`Simulating ${nextDays * 24} hours aging. Freshness index dropped to ${Math.max(12, baseFreshness - (nextDays * 14))} percent.`);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Freshness Index Hero Card */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className="badge badge-emerald">
                <Sparkles size={13} />
                BIOCHEMICAL FRESHNESS & SPOILAGE MODEL
              </span>
              <span className="badge badge-dim">
                Spectral Senescence v2.4
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>
              {preset.name}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
              Multispectral computer vision assesses surface reflectance, chlorophyll breakdown, and moisture retention.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={handleSimulateAging}
              className="btn-secondary"
              style={{
                borderColor: agedDays > 0 ? 'var(--amber-500)' : 'var(--border-subtle)',
                color: agedDays > 0 ? 'var(--amber-400)' : 'var(--text-main)'
              }}
            >
              <RefreshCw size={14} className={agedDays > 0 ? 'status-dot pulse' : ''} />
              <span>{agedDays === 0 ? 'Simulate 24h Degradation' : `Aged +${agedDays * 24}h (Click to Advance)`}</span>
            </button>
            {agedDays > 0 && (
              <button
                onClick={() => setAgedDays(0)}
                className="btn-icon"
                title="Reset simulation to fresh"
              >
                ↺
              </button>
            )}
          </div>
        </div>

        {/* Big Freshness Gauge Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
          marginTop: 24,
          alignItems: 'center'
        }}>
          {/* Circular Score Dial */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            background: 'rgba(255, 255, 255, 0.02)',
            padding: 18,
            borderRadius: 14,
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ position: 'relative', width: 100, height: 100 }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke={getFreshnessColor(currentFreshness)}
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * currentFreshness) / 100}
                  strokeLinecap="round"
                  className="progress-ring-circle"
                />
              </svg>
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  color: getFreshnessColor(currentFreshness),
                  lineHeight: 1
                }}>
                  {currentFreshness}%
                </span>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)', fontWeight: 600 }}>SCORE</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                {getFreshnessStatusText(currentFreshness)}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
                Degradation curve: {agedDays === 0 ? 'Optimal state' : `Accelerated (+${agedDays} days)`}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: spoilageProb > 40 ? 'var(--rose-400)' : 'var(--emerald-400)',
                marginTop: 4,
                fontWeight: 600
              }}>
                Spoilage Risk: {spoilageProb}%
              </div>
            </div>
          </div>

          {/* Shelf Life Countdown */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            padding: 18,
            borderRadius: 14,
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
              <Clock size={16} color="var(--cyan-400)" />
              <span>ESTIMATED SHELF LIFE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '8px 0 4px 0' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: currentShelfLife < 12 ? 'var(--rose-400)' : 'var(--cyan-400)' }}>
                {currentShelfLife}
              </span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 600 }}>Hours Remaining</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              {currentShelfLife > 24 
                ? 'Safe for cold storage at 2°C to 4°C with minimal cellular breakdown.' 
                : 'Consume within today or flash-freeze to halt enzymatic oxidation.'}
            </p>
          </div>

          {/* Microbial Safety Index */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            padding: 18,
            borderRadius: 14,
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
              <Droplets size={16} color="var(--violet-400)" />
              <span>MICROBIAL LOAD RISK</span>
            </div>
            <div style={{ margin: '8px 0 4px 0' }}>
              <span className={`badge ${currentFreshness > 70 ? 'badge-emerald' : currentFreshness > 45 ? 'badge-amber' : 'badge-rose'}`} style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                {currentFreshness > 70 ? 'SAFE: <10² CFU/g' : currentFreshness > 45 ? 'CAUTION: Cook to 75°C' : 'CRITICAL: Discard Food'}
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 8 }}>
              Bacterial pathogen risk estimate based on volatile amine markers.
            </p>
          </div>
        </div>
      </div>

      {/* Biochemical Senescence Parameters Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16
      }}>
        {/* Ethylene / Volatile Emission */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
            Biochemical Senescence Markers
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Chlorophyll Degradation:</span>
              <strong style={{ color: agedDays > 0 ? 'var(--amber-400)' : 'var(--emerald-400)' }}>
                {agedDays > 0 ? `${Math.max(25, 95 - agedDays * 25)}% Retention` : preset.freshness.biochemicalMarkers.chlorophyllRetention}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Ethylene Emission (ppm):</span>
              <strong style={{ color: 'var(--text-main)' }}>
                {agedDays > 0 ? `${(0.4 * agedDays + 0.1).toFixed(2)} ppm` : preset.freshness.biochemicalMarkers.ethyleneEmission}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Surface Moisture / Turgidity:</span>
              <strong style={{ color: 'var(--cyan-400)' }}>
                {agedDays > 0 ? `${Math.max(40, 88 - agedDays * 16)}% (Desiccation)` : preset.freshness.biochemicalMarkers.surfaceMoisture}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Volatile Trimethylamine:</span>
              <strong style={{ color: agedDays >= 2 ? 'var(--rose-400)' : 'var(--emerald-400)' }}>
                {agedDays >= 2 ? '4.8 mg N/100g (Odor Spike)' : '0.4 mg N/100g (Clean)'}
              </strong>
            </div>
          </div>
        </div>

        {/* AI Storage & Actionable Protocol */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Lightbulb size={18} color="var(--amber-400)" />
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', margin: 0 }}>
              AI Storage & Preservation Protocol
            </h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
            {preset.freshness.storageAdvice}
          </p>
          <div style={{
            padding: '12px 14px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: 10,
            fontSize: '0.8rem',
            color: 'var(--emerald-300)'
          }}>
            💡 <strong>Pro Tip:</strong> By maintaining a cold-chain buffer between 0°C and 2°C with humidity dampers, you can extend safe culinary utility by an additional 48 hours.
          </div>
        </div>
      </div>

      {/* 3-Stage Visual Senescence Timeline Slider */}
      <div className="glass-panel" style={{ padding: 20 }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 16 }}>
          Freshness Progression Timeline
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 14
        }}>
          {/* Stage 1 */}
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: agedDays === 0 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.02)',
            border: agedDays === 0 ? '1px solid var(--emerald-500)' : '1px solid var(--border-subtle)',
            cursor: 'pointer'
          }} onClick={() => setAgedDays(0)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-emerald">STAGE 1</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>0-24 Hours</span>
            </div>
            <h4 style={{ fontSize: '0.95rem', margin: '8px 0 4px 0', color: '#fff' }}>Prime / Peak Fresh</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              Maximum enzymatic flavor, firm turgor, zero bacterial slime formation.
            </p>
          </div>

          {/* Stage 2 */}
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: agedDays === 1 ? 'rgba(6, 182, 212, 0.12)' : 'rgba(255, 255, 255, 0.02)',
            border: agedDays === 1 ? '1px solid var(--cyan-500)' : '1px solid var(--border-subtle)',
            cursor: 'pointer'
          }} onClick={() => setAgedDays(1)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-cyan">STAGE 2</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>24-48 Hours</span>
            </div>
            <h4 style={{ fontSize: '0.95rem', margin: '8px 0 4px 0', color: '#fff' }}>Maturity / Mild Oxidation</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              Slight surface moisture reduction. Safe to cook, recommend high-heat sear.
            </p>
          </div>

          {/* Stage 3 */}
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: agedDays >= 2 ? 'rgba(244, 63, 94, 0.12)' : 'rgba(255, 255, 255, 0.02)',
            border: agedDays >= 2 ? '1px solid var(--rose-500)' : '1px solid var(--border-subtle)',
            cursor: 'pointer'
          }} onClick={() => setAgedDays(2)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-rose">STAGE 3</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>48-72+ Hours</span>
            </div>
            <h4 style={{ fontSize: '0.95rem', margin: '8px 0 4px 0', color: '#fff' }}>Critical Senescence</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              Volatile amine production, enzymatic protein breakdown. Pathogen risk high.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

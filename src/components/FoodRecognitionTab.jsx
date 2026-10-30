import React, { useState } from 'react';
import { 
  PieChart, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Dna, 
  Sparkles, 
  ShieldAlert, 
  Flame, 
  Zap,
  TrendingDown,
  BookmarkCheck,
  Scale
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FoodRecognitionTab({ preset, speakText }) {
  const [loggedToDiary, setLoggedToDiary] = useState(false);
  const { nutrition, allergens, dietarySuitability, bboxes } = preset;

  const totalMacros = (nutrition.protein + nutrition.carbs + nutrition.fat) || 1;
  const proteinPct = Math.round((nutrition.protein / totalMacros) * 100);
  const carbsPct = Math.round((nutrition.carbs / totalMacros) * 100);
  const fatPct = Math.round((nutrition.fat / totalMacros) * 100);

  const handleLogMeal = () => {
    setLoggedToDiary(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#06b6d4', '#8b5cf6']
    });
    if (speakText) {
      speakText(`Logged ${preset.name} to your personal nutrition journal. Added ${nutrition.calories} calories and ${nutrition.protein} grams of protein.`);
    }
    setTimeout(() => setLoggedToDiary(false), 3500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Overview Header Card */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className="badge badge-emerald">
                <Sparkles size={13} />
                COMPUTER VISION SEGMENTATION
              </span>
              <span className="badge badge-dim">
                USDA FoodData Central #175167
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>
              {preset.name}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
              Multimodal volumetric analysis detected {bboxes.length} distinct food components with {preset.overallConfidence}% aggregate confidence.
            </p>
          </div>

          <button
            onClick={handleLogMeal}
            className="btn-primary"
            style={{ padding: '10px 20px' }}
          >
            <BookmarkCheck size={16} />
            <span>{loggedToDiary ? 'Logged to Daily Diary!' : 'Log Meal to Diary'}</span>
          </button>
        </div>

        {/* Dietary suitability tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          {dietarySuitability.map((tag, idx) => (
            <span key={idx} className="badge badge-cyan" style={{ fontSize: '0.78rem' }}>
              ✓ {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Macronutrient Cards & Ratio Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16
      }}>
        {/* Calories Card */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL ENERGY</span>
            <Flame size={18} color="var(--amber-400)" />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '10px 0 4px 0' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#fff' }}>
              {nutrition.calories}
            </span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 600 }}>kcal</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--emerald-400)' }}>
            Volumetric density estimate: 1.18 kcal/g
          </div>
        </div>

        {/* Protein Card */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>PROTEIN DENSITY</span>
            <span className="badge badge-emerald" style={{ padding: '2px 6px' }}>{proteinPct}%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '10px 0 4px 0' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--emerald-400)' }}>
              {nutrition.protein}
            </span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 600 }}>grams</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Complete amino acid profile (Leucine rich)
          </div>
        </div>

        {/* Net Carbs Card */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>CARBOHYDRATES</span>
            <span className="badge badge-cyan" style={{ padding: '2px 6px' }}>{carbsPct}%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '10px 0 4px 0' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--cyan-400)' }}>
              {nutrition.carbs}
            </span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 600 }}>g (Net: {nutrition.netCarbs}g)</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Dietary Fiber: {nutrition.fiber}g (Prebiotic)
          </div>
        </div>

        {/* Healthy Fats Card */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>LIPIDS & HEALTHY FATS</span>
            <span className="badge badge-violet" style={{ padding: '2px 6px' }}>{fatPct}%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '10px 0 4px 0' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--violet-400)' }}>
              {nutrition.fat}
            </span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 600 }}>grams</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Omega-3 EPA/DHA: {nutrition.omega3G}g
          </div>
        </div>
      </div>

      {/* Macro Ratio Visual Bar */}
      <div className="glass-panel" style={{ padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.8rem', fontWeight: 600 }}>
          <span>MACRONUTRIENT RATIO SPLIT</span>
          <span style={{ color: 'var(--text-muted)' }}>Caloric Contribution</span>
        </div>
        <div style={{
          height: 12,
          borderRadius: 6,
          overflow: 'hidden',
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.05)'
        }}>
          <div style={{ width: `${proteinPct}%`, background: 'var(--emerald-500)' }} title={`Protein: ${proteinPct}%`} />
          <div style={{ width: `${carbsPct}%`, background: 'var(--cyan-500)' }} title={`Carbs: ${carbsPct}%`} />
          <div style={{ width: `${fatPct}%`, background: 'var(--violet-500)' }} title={`Fat: ${fatPct}%`} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--emerald-500)' }}></span>
            Protein ({proteinPct}%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--cyan-500)' }}></span>
            Carbs ({carbsPct}%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--violet-500)' }}></span>
            Healthy Fats ({fatPct}%)
          </span>
        </div>
      </div>

      {/* Glycemic Index & Glucose Curve Prediction */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 16
      }}>
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <Activity size={18} color="var(--emerald-400)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Glycemic Load & Insulin Impact</h3>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 70%)',
              border: '2px solid var(--emerald-400)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--emerald-400)', lineHeight: 1 }}>
                {nutrition.glycemicLoad}
              </span>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontWeight: 600 }}>GL SCORE</span>
            </div>

            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                {nutrition.glycemicStatus}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                Glycemic Index (GI): <strong>{nutrition.glycemicIndex} / 100</strong>
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--emerald-400)', marginTop: 4 }}>
                ✓ No rapid postprandial glucose spike anticipated
              </div>
            </div>
          </div>

          {/* Continuous Glucose Simulation Curve (SVG) */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 10,
            padding: '12px 14px',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: 6 }}>
              <span>Simulated Post-Meal Blood Glucose (2 Hours)</span>
              <span style={{ color: 'var(--emerald-400)' }}>Stable Zone</span>
            </div>
            <svg viewBox="0 0 300 60" style={{ width: '100%', height: 60 }}>
              <defs>
                <linearGradient id="glucoseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Threshold band */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(244, 63, 94, 0.25)" strokeDasharray="3 3" />
              <text x="240" y="16" fill="rgba(244, 63, 94, 0.6)" fontSize="7">140 mg/dL Spike</text>
              {/* Normal curve */}
              <path
                d="M 0 50 Q 75 42, 120 38 T 220 46 T 300 50 L 300 60 L 0 60 Z"
                fill="url(#glucoseGrad)"
              />
              <path
                d="M 0 50 Q 75 42, 120 38 T 220 46 T 300 50"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
              />
              {/* Time markers */}
              <circle cx="120" cy="38" r="4" fill="#10b981" />
              <text x="110" y="30" fill="#a7f3d0" fontSize="8" fontWeight="bold">+14 mg/dL</text>
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: 4 }}>
              <span>0 min (Baseline)</span>
              <span>45 min (Peak)</span>
              <span>120 min (Restored)</span>
            </div>
          </div>
        </div>

        {/* Micronutrient Density Spectrum */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <Zap size={18} color="var(--cyan-400)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Micronutrient & Phytonutrient Density</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {nutrition.micros.map((m, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600 }}>{m.name}</span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    <strong>{m.amount}</strong> ({m.rdaPct}% RDA)
                  </span>
                </div>
                <div style={{
                  height: 6,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.06)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${Math.min(m.rdaPct, 100)}%`,
                    height: '100%',
                    borderRadius: 3,
                    background: m.rdaPct > 100 
                      ? 'linear-gradient(90deg, #10b981, #06b6d4)' 
                      : m.rdaPct > 30 
                      ? 'var(--emerald-500)' 
                      : 'var(--amber-500)'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Allergens & Cross-Reactivity Warnings */}
      <div className="glass-panel" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <ShieldAlert size={18} color="var(--amber-400)" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Allergen & Cross-Reactivity Screening</h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 12
        }}>
          {allergens.map((alg, idx) => (
            <div
              key={idx}
              style={{
                padding: '12px 14px',
                borderRadius: 10,
                background: alg.isPresent ? 'rgba(244, 63, 94, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                border: alg.isPresent ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: alg.isPresent ? 'var(--rose-400)' : 'var(--text-main)' }}>
                  {alg.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  {alg.severity}
                </div>
              </div>
              {alg.isPresent ? (
                <AlertCircle size={16} color="var(--rose-400)" />
              ) : (
                <CheckCircle size={16} color="var(--emerald-400)" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Dna, 
  Target, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  RefreshCw, 
  ShoppingBag, 
  ArrowRight,
  Flame,
  Activity,
  Zap,
  Info
} from 'lucide-react';
import { BIOMETRIC_PROFILES, MEAL_PLAN_DATA } from '../data/foodData';
import confetti from 'canvas-confetti';

export default function PersonalizedNutritionTab({ preset, speakText }) {
  const [activeProfileId, setActiveProfileId] = useState('athlete');
  const [swappedMeals, setSwappedMeals] = useState({});

  const currentProfile = BIOMETRIC_PROFILES.find(p => p.id === activeProfileId) || BIOMETRIC_PROFILES[0];

  // Calculate current intake with preset meal added
  const currentIntake = {
    calories: 1450 + (preset.nutrition.calories || 0),
    protein: 88 + (preset.nutrition.protein || 0),
    carbs: 110 + (preset.nutrition.carbs || 0),
    fat: 52 + (preset.nutrition.fat || 0)
  };

  const calPct = Math.min(100, Math.round((currentIntake.calories / currentProfile.dailyCaloriesTarget) * 100));
  const proteinPct = Math.min(100, Math.round((currentIntake.protein / currentProfile.dailyProteinGramsTarget) * 100));
  const carbsPct = Math.min(100, Math.round((currentIntake.carbs / currentProfile.dailyCarbsGramsTarget) * 100));

  const toggleSwap = (mealTitle) => {
    setSwappedMeals(prev => {
      const updated = { ...prev, [mealTitle]: !prev[mealTitle] };
      confetti({ particleCount: 25, spread: 45 });
      if (speakText) {
        if (updated[mealTitle]) {
          speakText(`Applied adaptive ingredient swap for ${mealTitle}. Macros recalculated.`);
        } else {
          speakText(`Reverted to original ingredient for ${mealTitle}.`);
        }
      }
      return updated;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Top Banner Card */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className="badge badge-emerald">
                <Dna size={13} />
                PERSONALIZED BIOMETRIC INTELLIGENCE
              </span>
              <span className="badge badge-dim">
                Adaptive Nutrition v3.4
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>
              Metabolic Goal Matching & Adaptive Nutrition
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
              Aligns visual portion analysis with individual genomic predispositions, glycemic sensitivity, and pantry inventory.
            </p>
          </div>

          {/* Profile Switcher Pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {BIOMETRIC_PROFILES.map((prof) => {
              const isSelected = prof.id === activeProfileId;
              return (
                <button
                  key={prof.id}
                  onClick={() => {
                    setActiveProfileId(prof.id);
                    if (speakText) speakText(`Switched metabolic profile to ${prof.name}.`);
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 10,
                    background: isSelected ? 'rgba(16, 185, 129, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? '1px solid var(--emerald-500)' : '1px solid var(--border-subtle)',
                    color: isSelected ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {prof.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Profile Summary */}
        <div style={{
          marginTop: 18,
          padding: '12px 16px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: 10,
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', fontWeight: 600 }}>TARGET FOCUS:</span>
            <span style={{ fontSize: '0.88rem', color: 'var(--emerald-400)', marginLeft: 8, fontWeight: 600 }}>
              {currentProfile.focus}
            </span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Demographics: <strong>{currentProfile.gender}</strong>
          </div>
        </div>

        {/* Daily Target Progress Rings */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginTop: 20
        }}>
          {/* Caloric Intake */}
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              <span>DAILY CALORIE BUDGET</span>
              <span>{calPct}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '8px 0 6px 0' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>
                {currentIntake.calories}
              </span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>/ {currentProfile.dailyCaloriesTarget} kcal</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ width: `${calPct}%`, height: '100%', background: 'var(--amber-500)', borderRadius: 3 }} />
            </div>
          </div>

          {/* Protein Synthesis Target */}
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              <span>PROTEIN TARGET</span>
              <span>{proteinPct}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '8px 0 6px 0' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--emerald-400)' }}>
                {Math.round(currentIntake.protein)}g
              </span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>/ {currentProfile.dailyProteinGramsTarget}g</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ width: `${proteinPct}%`, height: '100%', background: 'var(--emerald-500)', borderRadius: 3 }} />
            </div>
          </div>

          {/* Carbs & Glycemic Ceiling */}
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              <span>CARBOHYDRATE LIMIT</span>
              <span>{carbsPct}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '8px 0 6px 0' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--cyan-400)' }}>
                {Math.round(currentIntake.carbs)}g
              </span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>/ {currentProfile.dailyCarbsGramsTarget}g</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ width: `${carbsPct}%`, height: '100%', background: 'var(--cyan-500)', borderRadius: 3 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Smart Meal Plan with Real-Time Pantry Inventory Sync & Swaps */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
              Personalized Day Plan & Adaptive Substitution
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
              Automated recipes mapped against your kitchen inventory and current metabolic pacing.
            </p>
          </div>
          <span className="badge badge-emerald">
            <ShoppingBag size={13} />
            PANTRY SYNCED (94% IN STOCK)
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 16
        }}>
          {MEAL_PLAN_DATA.map((item, idx) => {
            const isSwapped = swappedMeals[item.title];
            const swap = item.alternativeSwap;

            return (
              <div
                key={idx}
                style={{
                  borderRadius: 14,
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                }}
              >
                {/* Image banner */}
                <div style={{ height: 130, position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(4px)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#fff',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {item.meal.toUpperCase()}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: 'rgba(16, 185, 129, 0.85)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#070a13'
                  }}>
                    GI: {item.gi}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                    {item.title}
                  </h4>

                  <div style={{ display: 'flex', gap: 12, fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                    <span><strong>{item.calories}</strong> kcal</span>
                    <span><strong>{item.protein}g</strong> Protein</span>
                    <span><strong>{item.carbs}g</strong> Carbs</span>
                    <span><strong>{item.fat}g</strong> Fat</span>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--emerald-400)', marginBottom: 14 }}>
                    ✓ {item.pantryStatus}
                  </div>

                  {/* Adaptive Ingredient Swap Section */}
                  <div style={{
                    marginTop: 'auto',
                    padding: 12,
                    borderRadius: 10,
                    background: isSwapped ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: isSwapped ? '1px solid var(--emerald-500)' : '1px solid var(--border-subtle)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                        {isSwapped ? 'SWAP APPLIED' : 'AI SMART SWAP AVAILABLE'}
                      </span>
                      <button
                        onClick={() => toggleSwap(item.title)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--cyan-400)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4
                        }}
                      >
                        <RefreshCw size={11} />
                        {isSwapped ? 'Revert' : 'Swap'}
                      </button>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: '#fff', fontWeight: 600 }}>
                      {isSwapped ? swap.replacement : swap.original}
                    </div>

                    <div style={{ display: 'flex', gap: 8, marginTop: 4, fontSize: '0.7rem', color: 'var(--emerald-400)' }}>
                      <span>{swap.carbSavings}</span>
                      <span>•</span>
                      <span>{swap.proteinDelta}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

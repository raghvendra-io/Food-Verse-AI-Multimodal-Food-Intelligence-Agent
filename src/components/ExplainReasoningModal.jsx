import React from 'react';
import { 
  X, 
  Cpu, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Dna, 
  Database, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function ExplainReasoningModal({ isOpen, onClose, preset }) {
  if (!isOpen) return null;

  const { aiReasoning } = preset;

  const reasoningStages = [
    {
      step: 1,
      title: 'Multimodal Vision Tokenization & Patch Embedding',
      model: aiReasoning.visionEncoder,
      description: 'The raw 1080p frame is partitioned into 16x16 pixel patches. Cross-attention layers evaluate semantic food boundaries, surface textural cues, and color reflectance signatures.',
      metrics: '256 Vision Tokens • 14ms Inference'
    },
    {
      step: 2,
      title: 'Volumetric Depth Regression & Mass Estimation',
      model: aiReasoning.depthModel,
      description: 'Monocular depth estimation regresses relative plate baseline and food height map. Multiplies cubic volume by ingredient density references (e.g. salmon = 1.08 g/cm³) to calculate mass in grams.',
      metrics: 'Error Margin: ±4.2% mass variance'
    },
    {
      step: 3,
      title: 'Nutritional & HACCP Knowledge Graph Alignment',
      model: aiReasoning.knowledgeAlignment,
      description: 'Extracted food entities are mapped directly to USDA FoodData Central and FDA Food Code safety schemas. Macronutrients, micronutrient density, and glycemic indices are computed.',
      metrics: 'Verified against 380,000 reference foods'
    },
    {
      step: 4,
      title: 'Personalized CoT Decision Reasoning & Safety Checks',
      model: 'FoodVerse-LLM CoT Engine (Chain-of-Thought)',
      description: 'Synthesizes contextual advice: alerts for allergens, forecasts biochemical senescence hours, cross-references cutting board isolation protocols, and suggests recipe technique pacing.',
      metrics: 'Transparency Index: 100% Explainable'
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: 24 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(6, 182, 212, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cyan-400)'
            }}>
              <Cpu size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#fff' }}>
                Multimodal AI Transparency & Reasoning Trace
              </h2>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Inspect how FoodVerse AI decomposes visual data into actionable nutritional and safety intelligence.
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-icon" style={{ borderRadius: '50%' }}>
            <X size={18} />
          </button>
        </div>

        {/* Confidence Chain Log */}
        <div style={{
          padding: 16,
          borderRadius: 12,
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid var(--border-subtle)',
          marginBottom: 20
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--emerald-400)', fontWeight: 700, marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
            REASONING CHAIN LOG FOR CURRENT ACTIVE SCENE:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {aiReasoning.confidenceChain.map((line, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.8rem', color: 'var(--text-main)' }}>
                <span style={{ color: 'var(--emerald-400)', fontFamily: 'var(--font-mono)' }}>[{idx + 1}]</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Pipeline Stages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {reasoningStages.map((stage) => (
            <div
              key={stage.step}
              style={{
                padding: 16,
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="badge badge-emerald" style={{ padding: '2px 8px' }}>
                    STAGE {stage.step}
                  </span>
                  <strong style={{ fontSize: '0.92rem', color: '#fff' }}>
                    {stage.title}
                  </strong>
                </div>
                <span className="badge badge-dim" style={{ fontSize: '0.68rem' }}>
                  {stage.metrics}
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--cyan-400)', fontFamily: 'var(--font-mono)', margin: '4px 0 6px 0' }}>
                Architecture: {stage.model}
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                {stage.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.78rem',
          color: 'var(--text-dim)'
        }}>
          <span>Standardized on IEEE P2976 AI Transparency Standard</span>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '8px 18px' }}>
            Close Inspection Trace
          </button>
        </div>
      </div>
    </div>
  );
}

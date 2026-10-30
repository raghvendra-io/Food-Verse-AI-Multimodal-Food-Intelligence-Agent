import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Leaf, 
  DollarSign, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  ArrowUpRight,
  Sparkles,
  PieChart
} from 'lucide-react';

export default function AnalyticsTab({ preset }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className="badge badge-emerald">
                <BarChart3 size={13} />
                ENTERPRISE FOOD INTELLIGENCE TELEMETRY
              </span>
              <span className="badge badge-dim">
                Real-Time Aggregation
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>
              Platform Impact, Safety Trends & Waste Reduction
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
              Consolidated metrics bridging household nutritional outcomes and commercial food service HACCP compliance.
            </p>
          </div>
        </div>

        {/* 4 Big KPI Blocks */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginTop: 20
        }}>
          {/* Spoilage Reduction */}
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>FOOD WASTE PREVENTED</span>
              <Leaf size={16} color="var(--emerald-400)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '8px 0 2px 0' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--emerald-400)' }}>14.8</span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 600 }}>kg / mo</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--emerald-400)' }}>
              ↑ 34% improvement vs manual storage
            </div>
          </div>

          {/* Cost Savings */}
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>ESTIMATED GROCERY SAVINGS</span>
              <DollarSign size={16} color="var(--cyan-400)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '8px 0 2px 0' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--cyan-400)' }}>$186</span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 600 }}>/ mo</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--cyan-400)' }}>
              Via dynamic freshness expiration alerts
            </div>
          </div>

          {/* HACCP Uptime */}
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>KITCHEN HACCP UPTIME</span>
              <ShieldCheck size={16} color="var(--emerald-400)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '8px 0 2px 0' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>99.4%</span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 600 }}>Compliance</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--emerald-400)' }}>
              Zero critical health code infractions
            </div>
          </div>

          {/* AI Inference Latency */}
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>VISION INFERENCE LATENCY</span>
              <Cpu size={16} color="var(--violet-400)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '8px 0 2px 0' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--violet-400)' }}>14</span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 600 }}>ms avg</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              12,480 vision frames evaluated
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Compliance & Nutrition Graphs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 16
      }}>
        {/* Weekly Macro Adherence Chart */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 14 }}>
            Weekly Nutritional Goal Adherence
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { day: 'Mon', score: 96, calories: '2,450 kcal', status: 'Optimal' },
              { day: 'Tue', score: 92, calories: '2,510 kcal', status: 'Optimal' },
              { day: 'Wed', score: 88, calories: '2,390 kcal', status: 'Good' },
              { day: 'Thu', score: 98, calories: '2,580 kcal', status: 'Peak' },
              { day: 'Fri', score: 94, calories: '2,490 kcal', status: 'Optimal' },
              { day: 'Sat', score: 90, calories: '2,620 kcal', status: 'Good' },
              { day: 'Sun (Today)', score: 95, calories: '2,540 kcal', status: 'Optimal' }
            ].map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 85, fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  {d.day}
                </span>
                <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(255, 255, 255, 0.06)', overflow: 'hidden' }}>
                  <div style={{ width: `${d.score}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #06b6d4)', borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: '0.78rem', color: '#fff', fontWeight: 700, width: 40, textAlign: 'right' }}>
                  {d.score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Environmental & Carbon Offset Ledger */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 14 }}>
            Sustainability & Circular Food Systems
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{
              padding: 14,
              borderRadius: 10,
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, color: 'var(--emerald-300)' }}>
                <span>CO2e Greenhouse Gas Avoidance</span>
                <span>-28.4 kg CO2e</span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Directly calculated from preventing anaerobic decomposition of discarded organic matter.
              </p>
            </div>

            <div style={{
              padding: 14,
              borderRadius: 10,
              background: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, color: 'var(--cyan-300)' }}>
                <span>Water Footprint Conserved</span>
                <span>1,420 Liters</span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Virtual agricultural irrigation water preserved through timely consumption of high-water produce.
              </p>
            </div>

            <div style={{
              padding: 14,
              borderRadius: 10,
              background: 'rgba(139, 92, 246, 0.08)',
              border: '1px solid rgba(139, 92, 246, 0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, color: 'var(--violet-300)' }}>
                <span>HACCP Compliance Confidence</span>
                <span>99.9% Audit Pass Rate</span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Commercial kitchen automated logging eliminates 100% of paper logging falsification risks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

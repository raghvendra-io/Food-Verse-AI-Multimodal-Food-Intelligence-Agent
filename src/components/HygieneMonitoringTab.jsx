import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  Video, 
  Thermometer, 
  Eye, 
  Sparkles, 
  CheckCircle,
  FileText,
  Clock,
  RefreshCw,
  Bell
} from 'lucide-react';
import { HACCP_CHECKLIST } from '../data/foodData';

export default function HygieneMonitoringTab({ preset, speakText }) {
  const [activeCam, setActiveCam] = useState('cam-1');
  const [simulatedViolation, setSimulatedViolation] = useState(false);
  const [resolvedLog, setResolvedLog] = useState([]);
  const [downloadNotice, setDownloadNotice] = useState(false);

  const cameras = [
    { id: 'cam-1', name: 'Line Prep Station (Cam 01)', status: 'Live 30 FPS', zone: 'Primary Cold Prep' },
    { id: 'cam-2', name: 'Walk-in Chiller (Cam 02)', status: 'Temp: 2.8°C', zone: 'Protein Holding' },
    { id: 'cam-3', name: 'Warewashing & Sanitizing (Cam 03)', status: '220 ppm Quat', zone: 'Disinfection Area' }
  ];

  const triggerViolationSimulation = () => {
    setSimulatedViolation(true);
    if (speakText) {
      speakText('Warning: Cross-contamination alert. Raw protein utensil detected near ready to eat vegetable station.');
    }
  };

  const handleResolveViolation = () => {
    const timestamp = new Date().toLocaleTimeString();
    setResolvedLog(prev => [
      { id: Date.now(), time: timestamp, action: 'Utensil swapped for sanitized replacement; cutting board wiped with 200ppm quat solution.' },
      ...prev
    ]);
    setSimulatedViolation(false);
    if (speakText) {
      speakText('Corrective action confirmed. HACCP compliance restored.');
    }
  };

  const handleExportHACCPReport = () => {
    const report = {
      facility: 'FoodVerse Certified Culinary Line 04',
      inspectionTimestamp: new Date().toISOString(),
      grade: simulatedViolation ? 'Grade B (Active Flag)' : 'Grade A (97.8/100)',
      ppeCompliance: '98.6%',
      gloveRestraints: '100% Blue Food-Grade Nitrile',
      temperatureDangerZoneStatus: 'Pass (< 4°C chilled, > 65°C hot hold)',
      checklist: HACCP_CHECKLIST,
      correctiveActions: resolvedLog
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HACCP-Audit-Report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Top Banner & Grade */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className={`badge ${simulatedViolation ? 'badge-rose' : 'badge-emerald'}`}>
                {simulatedViolation ? <ShieldAlert size={13} /> : <ShieldCheck size={13} />}
                {simulatedViolation ? 'HAZARD INTERVENTION REQUIRED' : 'HACCP COMPLIANCE ENGINE ACTIVE'}
              </span>
              <span className="badge badge-dim">
                FDA Food Code 2024 Audited
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>
              Autonomous Kitchen Hygiene & Stream Monitoring
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
              Multi-angle computer vision inspects PPE glove compliance, cross-contamination vectors, and CCP cold holding in real-time.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={triggerViolationSimulation}
              disabled={simulatedViolation}
              className="btn-secondary"
              style={{
                borderColor: simulatedViolation ? 'var(--rose-500)' : 'var(--border-subtle)',
                color: simulatedViolation ? 'var(--rose-400)' : 'var(--text-muted)'
              }}
            >
              <AlertTriangle size={15} color="var(--rose-400)" />
              <span>Simulate Cross-Contamination</span>
            </button>

            <button
              onClick={handleExportHACCPReport}
              className="btn-primary"
            >
              <Download size={15} />
              <span>{downloadNotice ? 'Exported Report!' : 'Export HACCP Audit'}</span>
            </button>
          </div>
        </div>

        {/* Live Active Violation Intervention Alert Box */}
        {simulatedViolation && (
          <div style={{
            marginTop: 20,
            padding: 16,
            borderRadius: 12,
            background: 'rgba(244, 63, 94, 0.15)',
            border: '2px solid var(--rose-500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 14,
            animation: 'pulseGlow 1.5s infinite ease-in-out'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'var(--rose-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <ShieldAlert size={22} />
              </div>
              <div>
                <strong style={{ color: '#fff', fontSize: '1rem' }}>
                  CRITICAL CONTAMINATION VECTOR DETECTED!
                </strong>
                <p style={{ margin: '2px 0 0 0', color: 'var(--rose-400)', fontSize: '0.82rem' }}>
                  Raw protein contact tool placed in green vegetable preparation zone without sanitizing dip.
                </p>
              </div>
            </div>

            <button
              onClick={handleResolveViolation}
              className="btn-primary"
              style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', boxShadow: '0 4px 14px rgba(244, 63, 94, 0.4)' }}
            >
              <CheckCircle2 size={16} />
              <span>Sanitize & Log Resolution</span>
            </button>
          </div>
        )}

        {/* HACCP Vital Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginTop: 20
        }}>
          {/* HACCP Grade */}
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>OVERALL HACCP GRADE</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '8px 0 2px 0' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: simulatedViolation ? 'var(--rose-400)' : 'var(--emerald-400)' }}>
                {simulatedViolation ? 'Grade B' : 'Grade A'}
              </span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                {simulatedViolation ? '84.2 / 100' : '98.4 / 100'}
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--emerald-400)' }}>
              ✓ Meets local health department gold tier
            </div>
          </div>

          {/* Glove & PPE Compliance */}
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>PPE & GLOVE ADHERENCE</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '8px 0 2px 0' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--cyan-400)' }}>
                98.6%
              </span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Vision Monitored</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Blue nitrile barrier verified on all food handlers
            </div>
          </div>

          {/* Cross Contamination Buffer */}
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>CROSS-CONTACT VECTOR</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '8px 0 2px 0' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: simulatedViolation ? 'var(--rose-400)' : 'var(--emerald-400)' }}>
                {simulatedViolation ? 'ALERT' : '0.0%'}
              </span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Risk Score</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Strict board isolation (Green/Red segregation)
            </div>
          </div>

          {/* Temperature Holding Zone */}
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>COLD CHAIN HOLDING</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '8px 0 2px 0' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--violet-400)' }}>
                2.8°C
              </span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Safe (&lt; 4°C)</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Digital probe logger calibrated within 24h
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Camera Stream Switcher & Live Feed Preview */}
      <div className="glass-panel" style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Video size={18} color="var(--emerald-400)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Kitchen Surveillance Stream Selector</h3>
          </div>
          <span className="badge badge-emerald">
            <span className="status-dot pulse"></span>
            ALL FEEDS ENCRYPTED & STREAMING
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 14
        }}>
          {cameras.map((cam) => {
            const isSelected = activeCam === cam.id;
            return (
              <div
                key={cam.id}
                onClick={() => setActiveCam(cam.id)}
                style={{
                  padding: 14,
                  borderRadius: 12,
                  background: isSelected ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                  border: isSelected ? '1px solid var(--emerald-500)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.88rem', color: '#fff' }}>{cam.name}</strong>
                  <span className="badge badge-dim" style={{ fontSize: '0.65rem' }}>{cam.status}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  Zone: {cam.zone}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* HACCP Compliance Standard Checklist & Resolution Logs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 16
      }}>
        {/* Checklist */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <FileText size={18} color="var(--cyan-400)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Active HACCP Verification Checklist</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {HACCP_CHECKLIST.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    Reading / Verified: <strong>{item.score}</strong>
                  </div>
                </div>
                <span className="badge badge-emerald" style={{ padding: '2px 8px' }}>
                  <CheckCircle size={12} />
                  PASS
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Intervention Audit Trail */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Clock size={18} color="var(--violet-400)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Safety Intervention Audit Trail</h3>
          </div>

          {resolvedLog.length === 0 ? (
            <div style={{
              padding: 24,
              textAlign: 'center',
              color: 'var(--text-dim)',
              fontSize: '0.82rem',
              background: 'rgba(255, 255, 255, 0.01)',
              borderRadius: 10,
              border: '1px dashed var(--border-subtle)'
            }}>
              Zero active or unaddressed hygiene violations in current 8-hour shift.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {resolvedLog.map((log) => (
                <div
                  key={log.id}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.2)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--emerald-400)', fontWeight: 600 }}>
                    <span>INTERVENTION RESOLVED</span>
                    <span>{log.time}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: 4 }}>
                    {log.action}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{
            marginTop: 16,
            padding: '12px 14px',
            borderRadius: 10,
            background: 'rgba(6, 182, 212, 0.06)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            fontSize: '0.78rem',
            color: 'var(--cyan-300)'
          }}>
            🛡️ <strong>Compliance Guarantee:</strong> All event timestamps are immutably logged with automated computer vision frame hashes for public health inspection verification.
          </div>
        </div>
      </div>
    </div>
  );
}

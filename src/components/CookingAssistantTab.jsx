import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Clock, 
  Volume2, 
  CheckCircle2, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  MessageSquare, 
  Send, 
  Lightbulb, 
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Thermometer
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CookingAssistantTab({ preset, speakText }) {
  const { cookingAssistance } = preset;
  const [activeStep, setActiveStep] = useState(cookingAssistance.activeStepIndex || 0);
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [thermalTemp, setThermalTemp] = useState(cookingAssistance.panThermalHeatmap.currentTemp || 195);
  const [browningScore, setBrowningScore] = useState(cookingAssistance.panThermalHeatmap.browningIndex || 85);
  
  // Interactive Chef Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'chef',
      text: `Hello! I am ChefVerse AI. I'm tracking your ${preset.name} cooking progress via vision stream. Your pan surface is currently at ${thermalTemp}°C—ideal for developing a golden Maillard crust without scorching. How can I assist you with technique or flavor balancing?`
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');

  // Timer countdown effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      confetti({ particleCount: 30, spread: 50 });
      if (speakText) {
        speakText('Timer complete! Proceed to the next cooking step.');
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleStepClick = (idx) => {
    setActiveStep(idx);
    const step = cookingAssistance.steps[idx];
    if (step.duration > 0) {
      setTimerSeconds(step.duration);
      setIsTimerRunning(false);
    }
    if (speakText) {
      speakText(`Step ${idx + 1}: ${step.title}. ${step.tip}`);
    }
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputQuestion.trim()) return;

    const userText = inputQuestion;
    setInputQuestion('');
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);

    // Simulated Chef LLM reasoning response
    setTimeout(() => {
      let aiReply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('substitute') || lower.includes('swap') || lower.includes('butter')) {
        aiReply = `For high-heat basting, you can substitute butter with ghee (clarified butter, smoke point 250°C) or avocado oil. If you want dairy-free richness with a nutty note, mix olive oil with a drop of toasted sesame oil and garlic.`;
      } else if (lower.includes('crispy') || lower.includes('skin')) {
        aiReply = `Crispiness depends on surface moisture evaporation. Keep the skin in firm, uninterrupted contact with the 200°C cast iron for at least 3.5 minutes. Once the Maillard crust forms, protein contraction naturally releases the skin from the pan.`;
      } else if (lower.includes('wine') || lower.includes('pair')) {
        aiReply = `This dish pairs exceptionally with an acidic, mineral-driven white like a crisp Sancerre (Sauvignon Blanc) or an unoaked Chablis (Chardonnay) to cut through the rich lipids.`;
      } else if (lower.includes('salt') || lower.includes('season')) {
        aiReply = `If you have over-salted, balance it immediately by finishing with a squeeze of fresh lemon juice or a dash of aged sherry vinegar. The acidity disrupts sodium taste receptor binding.`;
      } else {
        aiReply = `Understood. Computer vision registers optimal thermal conduction across your skillet. Keep the flame steady and maintain basting to prevent surface desiccation.`;
      }

      setChatMessages(prev => [...prev, { sender: 'chef', text: aiReply }]);
      if (speakText) speakText(aiReply);
    }, 600);
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Top Header Card */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className="badge badge-emerald">
                <Flame size={13} />
                MULTIMODAL COOKING COPILOT
              </span>
              <span className="badge badge-dim">
                Vision Action Recognizer v3.1
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>
              {cookingAssistance.dishTitle}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
              Real-time video tracking dynamically synchronizes recipe stages, thermal sear curves, and culinary timers.
            </p>
          </div>

          <button
            onClick={() => {
              const currentStepObj = cookingAssistance.steps[activeStep];
              if (speakText) speakText(`Current stage: ${currentStepObj.title}. Chef's tip: ${currentStepObj.tip}`);
            }}
            className="btn-secondary"
          >
            <Volume2 size={16} color="var(--emerald-400)" />
            <span>Spoken Coaching</span>
          </button>
        </div>
      </div>

      {/* Live Pan Thermal Heatmap & Timer Synchronizer */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 16
      }}>
        {/* Pan Thermal Heatmap Visualizer */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Thermometer size={18} color="var(--amber-400)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Pan Thermal Heatmap & Browning</h3>
            </div>
            <span className="badge badge-amber" style={{ fontFamily: 'var(--font-mono)' }}>
              {thermalTemp}°C
            </span>
          </div>

          {/* Pan Heatmap Graphic */}
          <div style={{
            position: 'relative',
            height: 180,
            borderRadius: 14,
            overflow: 'hidden',
            background: 'radial-gradient(circle at 50% 50%, #450a0a 0%, #1e1b4b 50%, #030712 90%)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Heat Rings */}
            <div style={{
              width: 130,
              height: 130,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.75) 0%, rgba(245, 158, 11, 0.5) 50%, rgba(16, 185, 129, 0.15) 85%, transparent 100%)',
              filter: 'blur(10px)',
              animation: 'pulseGlow 2s infinite alternate'
            }}></div>

            {/* Crosshair indicator */}
            <div style={{
              position: 'absolute',
              width: 60,
              height: 60,
              border: '1px dashed rgba(255, 255, 255, 0.5)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              color: '#fff',
              fontFamily: 'var(--font-mono)'
            }}>
              HOTSPOT
            </div>

            <div style={{
              position: 'absolute',
              bottom: 10,
              left: 12,
              right: 12,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              background: 'rgba(0, 0, 0, 0.6)',
              padding: '4px 10px',
              borderRadius: 6,
              backdropFilter: 'blur(4px)'
            }}>
              <span>Target: <strong>200°C</strong></span>
              <span style={{ color: 'var(--emerald-400)' }}>Maillard Browning: <strong>{browningScore}%</strong></span>
              <span style={{ color: 'var(--cyan-400)' }}>Flip Ready: <strong>{cookingAssistance.panThermalHeatmap.flipReadiness}%</strong></span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>Flame Regulation: Moderate-High</span>
            <span style={{ color: 'var(--emerald-400)' }}>Optimal Sears Without Charring</span>
          </div>
        </div>

        {/* Dynamic Synchronized Culinary Timer */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={18} color="var(--cyan-400)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Synchronized Culinary Timer</h3>
            </div>
            <span className="badge badge-cyan">
              Stage {activeStep + 1} Timer
            </span>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: 14,
            padding: '24px 16px',
            textAlign: 'center',
            border: '1px solid var(--border-subtle)',
            marginBottom: 16
          }}>
            <div style={{
              fontSize: '3.6rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              color: timerSeconds <= 15 && timerSeconds > 0 ? 'var(--rose-400)' : '#fff',
              letterSpacing: '0.05em'
            }}>
              {formatTimer(timerSeconds)}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: 4 }}>
              Active Step: <strong>{cookingAssistance.steps[activeStep]?.title}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="btn-primary"
              style={{ padding: '10px 24px' }}
            >
              {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
              <span>{isTimerRunning ? 'Pause Timer' : 'Start Timer'}</span>
            </button>

            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(cookingAssistance.steps[activeStep]?.duration || 120);
              }}
              className="btn-secondary"
            >
              <RotateCcw size={15} />
              <span>Reset</span>
            </button>

            <button
              onClick={() => setTimerSeconds(prev => prev + 30)}
              className="btn-secondary"
            >
              <span>+30s</span>
            </button>
          </div>
        </div>
      </div>

      {/* Step-by-Step Guided Cooking Stream */}
      <div className="glass-panel" style={{ padding: 20 }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>
          Step-by-Step Technique Guidance
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {cookingAssistance.steps.map((st, idx) => {
            const isCurrent = idx === activeStep;
            const isFinished = idx < activeStep;
            return (
              <div
                key={idx}
                onClick={() => handleStepClick(idx)}
                style={{
                  padding: 16,
                  borderRadius: 12,
                  background: isCurrent ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                  border: isCurrent ? '1px solid var(--emerald-500)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 16,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: isFinished ? 'var(--emerald-500)' : isCurrent ? 'var(--emerald-500)' : 'rgba(255,255,255,0.06)',
                    color: isFinished || isCurrent ? '#070a13' : 'var(--text-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}>
                    {isFinished ? '✓' : idx + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                      {st.title}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
                      💡 {st.tip}
                    </div>
                  </div>
                </div>

                {st.duration > 0 && (
                  <span className="badge badge-dim" style={{ whiteSpace: 'nowrap', fontSize: '0.75rem' }}>
                    <Clock size={12} />
                    {Math.floor(st.duration / 60)}m {st.duration % 60 ? `${st.duration % 60}s` : ''}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ChefVerse AI Conversational Assistant */}
      <div className="glass-panel" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <MessageSquare size={18} color="var(--emerald-400)" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>ChefVerse AI — Conversational Kitchen Co-Pilot</h3>
          <span className="badge badge-emerald" style={{ marginLeft: 'auto' }}>
            LLM Culinary Agent
          </span>
        </div>

        {/* Chat message box */}
        <div style={{
          height: 220,
          overflowY: 'auto',
          background: 'rgba(0, 0, 0, 0.35)',
          borderRadius: 12,
          padding: 16,
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}>
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '82%',
                padding: '10px 14px',
                borderRadius: 12,
                background: msg.sender === 'user' ? 'var(--emerald-600)' : 'rgba(255, 255, 255, 0.06)',
                color: '#fff',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                border: msg.sender === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {msg.sender === 'chef' && (
                <div style={{ fontSize: '0.7rem', color: 'var(--emerald-400)', fontWeight: 700, marginBottom: 4 }}>
                  CHEFVERSE AGENT
                </div>
              )}
              {msg.text}
            </div>
          ))}
        </div>

        {/* Chat input */}
        <form onSubmit={handleSendChat} style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder="Ask ChefVerse (e.g. 'How do I substitute butter?' or 'How to get crispy skin?')"
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 10,
              padding: '10px 16px',
              color: '#fff',
              fontSize: '0.88rem',
              outline: 'none'
            }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '10px 18px' }}>
            <Send size={15} />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}

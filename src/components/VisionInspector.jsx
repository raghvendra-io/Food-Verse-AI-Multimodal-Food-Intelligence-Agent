import React, { useState, useRef, useEffect } from 'react';
import { 
  Scan, 
  Layers, 
  Maximize2, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  Camera,
  RefreshCw,
  Sliders,
  Crosshair,
  Volume2
} from 'lucide-react';

export default function VisionInspector({
  preset,
  selectedBoxId,
  setSelectedBoxId,
  presets,
  onSelectPreset,
  speakText,
  isLiveCamActive,
  setIsLiveCamActive
}) {
  const [showBBoxes, setShowBBoxes] = useState(true);
  const [showAttentionMap, setShowAttentionMap] = useState(false);
  const [showDepthGrid, setShowDepthGrid] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [customImage, setCustomImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  // Setup webcam stream when isLiveCamActive is toggled
  useEffect(() => {
    let stream = null;
    if (isLiveCamActive) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
          .then(s => {
            stream = s;
            if (videoRef.current) {
              videoRef.current.srcObject = s;
              videoRef.current.play();
            }
          })
          .catch(err => {
            console.warn('Webcam access unavailable or blocked:', err);
          });
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isLiveCamActive]);

  const handleCustomUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImage(url);
      setIsLiveCamActive(false);
      triggerScanAnimation('Custom media ingested. Initializing multi-patch segmentation.');
    }
  };

  const triggerScanAnimation = (msg) => {
    setIsScanning(true);
    if (speakText) speakText(msg || 'Scanning food matrix and extracting volumetric bounds');
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  const activeBox = preset.bboxes.find(b => b.id === selectedBoxId);
  const displayedImage = customImage || preset.image;

  return (
    <div className="glass-panel" style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
      {/* Top HUD control strip */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="badge badge-cyan" style={{ fontFamily: 'var(--font-mono)' }}>
            <Scan size={13} />
            MULTIMODAL SENSOR STREAM
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Source: <strong style={{ color: 'var(--text-main)' }}>{customImage ? 'User Upload' : isLiveCamActive ? 'Real-Time Webcam' : preset.sourceType}</strong>
          </span>
        </div>

        {/* HUD Overlay controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setShowBBoxes(!showBBoxes)}
            className={`btn-secondary ${showBBoxes ? 'badge-emerald' : ''}`}
            style={{ padding: '5px 10px', fontSize: '0.75rem' }}
            title="Toggle Bounding Boxes"
          >
            <Crosshair size={13} />
            <span>BBoxes ({preset.bboxes.length})</span>
          </button>

          <button
            onClick={() => setShowAttentionMap(!showAttentionMap)}
            className={`btn-secondary ${showAttentionMap ? 'badge-violet' : ''}`}
            style={{ padding: '5px 10px', fontSize: '0.75rem' }}
            title="Toggle ViT Attention Heatmap"
          >
            <Sparkles size={13} />
            <span>Attention Heatmap</span>
          </button>

          <button
            onClick={() => setShowDepthGrid(!showDepthGrid)}
            className={`btn-secondary ${showDepthGrid ? 'badge-cyan' : ''}`}
            style={{ padding: '5px 10px', fontSize: '0.75rem' }}
            title="Toggle Volumetric 3D Mesh Grid"
          >
            <Layers size={13} />
            <span>3D Mesh</span>
          </button>

          <button
            onClick={() => triggerScanAnimation()}
            className="btn-primary"
            style={{ padding: '5px 12px', fontSize: '0.75rem' }}
            title="Re-run Multimodal Inference"
          >
            <RefreshCw size={13} className={isScanning ? 'status-dot pulse' : ''} />
            <span>Rescan</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCustomUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />

          <button
            onClick={() => fileInputRef.current.click()}
            className="btn-secondary"
            style={{ padding: '5px 10px', fontSize: '0.75rem' }}
            title="Upload custom image to analyze"
          >
            <Camera size={13} />
            <span>Upload</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div style={{
        position: 'relative',
        borderRadius: 14,
        overflow: 'hidden',
        background: '#040711',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.8)',
        minHeight: 420,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Scanning laser line */}
        {isScanning && (
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 3,
            background: 'linear-gradient(90deg, transparent, #10b981, #06b6d4, transparent)',
            boxShadow: '0 0 15px #10b981',
            zIndex: 40,
            animation: 'scanLine 1.2s ease-in-out infinite'
          }}></div>
        )}

        {/* Attention Map Overlay */}
        {showAttentionMap && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.45) 0%, rgba(6, 182, 212, 0.3) 45%, rgba(16, 185, 129, 0.1) 75%, transparent 100%)',
            mixBlendMode: 'screen',
            zIndex: 15,
            pointerEvents: 'none'
          }}></div>
        )}

        {/* 3D Depth Grid Mesh Overlay */}
        {showDepthGrid && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
            zIndex: 16,
            pointerEvents: 'none',
            perspective: 600,
            transform: 'rotateX(20deg) scale(1.1)'
          }}></div>
        )}

        {/* Image / Video Feed */}
        {isLiveCamActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              height: '100%',
              maxHeight: 520,
              objectFit: 'cover'
            }}
          />
        ) : (
          <img
            src={displayedImage}
            alt={preset.name}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: 520,
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.3s ease',
              transform: `scale(${zoomLevel})`
            }}
          />
        )}

        {/* Bounding Boxes Layer */}
        {showBBoxes && !isLiveCamActive && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {preset.bboxes.map((box) => {
              const isSelected = box.id === selectedBoxId;
              return (
                <div
                  key={box.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBoxId(box.id);
                    if (speakText) speakText(`Focused on ${box.label}, confidence ${box.confidence}%`);
                  }}
                  className={`hud-bbox ${isSelected ? 'selected' : ''}`}
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.w}%`,
                    height: `${box.h}%`,
                    borderColor: box.color,
                    backgroundColor: isSelected ? `${box.color}22` : 'rgba(0,0,0,0.1)'
                  }}
                >
                  <div
                    className="hud-tag"
                    style={{
                      background: box.color,
                      color: '#070a13'
                    }}
                  >
                    <span>{box.label}</span>
                    <span style={{ opacity: 0.85 }}>({box.confidence}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Live HUD telemetry overlay corners */}
        <div style={{
          position: 'absolute',
          top: 12,
          left: 14,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: 'rgba(255, 255, 255, 0.7)',
          background: 'rgba(0, 0, 0, 0.65)',
          padding: '4px 8px',
          borderRadius: 6,
          backdropFilter: 'blur(6px)',
          display: 'flex',
          gap: 10,
          pointerEvents: 'none',
          zIndex: 25
        }}>
          <span>FPS: 30.0</span>
          <span>LATENCY: 14ms</span>
          <span>RESOLUTION: 1920x1080</span>
          <span style={{ color: 'var(--emerald-400)' }}>ViT-B16 ACTIVE</span>
        </div>

        {/* Live HACCP / Safety floating badge if applicable */}
        <div style={{
          position: 'absolute',
          bottom: 12,
          right: 14,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid var(--border-subtle)',
          padding: '6px 12px',
          borderRadius: 8,
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          zIndex: 25
        }}>
          <span className="status-dot pulse"></span>
          <span>Overall Confidence: <strong style={{ color: 'var(--emerald-400)' }}>{preset.overallConfidence}%</strong></span>
        </div>
      </div>

      {/* Preset Fast Switcher & Selected Item Inspector */}
      <div style={{ marginTop: 16 }}>
        {/* Preset quick buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          overflowX: 'auto',
          paddingBottom: 6,
          scrollbarWidth: 'none'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, whiteSpace: 'nowrap' }}>
            DEMO SCENARIOS:
          </span>
          {presets.map((p) => {
            const isCurrent = p.id === preset.id && !customImage;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setCustomImage(null);
                  setIsLiveCamActive(false);
                  onSelectPreset(p);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 12px',
                  borderRadius: 8,
                  background: isCurrent ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: isCurrent ? '1px solid var(--emerald-500)' : '1px solid var(--border-subtle)',
                  color: isCurrent ? 'var(--emerald-300)' : 'var(--text-muted)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: 18, height: 18, borderRadius: 4, objectFit: 'cover' }}
                />
                <span>{p.name.split(' ')[0]} {p.name.split(' ')[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Bounding Box Detail Strip */}
        {activeBox && (
          <div style={{
            marginTop: 12,
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 10,
            borderLeft: `4px solid ${activeBox.color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <strong style={{ fontSize: '0.9rem', color: '#fff' }}>{activeBox.label}</strong>
                <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                  {activeBox.confidence}% Confidence
                </span>
                {activeBox.portionGrams > 0 && (
                  <span className="badge badge-dim" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                    Est. Mass: {activeBox.portionGrams}g ({activeBox.volumeCm3} cm³)
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                {activeBox.notes}
              </p>
            </div>

            <button
              onClick={() => {
                if (speakText) speakText(`${activeBox.label}. ${activeBox.notes}. Estimated mass: ${activeBox.portionGrams} grams.`);
              }}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.75rem' }}
            >
              <Volume2 size={13} color="var(--emerald-400)" />
              <span>Voice Readout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

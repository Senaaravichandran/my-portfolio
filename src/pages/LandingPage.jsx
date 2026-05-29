import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import LaserFlow from '../components/LaserFlow/LaserFlow';
import TrueFocus from '../components/TrueFocus/TrueFocus';
import BlurText from '../components/BlurText/BlurText';
import './LandingPage.css';

function ShapeGrid({
  speed = 0.5,
  squareSize = 40,
  direction = 'diagonal',
  borderColor = '#2F293A',
  hoverFillColor = '#222',
  shape = 'square',
  hoverTrailAmount = 0,
  hoverColor,
  size,
}) {
  const cellSize = size || squareSize;
  const [hovered, setHovered] = useState(null);
  const cells = useMemo(() => Array.from({ length: 520 }, (_, index) => index), []);

  const movement = {
    up: { x: [0, 0], y: [0, -cellSize] },
    down: { x: [0, 0], y: [0, cellSize] },
    left: { x: [0, -cellSize], y: [0, 0] },
    right: { x: [0, cellSize], y: [0, 0] },
    diagonal: { x: [0, -cellSize], y: [0, -cellSize] },
  }[direction] || { x: [0, -cellSize], y: [0, -cellSize] };

  const shapeRadius = {
    square: '0px',
    circle: '999px',
    hexagon: '8px',
    triangle: '0px',
  }[shape] || '0px';

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #050816 0%, #070B16 46%, #0B1020 100%)',
        pointerEvents: 'auto',
        zIndex: 0,
      }}
    >
      <motion.div
        animate={movement}
        transition={{
          duration: Math.max(3, 8 / Math.max(speed, 0.1)),
          ease: 'linear',
          repeat: Infinity,
        }}
        style={{
          position: 'absolute',
          inset: `-${cellSize}px`,
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${cellSize}px, ${cellSize}px))`,
          gridAutoRows: `${cellSize}px`,
          width: `calc(100% + ${cellSize * 2}px)`,
          height: `calc(100% + ${cellSize * 2}px)`,
          opacity: 0.34,
        }}
      >
        {cells.map(index => {
          const active =
            hovered === index ||
            (hoverTrailAmount > 0 && hovered !== null && index < hovered && index >= hovered - hoverTrailAmount);

          return (
            <div
              key={index}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: cellSize,
                height: cellSize,
                border: `1px solid ${borderColor}`,
                borderRadius: shapeRadius,
                backgroundColor: active ? hoverColor || hoverFillColor : 'transparent',
                clipPath: shape === 'triangle' ? 'polygon(50% 8%, 0 100%, 100% 100%)' : 'none',
                transition: 'background-color 180ms ease, border-color 180ms ease',
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  const [leaving, setLeaving] = useState(false);
  const [quoteComplete, setQuoteComplete] = useState(false);
  const [showAbyss, setShowAbyss] = useState(false);
  const navigate = useNavigate();
  const quoteRef = useRef(null);

  useEffect(() => {
    if (!quoteComplete) return undefined;

    const timer = setTimeout(() => {
      setShowAbyss(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [quoteComplete]);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(() => {
      navigate('/home');
    }, 900);
  };

  return (
    <div 
      className="landing-shell w-screen h-screen flex overflow-hidden bg-black"
      style={{
        opacity: leaving ? 0 : 1,
        transition: 'opacity 0.9s ease',
      }}
    >
      {/* LEFT HALF */}
      <div
        className="landing-media-panel"
        style={{
          width: '50vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#000',
          flexShrink: 0,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'cover',
          }}
        >
          <source src="/videos/landing.mp4" type="video/mp4" />
        </video>
        {/* Vignette Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.35) 100%)',
          zIndex: 10
        }}></div>
      </div>

      {/* VERTICAL DIVIDER */}
      <div className="landing-divider absolute left-[50vw] top-0 bottom-0 w-[1px] bg-white/10 z-20"></div>

      {/* RIGHT HALF */}
      <div 
        className="landing-content-panel"
        style={{
          width: '50vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          gap: '0',
          paddingTop: '0',
          paddingLeft: '60px',
          paddingRight: '60px',
          paddingBottom: '40px',
          background: 'linear-gradient(145deg, #050816 0%, #070B16 48%, #0B1020 100%)',
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <ShapeGrid
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#13233A"
          hoverFillColor="#0B1830"
          shape="square"
          hoverTrailAmount={0}
          hoverColor="#0E2238"
          size={40}
        />
        
        {/* ELEMENT 1: QUOTE */}
        <div
          ref={quoteRef}
          className="landing-quote-wrap"
          style={{
            position: 'absolute',
            top: '45%',
            left: '40px',
            transform: 'translateY(-50%)',
            maxWidth: '480px',
            textAlign: 'left',
            marginBottom: '2rem',
            zIndex: 3,
          }}
        >
          <BlurText
            text="Every civilization looked up and called it destiny. We looked closer and called it engineering — Senaa"
            className="quote-proximity"
            delay={200}
            animateBy="words"
            direction="top"
            threshold={0.1}
            rootMargin="0px"
            stepDuration={0.35}
            onAnimationComplete={() => setQuoteComplete(true)}
          />
        </div>

        {/* ELEMENT 2: DECORATIVE DIVIDER */}
        <div style={{ width: '240px', margin: 0, opacity: 0.8, display: 'flex', justifyContent: 'flex-start', position: 'absolute', top: '220px', left: '60px', zIndex: 3 }}>
          <svg width="240" height="10" viewBox="0 0 240 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="5" x2="115" y2="5" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
            <path d="M120 0L125 5L120 10L115 5L120 0Z" fill="rgba(255,255,255,0.12)"/>
            <line x1="125" y1="5" x2="240" y2="5" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
          </svg>
        </div>

        {/* ELEMENT 3: CTA BUTTON */}
        {showAbyss && (
          <div
            className="abyss-flow-stage"
            style={{
              '--abyss-impact-x': 'calc(100% - 190px)',
              '--abyss-impact-y': 'calc(100% - 105px)',
              height: '100vh',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              overflow: 'hidden',
              backgroundColor: 'transparent',
              zIndex: 2,
            }}
          >
            <div className="abyss-laser-wrap" aria-hidden="true">
              <LaserFlow
                className="abyss-laser-flow"
                color="#6EEBFF"
                horizontalBeamOffset={0.1}
                verticalBeamOffset={0.0}
                horizontalSizing={0.5}
                verticalSizing={2}
                wispDensity={1}
                wispSpeed={15}
                wispIntensity={5}
                flowSpeed={0.35}
                flowStrength={0.25}
                fogIntensity={0.45}
                fogScale={0.3}
                fogFallSpeed={0.6}
                decay={1.1}
                falloffStart={1.2}
              />
            </div>

            <div
              onClick={handleEnter}
              className="abyss-entry-box"
              aria-label="Enter the portfolio"
              role="button"
              tabIndex={0}
              style={{
                top: 'auto',
                bottom: '40px',
                left: 'auto',
                right: '60px',
                transform: 'none',
                width: '260px',
                height: '65px',
                minHeight: '65px',
                boxShadow:
                  '0 0 28px rgba(110, 235, 255, 0.42), 0 0 86px rgba(110, 235, 255, 0.22), inset 0 0 24px rgba(110, 235, 255, 0.18)',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleEnter();
                }
              }}
            >
              <TrueFocus
                sentence="Into the Abyss"
                manualMode={false}
                blurAmount={2.5}
                borderColor="#6EEBFF"
                animationDuration={0.5}
                pauseBetweenAnimations={1}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

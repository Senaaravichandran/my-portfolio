import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dock from '../components/Dock/Dock';
import LetterGlitch from '../components/LetterGlitch/LetterGlitch';
import LightRays from '../components/LightRays/LightRays';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import './HomePage.css';

const INTRO_HOLD_MS = 3600;
const INTRO_EXIT_MS = 800;
const HOME_GLITCH_COLORS = ['#1f4d44', '#66ffd1', '#6ee7ff'];

function DockSvg({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export default function HomePage() {
  const [introPhase, setIntroPhase] = useState('active');
  const [activeDock, setActiveDock] = useState(() => window.location.hash.replace('#', '') || 'home');
  const navigate = useNavigate();

  const selectDock = useCallback(id => {
    setActiveDock(id);
    window.history.replaceState(null, '', `#${id}`);
  }, []);

  const dockItems = useMemo(() => {
    const createItem = (id, label, icon) => ({
      id,
      label,
      icon,
      className: activeDock === id ? 'is-active' : '',
      onClick: () => selectDock(id)
    });

    return [
      createItem(
        'home',
        'Home',
        <DockSvg>
          <path d="M4 11.5 12 5l8 6.5" />
          <path d="M6.5 10.5V19h11v-8.5" />
          <path d="M10 19v-5h4v5" />
        </DockSvg>
      ),
      createItem(
        'profile',
        'Profile',
        <DockSvg>
          <circle cx="12" cy="8" r="3.4" />
          <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
        </DockSvg>
      ),
      createItem(
        'work',
        'Work',
        <DockSvg>
          <path d="M7.5 8V6.7A2.7 2.7 0 0 1 10.2 4h3.6a2.7 2.7 0 0 1 2.7 2.7V8" />
          <path d="M4.5 8.5h15v10h-15z" />
          <path d="M4.5 12.2h15" />
          <path d="M10 12.2v1.4h4v-1.4" />
        </DockSvg>
      ),
      createItem(
        'lab',
        'Lab',
        <DockSvg>
          <path d="M9 3.8h6" />
          <path d="M10 3.8v5.1l-4.2 7.4A2.5 2.5 0 0 0 8 20h8a2.5 2.5 0 0 0 2.2-3.7L14 8.9V3.8" />
          <path d="M8 15h8" />
        </DockSvg>
      ),
      createItem(
        'contact',
        'Contact',
        <DockSvg>
          <path d="M4.5 6.5h15v11h-15z" />
          <path d="m5 7 7 6 7-6" />
        </DockSvg>
      ),
      {
        id: 'origin',
        label: 'Origin',
        icon: (
          <DockSvg>
            <path d="M11 5 4 12l7 7" />
            <path d="M5 12h15" />
          </DockSvg>
        ),
        onClick: () => navigate('/')
      }
    ];
  }, [activeDock, navigate, selectDock]);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIntroPhase('leaving');
    }, INTRO_HOLD_MS);

    const doneTimer = setTimeout(() => {
      setIntroPhase('done');
    }, INTRO_HOLD_MS + INTRO_EXIT_MS);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <main className="home-page" aria-label="Home">
      {introPhase !== 'done' && (
        <section className={`home-intro ${introPhase === 'leaving' ? 'is-leaving' : ''}`} aria-label="Intro">
          <LetterGlitch
            className="home-intro__glitch"
            glitchColors={HOME_GLITCH_COLORS}
            glitchSpeed={42}
            centerVignette={false}
            outerVignette
            smooth
          />
          <div className="home-intro__veil" />
          <h1 className="home-intro__line">Every system leaves fingerprints. I follow them</h1>
        </section>
      )}
      <section className="home-main" aria-hidden={introPhase !== 'done'}>
        {introPhase === 'done' && activeDock === 'home' && (
          <div className="home-profile-stage">
            <div className="home-portfolio-copy">
              <LightRays
                className="home-copy-rays"
                raysOrigin="left"
                raysColor="#6EEBFF"
                raysSpeed={1}
                lightSpread={1}
                rayLength={2}
                fadeDistance={1}
                saturation={1}
                followMouse
                mouseInfluence={0.1}
                noiseAmount={0}
                distortion={0}
                resolutionScale={0.48}
                maxFrameRate={30}
              />
              <div className="home-portfolio-content">
                <p className="home-portfolio-kicker">SENAARAVICHANDRAN A</p>
                <h2>Engineering Tomorrow Before It Exists.</h2>
                <p>I build AI systems, intelligent architectures, and technologies that transform ambitious ideas into reality.</p>
                <p>
                  From Generative AI and Quantum-inspired systems to Computer Vision and Autonomous Agents, my work lives at the
                  intersection of curiosity, engineering, and innovation.
                </p>
                <p className="home-portfolio-meta">
                  • 9× Hackathon Winner • AI Engineer • ML Innovater • Data Intelligence • Blockchain Tinkerer • Quantum Computing
                  Visionary • Researcher • Builder
                </p>
                <button className="home-archive-btn" type="button" onClick={() => selectDock('work')}>
                  ENTER THE ARCHIVE
                </button>
              </div>
            </div>
            <div className="home-card-pane">
              <ProfileCard
                avatarUrl="/images/senaa-profile.jpg"
                miniAvatarUrl="/images/icon-home.jpg"
                name="Senaaravichandran A"
                title="AI Engineer"
                handle="senaaravichandran"
                status="Online"
                contactText="Contact Me"
                showUserInfo
                enableTilt={true}
                enableMobileTilt
                behindGlowEnabled
                iconUrl="/images/profile-iconpattern.svg"
                grainUrl="/images/profile-grain.svg"
                innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                onContactClick={() => selectDock('contact')}
              />
            </div>
          </div>
        )}
        {introPhase === 'done' && <Dock items={dockItems} />}
      </section>
    </main>
  );
}

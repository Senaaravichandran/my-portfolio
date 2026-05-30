import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BorderGlow from '../components/BorderGlow/BorderGlow';
import Dock from '../components/Dock/Dock';
import GlassIcons from '../components/GlassIcons/GlassIcons';
import LetterGlitch from '../components/LetterGlitch/LetterGlitch';
import LightRays from '../components/LightRays/LightRays';
import PixelTransition from '../components/PixelTransition/PixelTransition';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import './HomePage.css';

const INTRO_HOLD_MS = 3600;
const INTRO_EXIT_MS = 800;
const WHEEL_COOLDOWN_MS = 420;
const HOME_GLITCH_COLORS = ['#1f4d44', '#66ffd1', '#6ee7ff'];

function DockSvg({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

function ProfileIcon({ type }) {
  const icons = {
    location: (
      <>
        <path d="M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2.1" />
      </>
    ),
    contact: (
      <>
        <path d="M6.6 4.8 8.9 4l2.1 4.8-1.6 1.1a12.1 12.1 0 0 0 4.7 4.7l1.1-1.6 4.8 2.1-.8 2.3c-.4 1.1-1.5 1.8-2.7 1.6C10.5 18 6 13.5 5 7.5c-.2-1.2.5-2.3 1.6-2.7Z" />
      </>
    ),
    mail: (
      <>
        <path d="M4.5 6.5h15v11h-15z" />
        <path d="m5 7 7 6 7-6" />
      </>
    ),
    linkedin: (
      <>
        <path d="M6.7 10v7.4" />
        <path d="M6.7 6.7v.1" />
        <path d="M11 17.4V10" />
        <path d="M11 13.1c0-2 1.1-3.3 3-3.3 1.7 0 2.8 1.1 2.8 3.2v4.4" />
      </>
    ),
    github: (
      <>
        <path d="M9 19c-4 1.2-4-2-5.6-2.4" />
        <path d="M15 22v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.7-1.4 5.7-6.2A4.8 4.8 0 0 0 19 7c.1-.4.5-1.8-.2-3.2 0 0-1.1-.3-3.5 1.3a12 12 0 0 0-6.3 0C6.6 3.5 5.5 3.8 5.5 3.8 4.8 5.2 5.2 6.6 5.3 7A4.8 4.8 0 0 0 4 10.3c0 4.8 2.9 5.9 5.7 6.2-.5.5-.7 1.1-.7 2V22" />
      </>
    ),
    leetcode: (
      <>
        <path d="m14.2 5.2-6.5 6.5a3.3 3.3 0 0 0 0 4.6l1.2 1.2a3.3 3.3 0 0 0 4.6 0l1.6-1.6" />
        <path d="m9.5 9.9 3.9 3.9" />
        <path d="M12.7 4.1 17 8.4" />
        <path d="M11 14h7" />
      </>
    ),
    medium: (
      <>
        <path d="M4.5 7.5h3l3.5 8.2 3.5-8.2h3" />
        <path d="M6 7.8v8.4" />
        <path d="M18 7.8v8.4" />
      </>
    ),
    chess: (
      <>
        <path d="M8 20h9" />
        <path d="M9 17h7" />
        <path d="M10 17c.2-2.6 1.2-4.7 2.9-6.1l-2.2-1.2L13 4l4 2.5-1.3 3.1c2.1 1.3 2.2 4.6.3 7.4" />
      </>
    ),
    game: (
      <>
        <path d="M12 3.5 19 6v5.2c0 4.2-2.8 7.8-7 9.3-4.2-1.5-7-5.1-7-9.3V6l7-2.5Z" />
        <path d="M9 11h6" />
        <path d="M12 8v6" />
      </>
    ),
    soon: (
      <>
        <path d="M12 5v5l3 2" />
        <circle cx="12" cy="12" r="8" />
      </>
    )
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  );
}

const profileLinks = [
  {
    id: 'location',
    label: 'Puducherry, India',
    description: 'From French Streets to Future Technologies',
    href: 'https://www.google.com/maps/place/Puducherry',
    color: 'cyan',
    icon: <ProfileIcon type="location" />
  },
  {
    id: 'contact',
    label: '+91 7418887124',
    description: 'Reach Me Across Calls, WhatsApp, Telegram & More',
    href: 'https://wa.me/917418887124',
    color: 'green',
    icon: <ProfileIcon type="contact" />
  },
  {
    id: 'mail',
    label: 'Mail',
    description: "Let's connect, collaborate, and build something impactful together",
    href: 'mailto:senaaravichandran@gmail.com',
    color: 'blue',
    icon: <ProfileIcon type="mail" />
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    description: 'Connect with my professional journey, achievements, and industry network',
    href: 'https://www.linkedin.com/in/senaa2407',
    color: 'indigo',
    icon: <ProfileIcon type="linkedin" />
  },
  {
    id: 'github',
    label: 'GitHub',
    description: 'The blueprint behind my engineering journey',
    href: 'https://github.com/Senaaravichandran',
    color: 'graphite',
    icon: <ProfileIcon type="github" />
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    description: 'Practicing the art of problem-solving through code',
    href: 'https://leetcode.com/u/Senaaravichandran/',
    color: 'orange',
    icon: <ProfileIcon type="leetcode" />
  },
  {
    id: 'medium',
    label: 'Medium',
    description: 'Documenting curiosity, innovation, research, and the experiences that fuel my growth',
    href: 'https://medium.com/@senaaravichandran',
    color: 'graphite',
    icon: <ProfileIcon type="medium" />
  },
  {
    id: 'chess',
    label: 'Chess.com',
    description: 'Shaping the way I approach problems, decisions, and uncertainty through chess',
    href: 'https://www.chess.com/member/Senaa2407',
    color: 'purple',
    icon: <ProfileIcon type="chess" />
  },
  {
    id: 'clash',
    label: 'Clash of Clans',
    description: 'Learning resource management, long-term planning, and strategic execution through Clash of Clans',
    href: 'https://link.clashofclans.com/en?action=OpenPlayerProfile&tag=%23PCQYQUG9V',
    color: 'red',
    icon: <ProfileIcon type="game" />
  },
  {
    id: 'soon',
    label: 'Soon',
    description: 'Unknown',
    href: '',
    color: 'graphite',
    icon: <ProfileIcon type="soon" />
  }
];

export default function HomePage() {
  const [introPhase, setIntroPhase] = useState('active');
  const [activeDock, setActiveDock] = useState(() => window.location.hash.replace('#', '') || 'home');
  const [activeProfileLink, setActiveProfileLink] = useState(null);
  const wheelLockRef = useRef(false);
  const navigate = useNavigate();

  const selectDock = useCallback(id => {
    setActiveDock(id);
    window.history.replaceState(null, '', `#${id}`);
  }, []);

  const handlePageWheel = useCallback(
    event => {
      const normalizedDeltaY =
        event.deltaMode === 1 ? event.deltaY * 16 : event.deltaMode === 2 ? event.deltaY * window.innerHeight : event.deltaY;

      if (introPhase !== 'done' || wheelLockRef.current || Math.abs(normalizedDeltaY) < 8) return;

      const nextDock =
        normalizedDeltaY > 0 && activeDock === 'home' ? 'profile' : normalizedDeltaY < 0 && activeDock === 'profile' ? 'home' : null;
      if (!nextDock) return;

      event.preventDefault();
      wheelLockRef.current = true;
      selectDock(nextDock);
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, WHEEL_COOLDOWN_MS);
    },
    [activeDock, introPhase, selectDock]
  );

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

  useEffect(() => {
    window.addEventListener('wheel', handlePageWheel, { passive: false });
    return () => window.removeEventListener('wheel', handlePageWheel);
  }, [handlePageWheel]);

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
          <h1 className="home-intro__line">Signal Acquired ...</h1>
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
                mouseInfluence={0.42}
                noiseAmount={0}
                distortion={0}
                resolutionScale={0.5}
                maxFrameRate={60}
                idleFrameRate={10}
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
                <button className="home-archive-btn" type="button" onClick={() => selectDock('profile')}>
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
        {introPhase === 'done' && activeDock === 'profile' && (
          <section className="profile-archive-stage" aria-label="Profile archive">
            <div className="profile-links-showcase">
              <GlassIcons
                className="profile-glass-icons"
                items={profileLinks}
                activeId={activeProfileLink?.id}
                onSelect={setActiveProfileLink}
              />
              {activeProfileLink && (
                <div className="profile-link-detail" aria-live="polite">
                  <span className="profile-link-detail__label">{activeProfileLink.label}</span>
                  <p>{activeProfileLink.description}</p>
                  {activeProfileLink.href ? (
                    <a className="profile-link-detail__visit" href={activeProfileLink.href} target="_blank" rel="noreferrer">
                      Visit
                    </a>
                  ) : (
                    <button className="profile-link-detail__visit is-disabled" type="button" disabled>
                      Visit
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="profile-pixel-pane">
              <BorderGlow
                className="profile-border-glow"
                edgeSensitivity={30}
                glowColor="190 100 74"
                backgroundColor="#02070a"
                borderRadius={24}
                glowRadius={36}
                glowIntensity={0.92}
                coneSpread={25}
                loop
                colors={['#6EEBFF', '#66FFD1', '#38BDF8']}
                fillOpacity={0.22}
              >
                <PixelTransition
                  className="profile-pixel-card"
                  firstContent={
                    <img
                      src="/images/pixel-icon.jpg"
                      alt="Senaaravichandran A archive portrait"
                      className="profile-pixel-image"
                      loading="eager"
                    />
                  }
                  secondContent={
                    <div className="profile-pixel-reveal">
                      <span>Senaaravichandran A</span>
                      <strong>AI Engineer</strong>
                      <small>Archive loading</small>
                    </div>
                  }
                  gridSize={14}
                  pixelColor="#6EEBFF"
                  animationStepDuration={0.42}
                  aspectRatio="221.97%"
                />
              </BorderGlow>
            </div>
          </section>
        )}
        {introPhase === 'done' && <Dock items={dockItems} />}
      </section>
    </main>
  );
}

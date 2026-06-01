import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BorderGlow from '../components/BorderGlow/BorderGlow';
import Dock from '../components/Dock/Dock';
import GlassIcons from '../components/GlassIcons/GlassIcons';
import LetterGlitch from '../components/LetterGlitch/LetterGlitch';
import LineWaves from '../components/LineWaves/LineWaves';
import LightRays from '../components/LightRays/LightRays';
import PixelTransition from '../components/PixelTransition/PixelTransition';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import RainbowButton from '../components/RainbowButton/RainbowButton';
import StarBorder from '../components/StarBorder/StarBorder';
import SpotlightCard from '../components/SpotlightCard/SpotlightCard';
import Lanyard from '../components/Lanyard/Lanyard';
import SplashCursor from '../components/SplashCursor/SplashCursor';
import Magnet from '../components/Magnet/Magnet';
import Orb from '../components/Orb/Orb';
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

const profileLinks = [
  {
    id: 'location',
    label: 'Puducherry, India',
    description:
      "From French Streets to Future Technologies, I've spent my time chasing ideas that travel far beyond city limits.\n\nSomewhere between curiosity and code, I found my passion for building things that didn't exist yesterday.",
    href: 'https://www.google.com/maps/place/Puducherry',
    color: 'cyan',
    logo: '/images/social/location.png'
  },
  {
    id: 'contact',
    label: '+91 7418887124',
    description:
      'Over the years, this number has carried countless conversations, opportunities, and lessons.\n\nMaybe the next one will be with you.',
    href: 'https://wa.me/917418887124',
    color: 'green',
    logo: '/images/social/phone.png'
  },
  {
    id: 'mail',
    label: 'Mail',
    description: 'For questions, opportunities, wild ideas, and everything in between, Perhaps the next chapter starts here.',
    href: 'mailto:senaaravichandran@gmail.com',
    color: 'blue',
    logo: '/images/social/Gmail.png'
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    description:
      'Connect with my professional journey, achievements, and industry network.\n\nA few years ago, I knew almost nobody in tech.\nToday, I learn from builders, researchers, founders, and engineers across the world every day.',
    href: 'https://www.linkedin.com/in/senaa2407',
    color: 'indigo',
    logo: '/images/social/linkedin.png'
  },
  {
    id: 'github',
    label: 'GitHub',
    description:
      'The blueprint behind my engineering journey.\n\nMost repositories begin with a question, an idea, or a problem that refuses to leave my mind.\nSome became projects, others became lessons, but each one taught me something worth carrying forward.',
    href: 'https://github.com/Senaaravichandran',
    color: 'graphite',
    logo: '/images/social/github.png'
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    description:
      "Practicing the art of problem-solving through code.\n\nI've learned that the first solution is rarely the best one.\nLeetCode taught me that patience, persistence, and the way you think often matter more than the answer itself.",
    href: 'https://leetcode.com/u/Senaaravichandran/',
    color: 'orange',
    logo: '/images/social/leetcode.png'
  },
  {
    id: 'medium',
    label: 'Medium',
    description:
      "Documenting curiosity, innovation, research, and the experiences that fuel my growth.\n\nI write about what I'm building, what I'm learning, and the ideas, experiences, and moments that leave a lasting impression on me.",
    href: 'https://medium.com/@senaaravichandran',
    color: 'grey',
    logo: '/images/social/medium.png'
  },
  {
    id: 'chess',
    label: 'Chess.com',
    description:
      'Shaping the way I approach problems, decisions, and uncertainty through chess.\n\nStarting at the age of 11, years of tournaments, victories, and state-level competition taught me that patience, strategic thinking, and staying calm under pressure often matter more than the outcome itself.',
    href: 'https://www.chess.com/member/Senaa2407',
    color: 'purple',
    logo: '/images/social/chess.png'
  },
  {
    id: 'clash',
    label: 'Clash of Clans',
    description:
      'Learning resource management, long-term planning, and strategic execution through Clash of Clans.\n\nSince 2018, Clash of Clans has quietly taught me patience, strategic thinking, resource management, and the value of consistent progress over time.',
    href: 'https://link.clashofclans.com/en?action=OpenPlayerProfile&tag=%23PCQYQUG9V',
    color: 'yellow',
    logo: '/images/social/clash-of-clans.png'
  },
  {
    id: 'soon',
    label: 'DRAGORITHM',
    description:
      "More than a team, it's a story of how a few curious minds came together to build, compete, and grow.\n\nVisit to discover how Dragorithm was formed, the meaning behind its name, and the journey we're creating together.",
    route: '/dragorithm',
    color: 'red',
    logo: '/images/social/dragorithm.png'
  }
];

export default function HomePage() {
  const [activeDock, setActiveDock] = useState(() => window.location.hash.replace('#', '') || 'home');
  const [introPhase, setIntroPhase] = useState(() => (window.location.hash.replace('#', '') === 'home' || !window.location.hash ? 'active' : 'done'));
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
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && initialHash !== 'home') return undefined;

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
            <div className="home-line-waves" aria-hidden="true">
              <LineWaves
                speed={0.18}
                innerLineCount={24}
                outerLineCount={30}
                warpIntensity={0.72}
                rotation={-38}
                edgeFadeWidth={0.28}
                colorCycleSpeed={0.35}
                brightness={0.075}
                color1="#6EEBFF"
                color2="#66FFD1"
                color3="#38BDF8"
                enableMouseInteraction={false}
                mouseInfluence={0}
              />
            </div>
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
              <StarBorder className="home-profile-star-border" color="white" speed="4.4s" thickness={3}>
                <ProfileCard
                  className="home-profile-reactbits-card"
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
              </StarBorder>
            </div>
          </div>
        )}
        {introPhase === 'done' && activeDock === 'profile' && (
          <section className="profile-archive-stage" aria-label="Profile archive">
            <div className="profile-work-orb">
              <Orb hue={0} hoverIntensity={2} rotateOnHover forceHoverState={false} backgroundColor="#000000" />
              <button className="profile-see-work-btn" type="button" onClick={() => selectDock('work')}>
                See my work
              </button>
            </div>
            <div className="profile-links-showcase">
              <GlassIcons
                className="profile-glass-icons"
                items={profileLinks}
                activeId={activeProfileLink?.id}
                onSelect={item => setActiveProfileLink(current => (current?.id === item.id ? null : item))}
              />
              {activeProfileLink && (
                <div className="profile-link-detail" aria-live="polite">
                  <span className="profile-link-detail__label">{activeProfileLink.label}</span>
                  <p>{activeProfileLink.description}</p>
                  {activeProfileLink.route ? (
                    <RainbowButton
                      className="profile-link-detail__visit"
                      type="button"
                      onClick={() => navigate(activeProfileLink.route)}
                    >
                      Visit
                    </RainbowButton>
                  ) : activeProfileLink.href ? (
                    <RainbowButton
                      as="a"
                      className="profile-link-detail__visit"
                      href={activeProfileLink.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit
                    </RainbowButton>
                  ) : (
                    <RainbowButton className="profile-link-detail__visit is-disabled" type="button" disabled>
                      Visit
                    </RainbowButton>
                  )}
                </div>
              )}
            </div>
            <div className="profile-pixel-pane">
              <BorderGlow
                className="profile-border-glow"
                edgeSensitivity={30}
                glowColor="28 100 64"
                backgroundColor="#02070a"
                borderRadius={24}
                glowRadius={28}
                glowIntensity={0.78}
                coneSpread={25}
                loop
                colors={['#FFB454', '#FF6A3D', '#F6C35B']}
                fillOpacity={0.14}
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
                  pixelColor="#F6A13A"
                  animationStepDuration={0.42}
                  aspectRatio="221.97%"
                />
              </BorderGlow>
            </div>
          </section>
        )}
        {introPhase === 'done' && activeDock === 'work' && (
          <section className="work-archive-stage" aria-label="Work archive">
            <SplashCursor
              DENSITY_DISSIPATION={3.5}
              VELOCITY_DISSIPATION={2}
              PRESSURE={0.1}
              CURL={3}
              SPLAT_RADIUS={0.2}
              SPLAT_FORCE={6000}
              COLOR_UPDATE_SPEED={10}
              SHADING
              RAINBOW_MODE={false}
              COLOR="#A855F7"
            />
            <div className="work-column">
              <Magnet wrapperClassName="work-card-magnet" padding={140} disabled={false} magnetStrength={12} activeTransition="transform 0.18s ease-out">
                <SpotlightCard className="work-spotlight-card" spotlightColor="rgba(110, 235, 255, 0.24)">
                  <h2>Experience</h2>
                </SpotlightCard>
              </Magnet>
            </div>
            <div className="work-column">
              <Magnet wrapperClassName="work-card-magnet" padding={140} disabled={false} magnetStrength={12} activeTransition="transform 0.18s ease-out">
                <SpotlightCard className="work-spotlight-card" spotlightColor="rgba(102, 255, 209, 0.2)">
                  <h2>Education</h2>
                </SpotlightCard>
              </Magnet>
            </div>
            <div className="work-column work-lanyard-column">
              <Lanyard position={[0, 0, 22]} gravity={[0, -40, 0]} fov={18} />
            </div>
          </section>
        )}
        {introPhase === 'done' && <Dock items={dockItems} className={activeDock === 'profile' ? 'dock-profile-red' : ''} />}
      </section>
    </main>
  );
}

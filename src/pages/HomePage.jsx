import { useEffect, useState } from 'react';
import LetterGlitch from '../components/LetterGlitch/LetterGlitch';
import './HomePage.css';

const INTRO_HOLD_MS = 3600;
const INTRO_EXIT_MS = 800;
const HOME_GLITCH_COLORS = ['#1f4d44', '#66ffd1', '#6ee7ff'];

export default function HomePage() {
  const [introPhase, setIntroPhase] = useState('active');

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
      <section className="home-main" aria-hidden={introPhase !== 'done'} />
    </main>
  );
}

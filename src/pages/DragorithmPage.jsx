import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RainbowButton from '../components/RainbowButton/RainbowButton';
import './DragorithmPage.css';

export default function DragorithmPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const replayVideo = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    video.pause();
    video.currentTime = 0;

    if (video.ended || video.readyState < 2) {
      video.load();
    }

    requestAnimationFrame(() => {
      video.currentTime = 0;
      video.play().catch(() => {});
    });
  };

  return (
    <main className="dragorithm-shell">
      <section className="dragorithm-video-panel" aria-label="Dragorithm video">
        <video ref={videoRef} className="dragorithm-video" autoPlay muted loop playsInline>
          <source src="/videos/dragorithm.mp4" type="video/mp4" />
        </video>
        <button className="dragorithm-replay" type="button" onClick={replayVideo}>
          Play Again
        </button>
      </section>
      <aside className="dragorithm-action-panel">
        <p>I lead the team</p>
        <RainbowButton type="button" onClick={() => navigate('/dragorithm/enter')}>
          Enter Dragorithm
        </RainbowButton>
      </aside>
    </main>
  );
}

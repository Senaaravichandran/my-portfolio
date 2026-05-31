import { useNavigate } from 'react-router-dom';
import EvilEye from '../components/EvilEye/EvilEye';
import './DragorithmPage.css';

export default function DragorithmBlankPage() {
  const navigate = useNavigate();

  return (
    <main className="dragorithm-empty" aria-label="Dragorithm workspace">
      <button className="dragorithm-profile-back" type="button" onClick={() => navigate('/home#profile')}>
        Back to Profile
      </button>
      <div className="dragorithm-evil-eye">
        <EvilEye
          eyeColor="#FF6F37"
          intensity={1.5}
          pupilSize={0.6}
          irisWidth={0.25}
          glowIntensity={0.35}
          scale={0.52}
          noiseScale={1}
          pupilFollow={1}
          flameSpeed={1}
          backgroundColor="#000000"
        />
      </div>
    </main>
  );
}

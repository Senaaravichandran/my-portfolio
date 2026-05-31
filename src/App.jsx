import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import GodmodePage from './pages/GodmodePage';
import DragorithmPage from './pages/DragorithmPage';
import DragorithmBlankPage from './pages/DragorithmBlankPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/godmode" element={<GodmodePage />} />
        <Route path="/dragorithm" element={<DragorithmPage />} />
        <Route path="/dragorithm/enter" element={<DragorithmBlankPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

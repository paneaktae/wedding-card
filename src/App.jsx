import { weddingConfig } from './config/weddingConfig.js';
import Hero from './components/Hero.jsx';
import Countdown from './components/Countdown.jsx';
import WeddingDetails from './components/WeddingDetails.jsx';
import DressCode from './components/DressCode.jsx';
import MemorySlideshow from './components/MemorySlideshow.jsx';
import MapSection from './components/MapSection.jsx';

export default function App() {
  return (
    <main>
      <Hero data={weddingConfig} />
      <Countdown targetDate={weddingConfig.countdownTarget} />
      <WeddingDetails data={weddingConfig} />
      <DressCode colors={weddingConfig.dressColors} />
      <MemorySlideshow images={weddingConfig.memoryImages} />
      <MapSection venue={weddingConfig.venue} />
    </main>
  );
}

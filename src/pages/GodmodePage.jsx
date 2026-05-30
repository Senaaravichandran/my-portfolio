import GlassSurface from '../components/GlassSurface/GlassSurface';
import './GodmodePage.css';

const galleryItems = [
  {
    title: 'Can Hold\nAny\nContent',
    image: '/images/godmode/sand-drift.svg',
    align: 'top'
  },
  {
    title: 'The\nSummer Of\nGlass',
    image: '/images/godmode/water-ripples.svg',
    align: 'center'
  },
  {
    title: 'Move Through\nLight',
    image: '/images/godmode/mist-sky.svg',
    align: 'center'
  },
  {
    title: 'Liquid UI\nFor Motion',
    image: '/images/godmode/water-ripples.svg',
    align: 'bottom'
  }
];

export default function GodmodePage() {
  return (
    <main className="godmode-page" aria-label="Glass scroll demo">
      <div className="godmode-lens" aria-hidden="true">
        <GlassSurface
          className="godmode-lens__surface"
          width="clamp(300px, 54vw, 455px)"
          height="clamp(96px, 15vw, 128px)"
          borderRadius={64}
          borderWidth={0.08}
          brightness={54}
          opacity={0.9}
          blur={12}
          displace={0.32}
          backgroundOpacity={0.02}
          saturation={1.15}
          distortionScale={-148}
          redOffset={0}
          greenOffset={8}
          blueOffset={17}
          mixBlendMode="screen"
        >
          <span className="godmode-lens__inner" />
        </GlassSurface>
      </div>

      <section className="godmode-scroll">
        <div className="godmode-hero-copy">
          <h1>Try scrolling.</h1>
        </div>

        <div className="godmode-gallery">
          {galleryItems.map((item, index) => (
            <article className="godmode-card" key={`${item.title}-${index}`}>
              <img
                className={`godmode-card__image godmode-card__image--${item.align}`}
                src={item.image}
                alt=""
                draggable="false"
              />
              <h2>
                {item.title.split('\n').map(line => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

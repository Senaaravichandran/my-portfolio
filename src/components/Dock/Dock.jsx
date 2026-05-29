import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import './Dock.css';

function DockItem({
  children,
  className = '',
  onClick,
  onActivate,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  label
}) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, value => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };

    return value - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  const activate = () => {
    if (ref.current) onActivate?.(ref.current);
    onClick?.();
  };

  const handleKeyDown = event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    activate();
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={activate}
      onKeyDown={handleKeyDown}
      className={`dock-item ${className}`}
      aria-label={label}
    >
      {Children.map(children, child => cloneElement(child, { isHovered }))}
    </motion.button>
  );
}

function DockLabel({ children, className = '', isHovered }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });

    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className}`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50
}) {
  const panelRef = useRef(null);
  const effectRef = useRef(null);
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [dockHeight, magnification]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  const noise = (amount = 1) => amount / 2 - Math.random() * amount;

  const getXY = (distanceValue, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distanceValue * Math.cos(angle), distanceValue * Math.sin(angle)];
  };

  const createParticle = (index, particleCount) => {
    const rotate = noise(10);

    return {
      start: getXY(42, particleCount - index, particleCount),
      end: getXY(8 + noise(7), particleCount - index, particleCount),
      time: 620 + noise(220),
      scale: 1 + noise(0.25),
      color: Math.floor(Math.random() * 4) + 1,
      rotate: rotate > 0 ? (rotate + 4) * 10 : (rotate - 4) * 10
    };
  };

  const clearParticles = () => {
    if (!effectRef.current) return;
    effectRef.current.querySelectorAll('.dock-gooey-particle').forEach(particle => {
      particle.remove();
    });
  };

  const updateEffectPosition = element => {
    if (!panelRef.current || !effectRef.current) return;

    const panelRect = panelRef.current.getBoundingClientRect();
    const itemRect = element.getBoundingClientRect();

    effectRef.current.style.setProperty('--effect-x', `${itemRect.left - panelRect.left + itemRect.width / 2}px`);
    effectRef.current.style.setProperty('--effect-y', `${itemRect.bottom - panelRect.top - 2}px`);
    effectRef.current.style.setProperty('--effect-width', `${Math.max(24, itemRect.width * 0.58)}px`);
  };

  const makeParticles = () => {
    if (!effectRef.current) return;

    const particleCount = 15;
    effectRef.current.classList.remove('is-active');
    clearParticles();

    for (let i = 0; i < particleCount; i++) {
      const particleData = createParticle(i, particleCount);
      const particle = document.createElement('span');
      const point = document.createElement('span');

      particle.className = 'dock-gooey-particle';
      particle.style.setProperty('--start-x', `${particleData.start[0]}px`);
      particle.style.setProperty('--start-y', `${particleData.start[1]}px`);
      particle.style.setProperty('--end-x', `${particleData.end[0]}px`);
      particle.style.setProperty('--end-y', `${particleData.end[1]}px`);
      particle.style.setProperty('--time', `${particleData.time}ms`);
      particle.style.setProperty('--scale', `${particleData.scale}`);
      particle.style.setProperty('--color', `var(--dock-gooey-color-${particleData.color})`);
      particle.style.setProperty('--rotate', `${particleData.rotate}deg`);

      point.className = 'dock-gooey-point';
      particle.appendChild(point);
      effectRef.current.appendChild(particle);

      setTimeout(() => particle.remove(), particleData.time);
    }

    requestAnimationFrame(() => {
      effectRef.current?.classList.add('is-active');
    });
  };

  const activateEffect = element => {
    updateEffectPosition(element);
    makeParticles();
  };

  useEffect(() => {
    const activeItem = panelRef.current?.querySelector('.dock-item.is-active') ?? panelRef.current?.querySelector('.dock-item');
    if (activeItem) updateEffectPosition(activeItem);
  }, [items]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return undefined;

    const observer = new ResizeObserver(() => {
      const activeItem = panel.querySelector('.dock-item.is-active') ?? panel.querySelector('.dock-item');
      if (activeItem) updateEffectPosition(activeItem);
    });

    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div style={{ height, scrollbarWidth: 'none' }} className="dock-outer">
      <motion.div
        ref={panelRef}
        onMouseMove={({ clientX }) => {
          isHovered.set(1);
          mouseX.set(clientX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`dock-panel ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        <svg className="dock-svg-filter" aria-hidden="true" focusable="false">
          <defs>
            <filter id="dock-gooey-filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <span className="dock-gooey-effect" ref={effectRef} aria-hidden="true" />
        {items.map(item => (
          <DockItem
            key={item.id ?? item.label}
            onClick={item.onClick}
            onActivate={activateEffect}
            className={item.className}
            label={item.label}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}

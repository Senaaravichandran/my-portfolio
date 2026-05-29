import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import './TrueFocus.css';

export default function TrueFocus({
  sentence = 'True Focus',
  manualMode = false,
  blurAmount = 5,
  borderColor = '#5227FF',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = '',
}) {
  const words = useMemo(() => sentence.trim().split(/\s+/), [sentence]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (manualMode || words.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex(current => (current + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => window.clearInterval(timer);
  }, [animationDuration, manualMode, pauseBetweenAnimations, words.length]);

  return (
    <span
      className={`true-focus ${className}`}
      style={{
        '--focus-border-color': borderColor,
        '--focus-blur': `${blurAmount}px`,
      }}
    >
      {words.map((word, index) => {
        const focused = index === activeIndex;
        const readableBlur = Math.min(blurAmount, 0.25);

        return (
          <span
            key={`${word}-${index}`}
            className="true-focus-word"
            onMouseEnter={() => manualMode && setActiveIndex(index)}
          >
            <motion.span
              className="true-focus-label"
              animate={{
                opacity: focused ? 1 : 0.9,
                filter: focused ? 'blur(0px)' : `blur(${readableBlur}px)`,
              }}
              transition={{ duration: animationDuration, ease: 'easeOut' }}
            >
              {word}
            </motion.span>

            {focused && (
              <motion.span
                className="true-focus-frame"
                layoutId="true-focus-frame"
                transition={{ duration: animationDuration, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              />
            )}
          </span>
        );
      })}
    </span>
  );
}

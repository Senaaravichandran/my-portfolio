import React from 'react';
import './ShinyText.css';

export default function ShinyText({ 
  text, 
  speed = 2, 
  delay = 0, 
  color = "#b5b5b5", 
  shineColor = "#ffffff", 
  spread = 120, 
  direction = "left", 
  disabled = false 
}) {
  const inlineStyle = {
    "--shine-color": shineColor,
    "--base-color": color,
    "--speed": `${speed}s`,
    "--spread": `${spread}px`,
    "animationDirection": direction === 'left' ? 'reverse' : 'normal',
    "animationDelay": `${delay}s`,
  };

  return (
    <div 
      className={`shiny-text-inline ${disabled ? 'disabled' : ''}`} 
      style={inlineStyle}
    >
      {text}
    </div>
  );
}
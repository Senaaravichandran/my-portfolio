import './GlassIcons.css';

const gradientMapping = {
  blue: 'linear-gradient(hsl(198, 90%, 52%), hsl(208, 90%, 42%))',
  purple: 'linear-gradient(hsl(282, 82%, 58%), hsl(250, 78%, 44%))',
  red: 'linear-gradient(hsl(352, 90%, 54%), hsl(5, 82%, 45%))',
  indigo: 'linear-gradient(hsl(225, 86%, 56%), hsl(238, 74%, 42%))',
  orange: 'linear-gradient(hsl(42, 90%, 54%), hsl(24, 84%, 48%))',
  green: 'linear-gradient(hsl(150, 78%, 43%), hsl(112, 70%, 34%))',
  cyan: 'linear-gradient(hsl(184, 86%, 52%), hsl(196, 86%, 38%))',
  graphite: 'linear-gradient(hsl(210, 12%, 42%), hsl(210, 18%, 18%))'
};

const getBackgroundStyle = color => ({
  background: gradientMapping[color] || color
});

export default function GlassIcons({ items, activeId, onSelect, className = '' }) {
  return (
    <div className={`icon-btns ${className}`}>
      {items.map(item => (
        <button
          key={item.id}
          className={`icon-btn ${activeId === item.id ? 'is-active' : ''} ${item.customClass || ''}`}
          aria-label={item.label}
          aria-pressed={activeId === item.id}
          type="button"
          onClick={() => onSelect?.(item)}
        >
          <span className="icon-btn__back" style={getBackgroundStyle(item.color)} />
          <span className="icon-btn__front">
            <span className="icon-btn__icon" aria-hidden="true">
              {item.icon}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

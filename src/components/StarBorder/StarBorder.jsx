import './StarBorder.css';

const StarBorder = ({
  as: Component = 'div',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}) => (
  <Component
    className={`star-border-container ${className}`}
    style={{
      padding: `${thickness}px`,
      ...rest.style
    }}
    {...rest}
  >
    <div
      className="border-gradient-bottom"
      style={{
        background: `radial-gradient(circle, ${color} 0%, ${color} 24%, rgba(255, 255, 255, 0.72) 38%, transparent 58%)`,
        animationDuration: speed
      }}
    />
    <div
      className="border-gradient-top"
      style={{
        background: `radial-gradient(circle, ${color} 0%, ${color} 24%, rgba(255, 255, 255, 0.72) 38%, transparent 58%)`,
        animationDuration: speed
      }}
    />
    <div className="star-border-inner-content">{children}</div>
  </Component>
);

export default StarBorder;

import './RainbowButton.css';

export default function RainbowButton({ children, as: Component = 'button', className = '', ...props }) {
  return (
    <Component className={`rainbow-button ${className}`} {...props}>
      <span className="rainbow-button__content">{children}</span>
    </Component>
  );
}

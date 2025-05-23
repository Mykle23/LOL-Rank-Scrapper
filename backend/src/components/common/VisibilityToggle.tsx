import { FaEye, FaEyeSlash } from 'react-icons/fa';

export interface VisibilityToggleProps {
  isVisible: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const VisibilityToggle: React.FC<VisibilityToggleProps> = ({ 
  isVisible, 
  onToggle,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'p-1 text-xs',
    md: 'p-1.5 text-sm',
    lg: 'p-2 text-base'
  };

  return (
    <button
      onClick={onToggle}
      className={`${sizeClasses[size]} text-text-secondary hover:text-text-primary rounded-full hover:bg-border/30 transition-colors`}
      aria-label={isVisible ? 'Hide content' : 'Show content'}
    >
      {isVisible ? <FaEyeSlash /> : <FaEye />}
    </button>
  );
}; 
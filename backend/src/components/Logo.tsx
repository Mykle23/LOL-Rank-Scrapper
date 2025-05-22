interface LogoProps {
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({ height = 48 }) => {
  return (
    <div 
      className="flex items-center font-beaufort text-lol-gold"
      style={{ height: `${height}px` }}
    >
      <span className="text-2xl font-bold tracking-wider">DT</span>
    </div>
  );
}; 
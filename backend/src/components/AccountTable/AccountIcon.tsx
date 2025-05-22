interface AccountIconProps {
  iconUrl: string;
  nickname: string;
  level: number;
}

export const AccountIcon: React.FC<AccountIconProps> = ({ iconUrl, nickname, level }) => {
  return (
    <div className="relative">
      <img
        src={iconUrl}
        alt={`${nickname} profile icon`}
        className="w-12 h-12 rounded-full border border-border/20"
        loading="lazy"
      />
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-card/80 px-1 text-xs text-text-secondary">
        {level}
      </span>
    </div>
  );
}; 
import type { Champion } from '../../types/account';

interface ChampionListProps {
  champions: Champion[];
  maxDisplay?: number;
}

export const ChampionList: React.FC<ChampionListProps> = ({ champions, maxDisplay = 5 }) => {
  return (
    <div className="flex gap-1">
      {champions.slice(0, maxDisplay).map((champion) => (
        <div
          key={champion.key}
          className={`w-8 h-8 rounded-full bg-card border-2 ${
            champion.winrate > 60
              ? 'border-lol-gold'
              : champion.winrate > 50
              ? 'border-green-500'
              : 'border-red-500'
          }`}
          title={`${champion.key}: ${champion.winrate}% WR in ${champion.games} games`}
        />
      ))}
    </div>
  );
}; 
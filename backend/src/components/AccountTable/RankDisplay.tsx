import type { Rank } from '../../types/account';

interface RankDisplayProps {
  rank: Rank;
}

const getRankImage = (tier: string) => {
  const tierLower = tier.toLowerCase();
  return `/ranks/${tierLower}.png`;
};

export const RankDisplay: React.FC<RankDisplayProps> = ({ rank }) => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src={getRankImage(rank.tier)} 
        alt={`${rank.tier} rank`}
        className="w-8 h-8"
      />
      <span className="text-lol-gold">
        {rank.tier} {rank.division}
      </span>
      <span className="text-text-secondary">
        ({rank.lp} LP)
      </span>
    </div>
  );
}; 
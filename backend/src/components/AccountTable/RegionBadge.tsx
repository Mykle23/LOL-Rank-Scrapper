import type { Region } from '../../types/account';

interface RegionBadgeProps {
  region: Region;
}

const getRegionLabel = (region: string) => {
  const regionLabels: { [key: string]: string } = {
    'NA': 'North America',
    'EUW': 'Europe West',
    'EUNE': 'Europe Nordic & East',
    'KR': 'Korea',
    'BR': 'Brazil',
    'LAN': 'Latin America North',
    'LAS': 'Latin America South',
    'OCE': 'Oceania',
    'TR': 'Turkey',
    'RU': 'Russia',
    'JP': 'Japan'
  };
  return regionLabels[region] || region;
};

export const RegionBadge: React.FC<RegionBadgeProps> = ({ region }) => {
  return (
    <span 
      className="px-3 py-1 rounded-full bg-card/60 text-text-secondary text-sm hover:bg-card/80 transition-colors" 
      title={getRegionLabel(region)}
    >
      {region}
    </span>
  );
}; 
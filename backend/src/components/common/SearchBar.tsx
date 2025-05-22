import { useState } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import type { Region, Tier } from '../../types/account';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange?: (filters: SearchFilters) => void;
  placeholder?: string;
  className?: string;
}

export interface SearchFilters {
  regions: Region[];
  tiers: Tier[];
}

const allRegions: Region[] = ['EUW', 'EUNE', 'NA', 'BR', 'LAN', 'LAS', 'OCE', 'KR'];
const allTiers: Tier[] = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'EMERALD', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'];

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterChange,
  placeholder = 'Search...',
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({ regions: [], tiers: [] });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const clearInput = () => {
    setQuery('');
    onSearch('');
  };

  const toggleFilter = <T extends 'regions' | 'tiers'>(type: T, value: T extends 'regions' ? Region : Tier) => {
    const newFilters = { ...filters };
    const currentValues = newFilters[type] as (T extends 'regions' ? Region : Tier)[];
    const index = currentValues.indexOf(value);
    
    if (index === -1) {
      newFilters[type] = [...currentValues, value] as any;
    } else {
      newFilters[type] = currentValues.filter(item => item !== value) as any;
    }
    
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const isFilterActive = <T extends 'regions' | 'tiers'>(type: T, value: T extends 'regions' ? Region : Tier): boolean => {
    const currentValues = filters[type] as (T extends 'regions' ? Region : Tier)[];
    return currentValues.includes(value);
  };

  const hasActiveFilters = filters.regions.length > 0 || filters.tiers.length > 0;

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-16 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-text-primary placeholder-text-secondary"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
          {query && (
            <button 
              onClick={clearInput} 
              className="text-text-secondary hover:text-text-primary"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
          <button 
            onClick={() => setShowFilters(!showFilters)} 
            className={`text-text-secondary hover:text-text-primary ${hasActiveFilters ? 'text-electric-blue' : ''}`}
            aria-label="Show filters"
            aria-expanded={showFilters}
          >
            <FaFilter />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mt-2 p-4 bg-card border border-border rounded-lg shadow-lg">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-text-primary mb-2">Region</h4>
            <div className="flex flex-wrap gap-2">
              {allRegions.map(region => (
                <button
                  key={region}
                  onClick={() => toggleFilter('regions', region)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    isFilterActive('regions', region)
                      ? 'bg-electric-blue text-white border-electric-blue'
                      : 'bg-card text-text-secondary border-border hover:bg-border/20'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2">Rank</h4>
            <div className="flex flex-wrap gap-2">
              {allTiers.map(tier => (
                <button
                  key={tier}
                  onClick={() => toggleFilter('tiers', tier)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    isFilterActive('tiers', tier)
                      ? 'bg-electric-blue text-white border-electric-blue'
                      : 'bg-card text-text-secondary border-border hover:bg-border/20'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
          
          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setFilters({ regions: [], tiers: [] });
                  if (onFilterChange) {
                    onFilterChange({ regions: [], tiers: [] });
                  }
                }}
                className="text-sm text-text-secondary hover:text-text-primary underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 
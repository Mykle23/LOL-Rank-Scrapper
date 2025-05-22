import { useState, useMemo } from 'react';
import type { Account } from '../../types/account';
import { AccountRow } from './AccountRow';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { Spinner } from '../common/Spinner';
import { SearchBar } from '../common/SearchBar';
import type { SearchFilters } from '../common/SearchBar';

interface AccountTableProps {
  accounts: Account[];
  onLockToggle: (id: string, locked: boolean) => void;
  isLoading?: boolean;
}

export const AccountTable: React.FC<AccountTableProps> = ({ 
  accounts, 
  onLockToggle,
  isLoading = false 
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Account;
    direction: 'ascending' | 'descending';
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({ regions: [], tiers: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (key: keyof Account) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Account) => {
    if (sortConfig?.key !== key) return <FaSort className="ml-1 text-text-secondary/50" />;
    return sortConfig.direction === 'ascending' ? 
      <FaSortUp className="ml-1 text-text-primary" /> : 
      <FaSortDown className="ml-1 text-text-primary" />;
  };

  const filteredAndSortedAccounts = useMemo(() => {
    let result = [...accounts];
    
    // Apply text search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(account => 
        account.nickname.toLowerCase().includes(query) ||
        account.region.toLowerCase().includes(query) ||
        String(account.rank).toLowerCase().includes(query)
      );
    }

    // Apply advanced filters
    if (searchFilters.regions.length > 0) {
      result = result.filter(account => searchFilters.regions.includes(account.region));
    }
    
    if (searchFilters.tiers.length > 0) {
      result = result.filter(account => searchFilters.tiers.includes(account.rank.tier));
    }

    // Apply sorting
    if (sortConfig) {
      const { key, direction } = sortConfig;
      result.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];
        if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [accounts, sortConfig, searchQuery, searchFilters]);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, searchFilters]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedAccounts.length / itemsPerPage);
  const paginatedAccounts = filteredAndSortedAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderSortableHeader = (key: keyof Account, label: string) => (
    <th 
      className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary group"
      onClick={() => handleSort(key)}
      aria-sort={sortConfig?.key === key ? sortConfig.direction : undefined}
    >
      <div className="flex items-center">
        <span className="group-hover:text-text-primary transition-colors">{label}</span>
        {getSortIcon(key)}
      </div>
    </th>
  );

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="bg-card/50 p-4 rounded-lg">
        <SearchBar 
          onSearch={setSearchQuery} 
          onFilterChange={setSearchFilters}
          placeholder="Search accounts by name, region, rank..."
        />
        
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm text-text-secondary">
            Showing {paginatedAccounts.length} of {filteredAndSortedAccounts.length} accounts
          </span>
          
          {/* Quick Rank Filter Pills - Optional Alternative UI */}
          <div className="flex flex-wrap gap-1.5">
            {['DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'].map(tier => (
              <button
                key={tier}
                onClick={() => {
                  const newTiers = searchFilters.tiers.includes(tier as any) 
                    ? searchFilters.tiers.filter(t => t !== tier)
                    : [...searchFilters.tiers, tier];
                  
                  setSearchFilters({...searchFilters, tiers: newTiers as any});
                }}
                className={`px-2 py-0.5 text-xs rounded border ${
                  searchFilters.tiers.includes(tier as any)
                    ? 'bg-electric-blue/20 text-electric-blue border-electric-blue/30'
                    : 'bg-transparent text-text-secondary border-border'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="relative overflow-x-auto overflow-y-visible rounded-lg border border-border">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm z-10">
            <Spinner size="lg" />
          </div>
        ) : null}
        
        <div className="min-w-full overflow-x-auto">
          <table className="min-w-full bg-card">
            <thead className="sticky top-0 bg-card shadow z-[1]">
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Icon
                </th>
                {renderSortableHeader('nickname', 'Name')}
                {renderSortableHeader('region', 'Region')}
                {renderSortableHeader('rank', 'Rank')}
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider hidden md:table-cell">
                  Roles
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Lock
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider hidden sm:table-cell">
                  Username
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider hidden sm:table-cell">
                  Password
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider hidden lg:table-cell">
                  Calendar
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider hidden md:table-cell">
                  Top Champions
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-text-secondary uppercase tracking-wider sm:hidden">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedAccounts.map((account) => (
                <AccountRow
                  key={account.id}
                  account={account}
                  onLockToggle={onLockToggle}
                />
              ))}
              {paginatedAccounts.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-text-secondary">
                    {searchQuery || searchFilters.regions.length > 0 || searchFilters.tiers.length > 0 
                      ? 'No accounts found matching your search criteria' 
                      : 'No accounts available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-md bg-card border border-border text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            Previous
          </button>
          
          {/* Simplified pagination with ellipsis for many pages */}
          {(totalPages <= 7 ? 
            Array.from({ length: totalPages }, (_, i) => i + 1) : 
            Array.from({ length: 7 }, (_, i) => {
              if (i === 0) return 1;
              if (i === 6) return totalPages;
              
              const middle = 3;
              if (currentPage <= 4) {
                return i + 1;
              } else if (currentPage >= totalPages - 3) {
                return totalPages - 6 + i;
              } else {
                return i === 1 ? '...' : 
                       i === 5 ? '...' : 
                       currentPage + (i - middle);
              }
            })
          ).map((page, i) => (
            typeof page === 'number' ? 
              <button
                key={i}
                onClick={() => setCurrentPage(page)}
                className={`min-w-[2.5rem] px-2 py-1.5 rounded-md border ${
                  currentPage === page
                    ? 'bg-electric-blue text-white border-electric-blue shadow-sm shadow-electric-blue/20'
                    : 'bg-card border-border text-text-secondary hover:text-text-primary hover:border-electric-blue/30'
                } transition-colors`}
              >
                {page}
              </button> :
              <span key={i} className="px-2 py-1.5 text-text-secondary">
                {page}
              </span>
          ))}
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-md bg-card border border-border text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}

      {/* Calendar Legend - Simplified and Better UI */}
      <div className="bg-card rounded-lg p-4 border border-border">
        <h3 className="text-sm font-medium text-text-primary mb-3">Calendar Legend</h3>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-emerald-500" />
            <span className="text-sm text-text-secondary">Excellent ({'>'}20 LP, {'<'}4h)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-green-500" />
            <span className="text-sm text-text-secondary">Good ({'>'}0 LP, {'<'}4h)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-yellow-500" />
            <span className="text-sm text-text-secondary">Positive ({'>'}0 LP, {'>'}4h)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-orange-500" />
            <span className="text-sm text-text-secondary">Poor ({'<'}0 LP, {'<'}4h)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-red-500" />
            <span className="text-sm text-text-secondary">Bad ({'<'}0 LP, {'>'}4h)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-gray-700" />
            <span className="text-sm text-text-secondary">No games played</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 
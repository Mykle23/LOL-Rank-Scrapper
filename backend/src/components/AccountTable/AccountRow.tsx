import { useState } from 'react';
import type { Account } from '../../types/account';
import { AccountIcon } from './AccountIcon';
import { CopyButton } from '../common/CopyButton';
import { RegionBadge } from './RegionBadge';
import { RankDisplay } from './RankDisplay';
import { RoleIcons } from './RoleIcons';
import { LockToggle } from './LockToggle';
import { VisibilityToggle } from '../common/VisibilityToggle';
import { ActivityCalendar } from './ActivityCalendar/ActivityCalendar';
import { ChampionList } from './ChampionList';
import { FaEllipsisV } from 'react-icons/fa';

interface AccountRowProps {
  account: Account;
  onLockToggle: (id: string, locked: boolean) => void;
}

export const AccountRow: React.FC<AccountRowProps> = ({ account, onLockToggle }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showMobileActions, setShowMobileActions] = useState(false);

  return (
    <tr className="hover:bg-card/50 transition-colors group">
      <td className="px-4 py-4">
        <AccountIcon 
          iconUrl={account.iconUrl} 
          nickname={account.nickname} 
          level={account.level} 
        />
      </td>
      <td className="px-4 py-4">
        <CopyButton text={`${account.nickname}#${account.tag}`} label="Name">
          <span className="font-bold">{account.nickname}</span>
          <span className="text-text-secondary">#{account.tag}</span>
        </CopyButton>
      </td>
      <td className="px-4 py-4">
        <RegionBadge region={account.region} />
      </td>
      <td className="px-4 py-4">
        <RankDisplay rank={account.rank} />
      </td>
      <td className="px-4 py-4 hidden md:table-cell">
        <RoleIcons roles={account.roles} />
      </td>
      <td className="px-4 py-4">
        <LockToggle 
          isLocked={account.locked} 
          onToggle={() => onLockToggle(account.id, !account.locked)} 
        />
      </td>
      <td className="px-4 py-4 hidden sm:table-cell">
        <CopyButton text={account.username} label="Username">
          <span>{account.username}</span>
        </CopyButton>
      </td>
      <td className="px-4 py-4 hidden sm:table-cell">
        <div className="flex items-center gap-2">
          <CopyButton text={account.password} label="Password">
            <span className={isPasswordVisible ? '' : 'blur-sm font-mono'}>
              {account.password}
            </span>
          </CopyButton>
          <VisibilityToggle 
            isVisible={isPasswordVisible} 
            onToggle={() => setIsPasswordVisible(!isPasswordVisible)} 
          />
        </div>
      </td>
      <td className="px-4 py-4 hidden lg:table-cell">
        <ActivityCalendar calendar={account.calendar} />
      </td>
      <td className="px-4 py-4 hidden md:table-cell">
        <ChampionList champions={account.champions} />
      </td>

      {/* Mobile actions column */}
      <td className="px-4 py-4 text-center relative sm:hidden">
        <button 
          className="p-2 rounded-full hover:bg-border/30 transition-colors"
          onClick={() => setShowMobileActions(!showMobileActions)}
          aria-label="Show actions"
        >
          <FaEllipsisV className="text-text-secondary" />
        </button>

        {showMobileActions && (
          <div className="absolute right-2 top-12 z-10 bg-card border border-border rounded-lg shadow-lg p-3 min-w-[180px]">
            <div className="space-y-3">
              <div>
                <div className="text-xs text-text-secondary mb-1">Username</div>
                <CopyButton text={account.username} label="Username">
                  <span className="text-sm">{account.username}</span>
                </CopyButton>
              </div>

              <div>
                <div className="text-xs text-text-secondary mb-1">Password</div>
                <div className="flex items-center gap-2">
                  <CopyButton text={account.password} label="Password">
                    <span className={`text-sm ${isPasswordVisible ? '' : 'blur-sm font-mono'}`}>
                      {account.password}
                    </span>
                  </CopyButton>
                  <VisibilityToggle 
                    isVisible={isPasswordVisible} 
                    onToggle={() => setIsPasswordVisible(!isPasswordVisible)} 
                    size="sm"
                  />
                </div>
              </div>

              <div>
                <div className="text-xs text-text-secondary mb-1">Roles</div>
                <RoleIcons roles={account.roles} size="sm" />
              </div>

              <button 
                className="w-full px-3 py-1.5 text-sm rounded-md bg-electric-blue text-white mt-2"
                onClick={() => setShowMobileActions(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}; 
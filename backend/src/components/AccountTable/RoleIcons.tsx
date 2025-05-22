import { 
  FaChessRook, 
  FaTree, 
  FaMagic, 
  FaCrosshairs, 
  FaShieldAlt 
} from 'react-icons/fa';
import type { Role } from '../../types/account';
import { Fragment } from 'react';

export interface RoleIconsProps {
  roles: Role[];
  size?: 'sm' | 'md' | 'lg';
}

const getRoleIcon = (role: Role) => {
  switch (role) {
    case 'TOP':
      return <FaChessRook />;
    case 'JUNGLE':
      return <FaTree />;
    case 'MID':
      return <FaMagic />;
    case 'ADC':
      return <FaCrosshairs />;
    case 'SUPPORT':
      return <FaShieldAlt />;
  }
};

const getRoleLabel = (role: Role) => {
  switch (role) {
    case 'TOP':
      return 'Top';
    case 'JUNGLE':
      return 'Jungle';
    case 'MID':
      return 'Mid';
    case 'ADC':
      return 'ADC';
    case 'SUPPORT':
      return 'Support';
  }
};

export const RoleIcons: React.FC<RoleIconsProps> = ({ roles, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xs p-1',
    md: 'text-sm p-1.5',
    lg: 'text-base p-2'
  };
  
  return (
    <div className="flex gap-1.5">
      {roles.map((role, index) => (
        <Fragment key={role}>
          <div 
            className={`${sizeClasses[size]} rounded-full bg-card border border-border text-text-secondary flex items-center justify-center`}
            title={getRoleLabel(role)}
          >
            {getRoleIcon(role)}
          </div>
          {index < roles.length - 1 && size === 'md' && (
            <span className="text-text-secondary/30">/</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}; 
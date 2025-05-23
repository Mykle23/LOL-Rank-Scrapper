import { NavLink } from 'react-router-dom';
import { FaTable, FaChartBar, FaUsers, FaCog } from 'react-icons/fa';

export const Navigation: React.FC = () => {
  const getLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
      isActive
        ? 'bg-electric-blue text-white font-medium shadow-md shadow-electric-blue/20'
        : 'text-text-secondary hover:text-text-primary hover:bg-border/20'
    }`;

  return (
    <nav className="flex md:items-center flex-col md:flex-row gap-2 md:gap-4">
      <NavLink to="/" className={getLinkClasses} end>
        <FaTable className="text-sm" />
        <span>Accounts</span>
      </NavLink>
      <NavLink to="/analytics" className={getLinkClasses}>
        <FaChartBar className="text-sm" />
        <span>Analytics</span>
      </NavLink>
      <NavLink to="/teams" className={getLinkClasses}>
        <FaUsers className="text-sm" />
        <span>Teams</span>
      </NavLink>
      <NavLink to="/settings" className={getLinkClasses}>
        <FaCog className="text-sm" />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
}; 
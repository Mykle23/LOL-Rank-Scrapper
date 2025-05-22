import { FaLock, FaLockOpen } from 'react-icons/fa';

interface LockToggleProps {
  isLocked: boolean;
  onToggle: () => void;
}

export const LockToggle: React.FC<LockToggleProps> = ({ isLocked, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`text-xl ${
        isLocked ? 'text-red-500' : 'text-green-500'
      } hover:opacity-80 transition-opacity`}
      aria-label={isLocked ? 'Locked' : 'Unlocked'}
    >
      {isLocked ? <FaLock /> : <FaLockOpen />}
    </button>
  );
}; 
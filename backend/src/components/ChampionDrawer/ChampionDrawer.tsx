import { FaTimes } from 'react-icons/fa';
import type { Champion } from '../../types/account';

interface ChampionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  champions: Champion[];
}

export const ChampionDrawer: React.FC<ChampionDrawerProps> = ({
  isOpen,
  onClose,
  champions,
}) => {
  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-96 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-150 ease-out bg-card border-l border-border z-50`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-beaufort text-text-primary">Champions</h2>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Close champions drawer"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-4">
              {champions.map((champion) => (
                <div
                  key={champion.key}
                  className="group relative"
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-card border-2 ${
                      champion.winrate > 60
                        ? 'border-lol-gold'
                        : champion.winrate > 50
                        ? 'border-green-500'
                        : 'border-red-500'
                    }`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-card/95 px-2 py-1 rounded text-xs text-text-primary whitespace-nowrap">
                      {champion.key}: {champion.winrate}% WR
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
}; 
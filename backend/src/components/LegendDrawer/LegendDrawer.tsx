import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface Stats {
  totalHours: number;
  totalMatches: number;
}

interface LegendDrawerProps {
  stats: Stats;
}

export const LegendDrawer: React.FC<LegendDrawerProps> = ({ stats }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="fixed bottom-4 right-4 lg:hidden bg-card p-4 rounded-full shadow-lg text-text-primary hover:text-electric-blue transition-colors"
        aria-label="Toggle legend drawer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      <div
        className={`fixed inset-x-0 bottom-0 lg:bottom-auto lg:right-0 lg:top-0 lg:w-80 transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full lg:translate-x-full lg:translate-y-0'
        } transition-transform duration-150 ease-out bg-card border-t lg:border-l border-border h-96 lg:h-screen z-40`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-beaufort text-text-primary">Legend</h2>
            <button
              onClick={toggleDrawer}
              className="text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Close legend drawer"
            >
              <FaTimes />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-2">Activity Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-green-500" />
                  <span className="text-text-primary">High LP gain (20+ LP)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-blue-500" />
                  <span className="text-text-primary">Positive LP gain (1-19 LP)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-red-500" />
                  <span className="text-text-primary">LP loss</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-gray-700" />
                  <span className="text-text-primary">No games played</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-2">Champion Performance</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-card border-2 border-lol-gold" />
                  <span className="text-text-primary">Exceptional (60%+ WR)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-card border-2 border-green-500" />
                  <span className="text-text-primary">Positive (50-59% WR)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-card border-2 border-red-500" />
                  <span className="text-text-primary">Negative (&lt;50% WR)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Total Hours Played</span>
                  <span className="text-text-primary font-medium">{stats.totalHours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Total Matches</span>
                  <span className="text-text-primary font-medium">{stats.totalMatches}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={toggleDrawer}
          aria-hidden="true"
        />
      )}
    </>
  );
}; 
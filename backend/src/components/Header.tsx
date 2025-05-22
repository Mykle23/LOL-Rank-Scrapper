import { Logo } from './Logo';
import { Navigation } from './Navigation/Navigation';
import { FaCog } from 'react-icons/fa';
import { useState } from 'react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-10 bg-card border-b border-border shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <Logo height={40} />
          <div className="hidden md:block">
            <Navigation />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <h1 className="font-beaufort text-lg sm:text-xl md:text-2xl text-text-primary font-semibold bg-gradient-to-r from-electric-blue to-primary bg-clip-text text-transparent">
            Accounts Dashboard
          </h1>
          
          <button 
            className="p-2 rounded-full hover:bg-border/30 transition-colors text-text-secondary hover:text-text-primary"
            aria-label="Settings"
          >
            <FaCog />
          </button>
          
          <button 
            className="md:hidden p-2 rounded-full hover:bg-border/30 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-0.5 bg-text-primary mb-1.5"></div>
            <div className="w-5 h-0.5 bg-text-primary mb-1.5"></div>
            <div className="w-5 h-0.5 bg-text-primary"></div>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <Navigation />
          </div>
        </div>
      )}
    </header>
  );
}; 
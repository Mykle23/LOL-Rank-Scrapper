import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { AccountTable } from './components/AccountTable/AccountTable';
import { ToastProvider } from './components/Toast/Toaster';
import { lazy, Suspense, useMemo } from 'react';
import accountsData from './mocks/accounts.json';
import { Spinner } from './components/common/Spinner';
import type { Account, Region, Role, Tier, Division } from './types/account';

// Lazy-loaded components for better performance
const Analytics = lazy(() => import('./components/Analytics/Analytics'));
const Settings = lazy(() => import('./components/Settings/Settings'));
const Teams = lazy(() => import('./components/Teams/Teams'));

// Loading component for lazy-loaded routes
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <Spinner size="lg" />
  </div>
);

const App: React.FC = () => {
  // Map JSON data to TypeScript types
  const accounts = useMemo(() => {
    return accountsData.accounts.map(account => {
      // Ensure region is a valid Region type
      const region = account.region as Region;
      
      // Ensure roles are valid Role types
      const roles = account.roles.map(role => role as Role);
      
      // Ensure rank tier and division are valid types
      const tier = account.rank.tier as Tier;
      const division = account.rank.division as Division;
      
      return {
        ...account,
        region,
        roles,
        rank: {
          ...account.rank,
          tier,
          division
        }
      } as Account;
    });
  }, []);

  return (
    <Router>
      <ToastProvider>
        <div className="min-h-screen bg-root flex flex-col">
          <Header />
          <main className="container mx-auto px-4 py-6 flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route 
                  path="/" 
                  element={<AccountTable accounts={accounts} onLockToggle={() => {}} />} 
                />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <footer className="border-t border-border bg-card py-3 text-center text-text-secondary text-sm">
            <div className="container mx-auto px-4">
              League of Legends Rank Tracker © {new Date().getFullYear()}
            </div>
          </footer>
        </div>
      </ToastProvider>
    </Router>
  );
};

export default App;

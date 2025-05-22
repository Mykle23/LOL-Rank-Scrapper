import React from 'react';
import Navbar from './components/Navbar';
import AccountsTable from './components/AccountsTable/AccountsTable';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0D1421]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <AccountsTable />
      </main>
    </div>
  );
};

export default App;

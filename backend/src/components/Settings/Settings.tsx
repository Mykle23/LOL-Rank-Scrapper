import React, { useState } from 'react';
import { FaCog, FaKey, FaUser, FaPalette, FaDatabase, FaBell } from 'react-icons/fa';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const tabs = [
    { id: 'general', label: 'General', icon: <FaCog /> },
    { id: 'account', label: 'Account', icon: <FaUser /> },
    { id: 'appearance', label: 'Appearance', icon: <FaPalette /> },
    { id: 'security', label: 'Security', icon: <FaKey /> },
    { id: 'data', label: 'Data Management', icon: <FaDatabase /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">Settings</h1>
      
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Sidebar */}
          <div className="sm:w-64 border-r border-border bg-card/50">
            <nav className="p-4">
              <ul className="space-y-1">
                {tabs.map(tab => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                        activeTab === tab.id
                          ? 'bg-electric-blue text-white'
                          : 'text-text-secondary hover:text-text-primary hover:bg-border/20'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-text-primary">General Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="api-key" className="block text-sm font-medium text-text-primary mb-2">
                      Riot Games API Key
                    </label>
                    <div className="flex">
                      <input
                        type="password"
                        id="api-key"
                        className="flex-1 bg-card border border-border rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-electric-blue/50"
                        placeholder="Enter your API key"
                        defaultValue="RGAPI-xxxx-xxxx-xxxx-xxxx"
                      />
                      <button className="bg-electric-blue text-white px-4 py-2 rounded-r-md hover:bg-electric-blue/90 transition-colors">
                        Update
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-text-secondary">
                      Get your API key from <a href="https://developer.riotgames.com/" className="text-electric-blue hover:underline">Riot Developer Portal</a>
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Auto Refresh Interval
                    </label>
                    <select className="w-full bg-card border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-electric-blue/50">
                      <option value="0">Manual refresh only</option>
                      <option value="15">Every 15 minutes</option>
                      <option value="30">Every 30 minutes</option>
                      <option value="60">Every hour</option>
                      <option value="360">Every 6 hours</option>
                      <option value="720">Every 12 hours</option>
                      <option value="1440">Every 24 hours</option>
                    </select>
                    <p className="mt-1 text-xs text-text-secondary">
                      How often to automatically fetch new account data from Riot API
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <label className="flex items-center">
                      <input type="checkbox" className="w-5 h-5 rounded border-border" defaultChecked />
                      <span className="ml-2 text-text-primary">Show account passwords by default</span>
                    </label>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <button className="bg-electric-blue text-white px-4 py-2 rounded-md hover:bg-electric-blue/90 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab !== 'general' && (
              <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-md bg-card/50">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-text-primary">{tabs.find(tab => tab.id === activeTab)?.label}</h3>
                  <p className="text-text-secondary mt-2">Settings section coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 
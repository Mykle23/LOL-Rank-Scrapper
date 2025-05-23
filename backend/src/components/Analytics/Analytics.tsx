import React from 'react';
import { FaChartBar, FaChartLine, FaChartPie, FaUsers } from 'react-icons/fa';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-text-primary">Account Analytics</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-card border border-border rounded-md text-text-primary hover:bg-border/20 transition-colors">
            Last 7 days
          </button>
          <button className="px-4 py-2 bg-electric-blue text-white rounded-md hover:bg-electric-blue/90 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-electric-blue/20 rounded-full">
              <FaUsers className="text-electric-blue" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Total Accounts</p>
              <h3 className="text-2xl font-semibold text-text-primary">42</h3>
            </div>
          </div>
          <div className="mt-2 text-sm text-emerald-500">+3 this month</div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 rounded-full">
              <FaChartLine className="text-emerald-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Average Win Rate</p>
              <h3 className="text-2xl font-semibold text-text-primary">54.2%</h3>
            </div>
          </div>
          <div className="mt-2 text-sm text-emerald-500">+1.5% from last week</div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500/20 rounded-full">
              <FaChartBar className="text-yellow-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Total LP Gained</p>
              <h3 className="text-2xl font-semibold text-text-primary">1,245</h3>
            </div>
          </div>
          <div className="mt-2 text-sm text-yellow-500">Across all accounts</div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 rounded-full">
              <FaChartPie className="text-purple-500" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">Rank Distribution</p>
              <h3 className="text-2xl font-semibold text-text-primary">65% Diamond+</h3>
            </div>
          </div>
          <div className="mt-2 text-sm text-text-secondary">12 Master, 15 Diamond</div>
        </div>
      </div>

      {/* Placeholder for charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-medium text-text-primary mb-4">LP Progression</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-md bg-card/50">
            <p className="text-text-secondary">LP Chart will be displayed here</p>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-medium text-text-primary mb-4">Win Rate by Role</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-md bg-card/50">
            <p className="text-text-secondary">Role Win Rate Chart will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-medium text-text-primary mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-card/50 rounded-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-medium">
                +15
              </div>
              <div>
                <p className="text-text-primary font-medium">RankClimber123 gained LP</p>
                <p className="text-text-secondary text-sm">Diamond II → Diamond I</p>
              </div>
            </div>
            <span className="text-text-secondary text-sm">2h ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-card/50 rounded-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-medium">
                -9
              </div>
              <div>
                <p className="text-text-primary font-medium">MidGapper420 lost LP</p>
                <p className="text-text-secondary text-sm">Platinum I → Platinum I</p>
              </div>
            </div>
            <span className="text-text-secondary text-sm">5h ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 
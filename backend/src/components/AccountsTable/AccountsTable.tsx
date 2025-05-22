import React, { useState } from 'react';
import { FaLock, FaLockOpen, FaCopy } from 'react-icons/fa';

interface Account {
  id: string;
  icon: string;
  name: string;
  region: string;
  rank: string;
  roles: string[];
  locked: boolean;
  username: string;
  password: string;
  activity: ('high' | 'medium' | 'low' | 'none')[];
  topChampions: string[];
}

const AccountsTable: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getActivityColor = (activity: 'high' | 'medium' | 'low' | 'none') => {
    switch (activity) {
      case 'high':
        return 'bg-green-500';
      case 'medium':
        return 'bg-blue-500';
      case 'low':
        return 'bg-red-500';
      default:
        return 'bg-gray-700';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#0D1421]">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Icon</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Region</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rank</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Roles</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Lock</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Username</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Password</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Activity</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Top Champions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {/* Example row - you'll map through your actual data here */}
          <tr className="hover:bg-gray-800/50 transition-colors">
            <td className="px-4 py-4">
              <div className="w-10 h-10 rounded-full bg-gray-700"></div>
            </td>
            <td className="px-4 py-4 text-white">Account Name</td>
            <td className="px-4 py-4 text-blue-400">EUW</td>
            <td className="px-4 py-4">
              <span className="text-yellow-500">Diamond</span>
            </td>
            <td className="px-4 py-4">
              <div className="flex space-x-1">
                <div className="w-6 h-6 rounded-full bg-red-500" title="Top"></div>
                <div className="w-6 h-6 rounded-full bg-green-500" title="Jungle"></div>
              </div>
            </td>
            <td className="px-4 py-4">
              <FaLock className="text-red-500" />
            </td>
            <td className="px-4 py-4">
              <div className="flex items-center space-x-2">
                <span className="text-white">•••••••••</span>
                <button
                  onClick={() => copyToClipboard('username', 'username')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaCopy />
                </button>
              </div>
            </td>
            <td className="px-4 py-4">
              <div className="flex items-center space-x-2">
                <span className="text-white">•••••••••</span>
                <button
                  onClick={() => copyToClipboard('password', 'password')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaCopy />
                </button>
              </div>
            </td>
            <td className="px-4 py-4">
              <div className="grid grid-cols-4 gap-1">
                {['high', 'medium', 'low', 'none'].map((activity, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-sm ${getActivityColor(activity as 'high' | 'medium' | 'low' | 'none')}`}
                  ></div>
                ))}
              </div>
            </td>
            <td className="px-4 py-4">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-gray-700 border-2 border-yellow-500"
                  ></div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AccountsTable; 
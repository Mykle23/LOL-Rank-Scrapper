import React from 'react';
import { FaPlus, FaUsers, FaChessRook, FaTree, FaMagic, FaCrosshairs, FaShieldAlt } from 'react-icons/fa';

const Teams: React.FC = () => {
  // Sample team data
  const teams = [
    {
      id: 'team-1',
      name: 'Team Alpha',
      members: [
        { id: 'user-1', name: 'RankClimber123', role: 'TOP', rank: 'DIAMOND II' },
        { id: 'user-2', name: 'JungleKing99', role: 'JUNGLE', rank: 'DIAMOND III' },
        { id: 'user-3', name: 'MidOrFeed', role: 'MID', rank: 'DIAMOND I' },
        { id: 'user-4', name: 'ADCGapper', role: 'ADC', rank: 'DIAMOND II' },
        { id: 'user-5', name: 'SupportDiff', role: 'SUPPORT', rank: 'DIAMOND II' },
      ],
      averageRank: 'DIAMOND II',
      winRate: 62
    },
    {
      id: 'team-2',
      name: 'Team Beta',
      members: [
        { id: 'user-6', name: 'TopGap', role: 'TOP', rank: 'PLATINUM I' },
        { id: 'user-7', name: 'PathFinder', role: 'JUNGLE', rank: 'DIAMOND IV' },
        { id: 'user-8', name: 'MidLaner', role: 'MID', rank: 'DIAMOND III' },
        { id: 'user-9', name: 'CarryHard', role: 'ADC', rank: 'DIAMOND IV' },
        { id: 'user-10', name: 'ShieldMaster', role: 'SUPPORT', rank: 'DIAMOND III' },
      ],
      averageRank: 'DIAMOND IV',
      winRate: 51
    }
  ];
  
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'TOP':
        return <FaChessRook className="text-text-primary" />;
      case 'JUNGLE':
        return <FaTree className="text-text-primary" />;
      case 'MID':
        return <FaMagic className="text-text-primary" />;
      case 'ADC':
        return <FaCrosshairs className="text-text-primary" />;
      case 'SUPPORT':
        return <FaShieldAlt className="text-text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-text-primary">Teams</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-electric-blue text-white rounded-md hover:bg-electric-blue/90 transition-colors">
          <FaPlus size={14} />
          <span>Create Team</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teams.map(team => (
          <div key={team.id} className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-4 border-b border-border bg-card/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-electric-blue/20 flex items-center justify-center">
                    <FaUsers className="text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-text-primary">{team.name}</h3>
                    <p className="text-sm text-text-secondary">{team.members.length} members • {team.averageRank}</p>
                  </div>
                </div>
                <div className="bg-card px-3 py-1 rounded-full border border-border">
                  <span className="text-sm font-medium" style={{ color: team.winRate > 55 ? '#10b981' : team.winRate < 45 ? '#ef4444' : '#f59e0b' }}>
                    {team.winRate}% Win Rate
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                {team.members.map(member => (
                  <div key={member.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-border/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-card/50 border border-border flex items-center justify-center">
                      {getRoleIcon(member.role)}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-text-primary">{member.name}</span>
                      <span className="text-sm text-text-secondary ml-2">({member.role})</span>
                    </div>
                    <span className="text-sm text-text-secondary">{member.rank}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex gap-2 justify-end">
                <button className="px-3 py-1.5 text-sm text-text-secondary border border-border rounded-md hover:bg-border/20 transition-colors">
                  Edit Team
                </button>
                <button className="px-3 py-1.5 text-sm text-white bg-electric-blue rounded-md hover:bg-electric-blue/90 transition-colors">
                  View Statistics
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Create new team card */}
        <div className="bg-card border border-dashed border-border rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-electric-blue/20 mx-auto mb-3 flex items-center justify-center">
              <FaPlus className="text-electric-blue" />
            </div>
            <h3 className="font-medium text-text-primary mb-1">Create New Team</h3>
            <p className="text-sm text-text-secondary">Group accounts into a team to analyze performance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams; 
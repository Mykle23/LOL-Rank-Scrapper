import type { CalendarDay } from '../../../types/account';

interface CalendarLegendProps {
  calendar: CalendarDay[];
}

export const CalendarLegend: React.FC<CalendarLegendProps> = ({ calendar }) => {
  const totalGames = calendar.reduce((sum, day) => sum + day.gamesPlayed, 0);
  const netLP = calendar.reduce((sum, day) => sum + day.deltaLP, 0);

  return (
    <div className="flex items-center justify-between text-xs text-text-secondary">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-gray-700" title="No games" />
            <div className="w-3 h-3 rounded-sm bg-red-500" title="LP Loss > 10" />
            <div className="w-3 h-3 rounded-sm bg-orange-500" title="LP Loss ≤ 10" />
            <div className="w-3 h-3 rounded-sm bg-blue-400" title="LP Gain ≤ 10" />
            <div className="w-3 h-3 rounded-sm bg-green-500" title="LP Gain > 10" />
            <div className="w-3 h-3 rounded-sm bg-emerald-500" title="LP Gain ≥ 20" />
          </div>
          <span>More</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Total Games: {totalGames}</span>
          <span>Net LP: {netLP}</span>
        </div>
      </div>
    </div>
  );
}; 
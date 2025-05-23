import type { CalendarDay } from '../../../types/account';

interface CalendarGridProps {
  weeks: { date: Date; data: CalendarDay | null }[][];
  weekdays: string[];
}

const getCalendarColor = (deltaLP: number) => {
  if (deltaLP === 0) return 'bg-gray-700';
  if (deltaLP >= 20) return 'bg-emerald-500';
  if (deltaLP > 10) return 'bg-green-500';
  if (deltaLP > 0) return 'bg-blue-400';
  if (deltaLP > -10) return 'bg-orange-500';
  return 'bg-red-500';
};

export const CalendarGrid: React.FC<CalendarGridProps> = ({ weeks, weekdays }) => {
  return (
    <div className="flex">
      {/* Weekday Labels */}
      <div className="flex flex-col justify-between h-[140px] mr-2">
        {weekdays.map((day, idx) => (
          <div key={idx} className="text-xs text-text-secondary">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Cells */}
      <div className="flex gap-[2px]">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[2px]">
            {[1, 2, 3, 4, 5, 6, 0].map((dayNumber) => { // Monday through Sunday (0 is Sunday)
              const dayData = week.find(d => d.date.getDay() === dayNumber);
              if (!dayData || dayData.date > new Date()) {
                return <div key={dayNumber} className="w-3 h-3 rounded-sm bg-gray-800/50" />;
              }

              const { data } = dayData;
              const tooltipText = data ? 
                `${dayData.date.toLocaleDateString()}
${data.deltaLP > 0 ? '+' : ''}${data.deltaLP} LP
${data.gamesPlayed} games played
${data.hoursPlayed} hours played` : 'No games played';

              return (
                <div
                  key={dayNumber}
                  className={`w-3 h-3 rounded-sm ${getCalendarColor(data?.deltaLP || 0)}`}
                  title={tooltipText}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}; 
interface MonthLabel {
  text: string;
  index: number;
}

interface CalendarHeaderProps {
  monthLabels: MonthLabel[];
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ monthLabels }) => {
  return (
    <div className="flex">
      <div className="w-12" /> {/* Spacer for weekday labels */}
      <div className="flex flex-1 text-xs text-text-secondary">
        {monthLabels.map((label, idx) => (
          <div
            key={idx}
            className="flex-1"
            style={{ marginLeft: `${label.index * 12}px` }}
          >
            {label.text}
          </div>
        ))}
      </div>
    </div>
  );
}; 
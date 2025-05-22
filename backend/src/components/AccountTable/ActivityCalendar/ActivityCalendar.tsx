import type { CalendarDay } from '../../../types/account';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { CalendarLegend } from './CalendarLegend';

interface ActivityCalendarProps {
  calendar: CalendarDay[];
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getCalendarData = (calendar: CalendarDay[]) => {
  const today = new Date();
  const fourMonthsAgo = new Date();
  fourMonthsAgo.setMonth(today.getMonth() - 3);
  fourMonthsAgo.setDate(1); // Start from the first day of the month
  
  // Create a map of dates to LP data
  const dateMap = new Map(
    calendar.map(day => {
      // Ensure consistent date format for comparison
      const date = new Date(day.date);
      return [date.toISOString().split('T')[0], day];
    })
  );

  // Generate all dates from 4 months ago to today
  const dates: { date: Date; data: CalendarDay | null }[] = [];
  const current = new Date(fourMonthsAgo);
  current.setHours(0, 0, 0, 0);

  // Adjust to start from Monday of the first week
  while (current.getDay() !== 1) {
    current.setDate(current.getDate() - 1);
  }

  while (current <= today) {
    const dateStr = current.toISOString().split('T')[0];
    dates.push({
      date: new Date(current),
      data: dateMap.get(dateStr) || null
    });
    current.setDate(current.getDate() + 1);
  }

  // Group by weeks for display
  const weeks: typeof dates[] = [];
  let currentWeek: typeof dates = [];

  dates.forEach((dateObj) => {
    if (dateObj.date.getDay() === 1 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(dateObj);
  });
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return { weeks, firstDate: fourMonthsAgo, lastDate: today };
};

const getMonthLabels = (weeks: { date: Date; data: CalendarDay | null }[][]) => {
  const labels: { text: string; index: number }[] = [];
  let currentMonth = -1;

  weeks.forEach((week, index) => {
    const monthNumber = week[0].date.getMonth();
    if (monthNumber !== currentMonth) {
      labels.push({
        text: MONTHS[monthNumber],
        index
      });
      currentMonth = monthNumber;
    }
  });

  return labels;
};

export const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ calendar }) => {
  const { weeks } = getCalendarData(calendar);
  const monthLabels = getMonthLabels(weeks);

  return (
    <div className="space-y-3">
      <CalendarHeader monthLabels={monthLabels} />
      <CalendarGrid weeks={weeks} weekdays={WEEKDAYS} />
      <CalendarLegend calendar={calendar} />
    </div>
  );
}; 
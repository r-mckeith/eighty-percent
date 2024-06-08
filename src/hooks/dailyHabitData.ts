import { useState, useEffect } from 'react';
import { getHabitData } from '../api/Habits';
import { HabitDataProps } from '../types';
import { useDateContext, useHabitContext, useHabitDataContext } from '../contexts';

export type dailyHabitData = {
  tag_id: number;
  yesterday: number;
  day: number;
  week: number;
  month: number;
  year: number;
};

export function useDailyHabitData() {
  const {
    selectedDate,
    selectedDateString,
    yesterdayString,
    oneWeekAgoString,
    oneMonthAgoString,
    oneYearAgoString,
    tomorrowString,
  } = useDateContext();
  const { habits } = useHabitContext();
  const { habitData } = useHabitDataContext();
  
  const [dailyHabitData, setDailyHabitData] = useState<dailyHabitData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const habitRowData = await getHabitData(selectedDate);
        const aggregatedHabits = aggregateHabitData(habitRowData);

        setDailyHabitData(aggregatedHabits);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [selectedDate, habits, habitData]);

  function aggregateHabitData(data: HabitDataProps[]): dailyHabitData[] {
    const habitMap: Record<string, dailyHabitData> = {};

    data.forEach(habit => {
      if (!habitMap[habit.tag_id]) {
        habitMap[habit.tag_id] = {
          tag_id: habit.tag_id,
          day: 0,
          yesterday: 0,
          week: 0,
          month: 0,
          year: 0,
        };
      }

      if (habit.date === selectedDateString) {
        habitMap[habit.tag_id].day += habit.count;
      }
      if (habit.date === yesterdayString) {
        habitMap[habit.tag_id].yesterday += habit.count;
      }
      if (habit.date >= oneWeekAgoString && habit.date < tomorrowString) {
        habitMap[habit.tag_id].week += habit.count;
      }
      if (habit.date >= oneMonthAgoString && habit.date < tomorrowString) {
        habitMap[habit.tag_id].month += habit.count;
      }
      if (habit.date >= oneYearAgoString && habit.date < tomorrowString) {
        habitMap[habit.tag_id].year += habit.count;
      }
    });

    return Object.values(habitMap).filter(habit => habit.month > 0);
  }

  return { dailyHabitData };
}

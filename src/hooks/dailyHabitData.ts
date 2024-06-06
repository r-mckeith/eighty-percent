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
  const [dailyHabitData, setDailyHabitData] = useState<dailyHabitData[]>([]);

  const { selectedDate, selectedDateString } = useDateContext();
  const { habits } = useHabitContext();
  const { habitData } = useHabitDataContext();

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

    const startDay = new Date(
        Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate())
    );

    // Calculate yesterday's start and end
    const yesterday = new Date(selectedDate);
    yesterday.setDate(selectedDate.getDate() - 1);
    const startOfYesterday = new Date(
        Date.UTC(yesterday.getUTCFullYear(), yesterday.getUTCMonth(), yesterday.getUTCDate())
    );
    const endOfYesterday = new Date(
        Date.UTC(yesterday.getUTCFullYear(), yesterday.getUTCMonth(), yesterday.getUTCDate(), 23, 59, 59, 999)
    );

    const startWeek = new Date(startDay);
    startWeek.setUTCDate(startDay.getUTCDate() - 6);
    const startMonth = new Date(startDay);
    startMonth.setUTCDate(startDay.getUTCDate() - 29);
    const startYear = new Date(startDay);
    startYear.setUTCDate(startDay.getUTCDate() - 364);

    data.forEach(habit => {
        const completedDate = new Date(habit.date);
        console.log(typeof habit.date)

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
        if (completedDate >= startOfYesterday && completedDate < new Date(startOfYesterday.getTime() + 86400000)) {
            habitMap[habit.tag_id].yesterday += habit.count;
        }
        if (completedDate >= startWeek && completedDate < new Date(startDay.getTime() + 86400000)) {
            habitMap[habit.tag_id].week += habit.count;
        }
        if (completedDate >= startMonth && completedDate < new Date(startDay.getTime() + 86400000)) {
            habitMap[habit.tag_id].month += habit.count;
        }
        if (completedDate >= startYear && completedDate < new Date(startDay.getTime() + 86400000)) {
            habitMap[habit.tag_id].year += habit.count;
        }
    });

    return Object.values(habitMap).filter(habit => habit.month > 0);
}

  return { dailyHabitData };
}

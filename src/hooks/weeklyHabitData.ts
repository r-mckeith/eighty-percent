import { useState, useEffect } from 'react';
import { getHabitData } from '../api/Habits';
import { HabitDataProps } from '../types';
import { useDateContext, useHabitContext, useHabitDataContext } from '../contexts';

export type WeeklyHabitData = {
    tag_id: number;
    day: number;
    yesterday: number;
    week: number;
    month: number;
    year: number;
};

export function useWeeklyHabitData() {
  const [weeklyHabitData, setWeeklyHabitData] = useState<WeeklyHabitData[]>([]);

  const { selectedDate } = useDateContext();
  const { habits } = useHabitContext();
  const { habitData } = useHabitDataContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const habitData = await getHabitData(selectedDate);
        const aggregatedHabitData = aggregateWeeklyHabitData(habitData);

        setWeeklyHabitData(aggregatedHabitData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [selectedDate, habits, habitData]);

  function aggregateWeeklyHabitData(gridData: HabitDataProps[]): WeeklyHabitData[] {
    const habitGridMap: any = {};

    const startDay = new Date(selectedDate);
    startDay.setHours(0, 0, 0, 0);
    startDay.setDate(startDay.getDate() - 7);

    const dates = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(startDay);
      date.setDate(date.getDate() + index);
      return date;
    });

    gridData.forEach(habit => {
      const completedDate = new Date(habit.date);

      if (!habitGridMap[habit.tag_id]) {
        habitGridMap[habit.tag_id] = {
          name: habit.tag_name,
          days: dates.map(date => ({
            day: date.toDateString(),
            icon: '-',
            color: '#FF0000',
          })),
        };
      }

      dates.forEach((date, index) => {
        if (completedDate.toDateString() === date.toDateString()) {
          const dayData = habitGridMap[habit.tag_id].days[index];
          dayData.icon = habit.count;
          dayData.color = 'blue';
        }
      });
    });

    return Object.values(habitGridMap);
  }

  return { weeklyHabitData };
}

import { useState, useEffect } from 'react';
import { useDateContext } from '../contexts/date/useDateContext';
import { useHabitContext } from '../contexts/habits/UseHabitContext';
import { useHabitDataContext } from '../contexts/habitData/UseHabitDataContext';
import { getHabitData } from '../api/Habits';
import { HabitProps, HabitDataProps } from '../types/shared';

export type HabitsAggregatedData = {
  tag_id: number;
  day: number;
  week: number;
  month: number;
  year: number;
};

export type ProjectsAggregatedData = {
  details: [
    {
      name: string;
      completedDay: string;
      inScopeDay: string;
      daysPushed: number;
      completed: boolean;
    }
  ];
  totals: {
    totalPushesWeek: number;
    totalCompletionsWeek: number;
    totalCompletionsDay: number;
    totalCompletionsMonth: number;
    totalCompletionsYear: number;
  };
};

export function useAggregatedData() {
  const [habitsTableData, setHabitsTableData] = useState<HabitsAggregatedData[]>([]);
  const [habitGridData, setHabitGridData] = useState<any>([]);
  const [projectTableData, setProjectTableData] = useState<any>([]);

  const { selectedDate } = useDateContext();
  const { habits } = useHabitContext();
  const { habitData } = useHabitDataContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const habitRowData = await getHabitData(selectedDate);
        const habitGridData = await getHabitData(selectedDate);
        const aggregatedHabits = aggregateHabitData(habitRowData);
        const aggregatedGridData = aggregateHabitGridData(habitGridData);
        const aggregatedProjects = aggregateProjectsData(habits);

        setHabitsTableData(aggregatedHabits);
        setHabitGridData(aggregatedGridData);
        setProjectTableData(aggregatedProjects);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [selectedDate, habits, habitData]);

  function aggregateHabitData(yearData: HabitDataProps[]): HabitsAggregatedData[] {
    const habitMap: Record<string, HabitsAggregatedData> = {};

    const startDay = new Date(
      Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate())
    );
    const startWeek = new Date(startDay);
    startWeek.setUTCDate(startDay.getUTCDate() - 6);
    const startMonth = new Date(startDay);
    startMonth.setUTCDate(startDay.getUTCDate() - 29);
    const startYear = new Date(startDay);
    startYear.setUTCDate(startDay.getUTCDate() - 364);

    yearData.forEach(habit => {
      const completedDate = new Date(habit.date);

      if (!habitMap[habit.tag_id]) {
        habitMap[habit.tag_id] = {
          tag_id: habit.tag_id,
          day: 0,
          week: 0,
          month: 0,
          year: 0,
        };
      }

      if (completedDate >= startDay && completedDate < new Date(startDay.getTime() + 86400000)) {
        habitMap[habit.tag_id].day += habit.count;
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

  function aggregateHabitGridData(gridData: HabitDataProps[]) {
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

  function aggregateProjectsData(projects: HabitProps[]) {
    const startDay = new Date(selectedDate);
    startDay.setHours(0, 0, 0, 0);
    startDay.setDate(startDay.getDate() - 6);

    const endDay = new Date(selectedDate);
    endDay.setHours(23, 59, 59, 999);

    return projects
      .map(project => ({
        name: project.name,
        completedDay: project.completed ? new Date(project.completed) : null,
        inScopeDay: project.inScopeDay ? new Date(project.inScopeDay) : null,
        completed: !!project.completed,
      }))
      .filter(
        project =>
          (project.inScopeDay && project.inScopeDay >= startDay && project.inScopeDay <= endDay) ||
          (project.completedDay && project.completedDay >= startDay && project.completedDay <= endDay)
      )
      .map(project => {
        const inScopeDate = project.inScopeDay;
        const completedDate = project.completedDay;

        return {
          name: project.name,
          days: Array.from({ length: 7 }, (_, dayIndex) => {
            const day = new Date(startDay);
            day.setDate(startDay.getDate() + dayIndex);

            const dayStr = day.toISOString().split('T')[0];
            const completedDayStr = completedDate ? completedDate.toISOString().split('T')[0] : '';

            const isCompleted = completedDate && dayStr === completedDayStr;
            const isInScope = inScopeDate ? day.getTime() >= inScopeDate.getTime() : false;
            const isPushed = !isCompleted && isInScope && completedDate && completedDate > day;
            const isIncomplete = isInScope && !completedDate;

            let status = '';
            let icon = '';
            let color = 'red';

            if (isPushed || isIncomplete) {
              status = 'P';
              icon = '→';
              color = '#FF0000';
            } else if (isCompleted) {
              status = 'C';
              icon = '✓';
              color = 'blue';
            } else if (isIncomplete) {
              status = 'I';
              icon = '✗';
              color = 'red';
            }

            return {
              day: day.toDateString(),
              status: status,
              icon: icon,
              color: color,
            };
          }),
        };
      });
  }

  return { habitsTableData, habitGridData, projectTableData };
}

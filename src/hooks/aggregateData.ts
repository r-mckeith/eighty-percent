import { useState, useEffect } from "react";
import { subDays, subMonths, subYears, differenceInCalendarDays, format, isToday, isThisWeek, isThisMonth, isThisYear } from 'date-fns';
import { useDateContext } from "../contexts/date/useDateContext";
import { useHabitContext } from "../contexts/habits/UseHabitContext";
import { useHabitDataContext } from "../contexts/habitData/UseHabitDataContext";
import { getHabitData } from "../api/SupabaseHabits";
import { HabitProps, HabitDataProps } from "../types/HabitTypes";

export type HabitsAggregatedData = {
  name: string;
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
  const [projectsTableData, setProjectsTableData] = useState<any>([]);

  const { selectedDate, selectedDateString } = useDateContext();
  const { habits } = useHabitContext();
  const { habitData } = useHabitDataContext();

  const date = new Date(selectedDateString);
  const formatStr = 'yyyyMMdd';
  const weekAgoDate = format(subDays(date, 6), formatStr);
  const monthAgoDate = format(subMonths(date, 1), formatStr);
  const yearAgoDate = format(subYears(date, 1), formatStr);
  const today = format(date, formatStr);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const yearData = await getHabitData(selectedDate);
        const aggregatedHabits = aggregateHabitData(yearData);
        const aggregatedProjects = aggregateProjectsData(habits);

        setHabitsTableData(aggregatedHabits);
        setProjectsTableData(aggregatedProjects);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [selectedDate, habits, habitData]);

  function aggregateHabitData(yearData: HabitDataProps[]): HabitsAggregatedData[] {
    const habitMap: Record<string, HabitsAggregatedData> = {};

    yearData.forEach((habit) => {
      const completedDate = format(new Date(habit.date), 'yyyyMMdd');

      if (!habitMap[habit.tag_name]) {
        habitMap[habit.tag_name] = {
          name: habit.tag_name,
          day: 0,
          week: 0,
          month: 0,
          year: 0,
        };
      }

      if (completedDate === today) {
        habitMap[habit.tag_name].day += habit.count;
      }
      if (completedDate >= weekAgoDate && completedDate <= today) {
        habitMap[habit.tag_name].week += habit.count;
      }
      if (completedDate >= monthAgoDate && completedDate <= today) {
        habitMap[habit.tag_name].month += habit.count;
      }
      if (completedDate >= yearAgoDate && completedDate <= today) {
        habitMap[habit.tag_name].year += habit.count;
      }
    });

    return Object.values(habitMap);
}

function aggregateProjectsData(projects: HabitProps[]): any {
  let details = projects.map((project) => ({
    name: project.name,
    completedDay: project.completed ? project.completed : null,
    inScopeDay: project.inScopeDay ? project.inScopeDay : null,
    daysPushed: 0,
    completed: !!project.completed,
  }));

  let totals = {
    pushesWeek: 0,
    week: 0,
    day: 0,
    month: 0,
    year: 0,
  };

  const today = new Date();
  const startWeek = subDays(today, 6);

  projects.forEach((project) => {
    const inScopeDate = project.inScopeDay ? new Date(project.inScopeDay) : null;
    const completedDate = project.completed ? new Date(project.completed) : null;

    if (completedDate && !isNaN(completedDate.getTime())) {
      const delay = differenceInCalendarDays(completedDate, inScopeDate || new Date());

      if (delay > 0 && completedDate >= startWeek) {
        details.find((p) => p.name === project.name)!.daysPushed = delay;
        totals.pushesWeek += delay;
      }

      if (isToday(completedDate)) {
        totals.day++;
      }

      if (isThisWeek(completedDate)) {
        totals.week++;
      }

      if (isThisMonth(completedDate)) {
        totals.month++;
      }

      if (isThisYear(completedDate)) {
        totals.year++;
      }
    }
  });

  return { details, totals };
}


  return { habitsTableData, projectsTableData };
}
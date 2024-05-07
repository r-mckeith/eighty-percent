import { useState, useEffect } from "react";
import { useDateContext } from "../contexts/date/useDateContext";
import { useHabitContext } from "../contexts/habits/UseHabitContext";
import { useHabitDataContext } from "../contexts/habitData/UseHabitDataContext";
import { getHabitData } from "../api/SupabaseHabits";
import { HabitProps, HabitDataProps } from "../types/HabitTypes";

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
  const [projectsTableData, setProjectsTableData] = useState<any>([]);

  const { selectedDate } = useDateContext();
  const { habits } = useHabitContext();
  const { habitData } = useHabitDataContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const yearData = await getHabitData(selectedDate);
        const aggregatedHabits = aggregateHabitData(habitData);
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

    const startDay = new Date(
      Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate())
    );
    const startWeek = new Date(startDay);
    startWeek.setUTCDate(startDay.getUTCDate() - 6);
    const startMonth = new Date(startDay);
    startMonth.setUTCDate(startDay.getUTCDate() - 29);
    const startYear = new Date(startDay);
    startYear.setUTCDate(startDay.getUTCDate() - 364);

    yearData.forEach((habit) => {
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

    return Object.values(habitMap).filter((habit) => habit.month > 0);
  }

  function aggregateProjectsData(projects: HabitProps[]) {
    const startDay = new Date(selectedDate);
    startDay.setHours(0, 0, 0, 0);
    startDay.setDate(startDay.getDate() - 6);

    return projects
      .map((project) => ({
        name: project.name,
        completedDay: project.completed ? new Date(project.completed) : null,
        inScopeDay: project.inScopeDay ? new Date(project.inScopeDay) : null,
        completed: !!project.completed,
      }))
      .filter((project) => {
        return (
          (project.inScopeDay &&
            project.inScopeDay >= startDay &&
            project.inScopeDay <= new Date(selectedDate)) ||
          (project.completedDay &&
            project.completedDay >= startDay &&
            project.completedDay <= new Date(selectedDate))
        );
      });
  }

  return { habitsTableData, projectsTableData };
}

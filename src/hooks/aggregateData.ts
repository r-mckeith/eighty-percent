import { useState, useEffect } from "react";
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
  name: string;
  day: number;
  week: number;
  month: number;
  year: number;
};

export function useAggregatedData() {
  const [habitsTableData, setHabitsTableData] = useState<
    HabitsAggregatedData[]
  >([]);
  const [projectsTableData, setProjectsTableData] =
    useState<ProjectsAggregatedData>({
      name: 'Total',
      day: 0,
      week: 0,
      month: 0,
      year: 0,
    });

  // right now projects are still habits in the db. Will change at some point
  const { selectedDate } = useDateContext();
  const { habitData } = useHabitDataContext();
  const { habits } = useHabitContext();

  const projects = habits.filter((tag) => tag.section === "today");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const yearData = await getHabitData(selectedDate);
        const aggregatedHabits = aggregateHabitData(yearData, selectedDate);
        const aggregatedProjects = aggregateProjectsData(projects);

        setHabitsTableData(aggregatedHabits);
        setProjectsTableData(aggregatedProjects);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [selectedDate, habitData, habits]);

  function aggregateHabitData(
    yearData: HabitDataProps[],
    selectedDate: Date
  ): HabitsAggregatedData[] {
    const habitMap: Record<string, HabitsAggregatedData> = {};

    const startDay = new Date(
      Date.UTC(
        selectedDate.getUTCFullYear(),
        selectedDate.getUTCMonth(),
        selectedDate.getUTCDate()
      )
    );
    const startWeek = new Date(startDay);
    startWeek.setUTCDate(startDay.getUTCDate() - 6);
    const startMonth = new Date(startDay);
    startMonth.setUTCDate(startDay.getUTCDate() - 29);
    const startYear = new Date(startDay);
    startYear.setUTCDate(startDay.getUTCDate() - 364);

    yearData.forEach((habit) => {
      const completedDate = new Date(habit.date);

      if (!habitMap[habit.tag_name]) {
        habitMap[habit.tag_name] = {
          name: habit.tag_name,
          day: 0,
          week: 0,
          month: 0,
          year: 0,
        };
      }

      if (
        completedDate >= startDay &&
        completedDate < new Date(startDay.getTime() + 86400000)
      ) {
        habitMap[habit.tag_name].day += habit.count;
      }
      if (
        completedDate >= startWeek &&
        completedDate < new Date(startDay.getTime() + 86400000)
      ) {
        habitMap[habit.tag_name].week += habit.count;
      }
      if (
        completedDate >= startMonth &&
        completedDate < new Date(startDay.getTime() + 86400000)
      ) {
        habitMap[habit.tag_name].month += habit.count;
      }
      if (
        completedDate >= startYear &&
        completedDate < new Date(startDay.getTime() + 86400000)
      ) {
        habitMap[habit.tag_name].year += habit.count;
      }
    });

    return Object.values(habitMap).filter((habit) => habit.month > 0);
  }

  function aggregateProjectsData(
    projects: HabitProps[]
  ): ProjectsAggregatedData {
    const aggregatedProjects: ProjectsAggregatedData = {
      name: 'Total',
      day: 0,
      week: 0,
      month: 0,
      year: 0,
    };
    const startDay = new Date(
      Date.UTC(
        selectedDate.getUTCFullYear(),
        selectedDate.getUTCMonth(),
        selectedDate.getUTCDate()
      )
    );
    const endDay = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() + 1
      )
    );
    const startWeek = new Date(startDay);
    startWeek.setUTCDate(startDay.getUTCDate() - 6);
    const startMonth = new Date(startDay);
    startMonth.setUTCDate(startDay.getUTCDate() - 29);
    const startYear = new Date(startDay);
    startYear.setUTCDate(startDay.getUTCDate() - 364);

    projects.forEach((project) => {
      if (project.completed) {
        const completedDate = new Date(project.completed);

        if (completedDate >= startDay && completedDate < endDay) {
          aggregatedProjects.day++;
        }
        if (completedDate >= startWeek && completedDate < endDay) {
          aggregatedProjects.week++;
        }
        if (completedDate >= startMonth && completedDate < endDay) {
          aggregatedProjects.month++;
        }
        if (completedDate >= startYear && completedDate < endDay) {
          aggregatedProjects.year++;
        }
      }
    });

    return aggregatedProjects;
  }

  return { habitsTableData, projectsTableData };
}

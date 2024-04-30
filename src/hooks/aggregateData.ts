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
  details: [
    {
      name: string;
      completedDay: Date;
      inScopeDay: Date;
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
  const [projectsTableData, setProjectsTableData] = useState<any>();

  // right now projects are still habits in the db. Will change at some point
  const { selectedDate } = useDateContext();
  const { habitData } = useHabitDataContext();
  const { habits } = useHabitContext();

  // const startDay = new Date(
  //   Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate())
  // );
  // const endDay = new Date(
  //   Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1)
  // );
  // const startWeek = new Date(startDay);
  // startWeek.setUTCDate(startDay.getUTCDate() - 6);
  // const startMonth = new Date(startDay);
  // startMonth.setUTCDate(startDay.getUTCDate() - 29);
  // const startYear = new Date(startDay);
  // startYear.setUTCDate(startDay.getUTCDate() - 364);
  // const selectedDate = new Date(); // Example: Ensure selectedDate is correctly defined

  // Start of the selected day at 00:00
  const startDay = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate()
  );

  // End of the selected day (start of the next day at 00:00)
  const endDay = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate() + 1
  );

  // 7 days before the start day
  const startWeek = new Date(startDay);
  startWeek.setDate(startDay.getDate() - 6);
  // startWeek.setHours(0, 0, 0, 0);

  // Approximately 30 days before the start day
  const startMonth = new Date(startDay);
  startMonth.setDate(startDay.getDate() - 29);
  // startMonth.setHours(0, 0, 0, 0);

  // Approximately 365 days before the start day
  const startYear = new Date(startDay);
  startYear.setDate(startDay.getDate() - 364);
  // startYear.setHours(0, 0, 0, 0);

  const projectsThisWeek = habits.filter((project) => {
    const inScopeDate = project.inScopeDay && new Date(project.inScopeDay);
    inScopeDate && inScopeDate; // Normalize in-scope date

    return (
      project.section === "today" &&
      inScopeDate &&
      inScopeDate.toISOString().split("T")[0] >= startWeek.toISOString().split("T")[0] &&
      inScopeDate.toISOString().split("T")[0] <= startDay.toISOString().split("T")[0]
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const yearData = await getHabitData(selectedDate);
        const aggregatedHabits = aggregateHabitData(yearData);
        const aggregatedProjects = aggregateProjectsData(projectsThisWeek);

        setHabitsTableData(aggregatedHabits);
        setProjectsTableData(aggregatedProjects);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [selectedDate, habitData, habits]);

  function aggregateHabitData(yearData: HabitDataProps[]): HabitsAggregatedData[] {
    const habitMap: Record<string, HabitsAggregatedData> = {};

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

      if (completedDate >= startDay && completedDate < new Date(startDay.getTime() + 86400000)) {
        habitMap[habit.tag_name].day += habit.count;
      }
      if (completedDate >= startWeek && completedDate < new Date(startDay.getTime() + 86400000)) {
        habitMap[habit.tag_name].week += habit.count;
      }
      if (completedDate >= startMonth && completedDate < new Date(startDay.getTime() + 86400000)) {
        habitMap[habit.tag_name].month += habit.count;
      }
      if (completedDate >= startYear && completedDate < new Date(startDay.getTime() + 86400000)) {
        habitMap[habit.tag_name].year += habit.count;
      }
    });

    return Object.values(habitMap).filter((habit) => habit.month > 0);
  }

  function aggregateProjectsData(projects: HabitProps[]): any {
    let details = projectsThisWeek.map((project) => ({
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

    projects.forEach((project) => {
      const inScopeDate = project.inScopeDay ? new Date(project.inScopeDay) : null;
      const completedDate = project.completed ? new Date(project.completed) : null;

      if (completedDate && !isNaN(completedDate.getTime())) {
        const delay =
          inScopeDate && !isNaN(inScopeDate.getTime())
            ? (completedDate.getTime() - inScopeDate.getTime()) / (1000 * 3600 * 24)
            : 0;

        if (
          delay > 0 &&
          completedDate >= startWeek &&
          completedDate < new Date(startWeek.getTime() + 7 * 86400000)
        ) {
          details.find((p) => p.name === project.name)!.daysPushed = Math.ceil(delay);
          totals.pushesWeek += Math.ceil(delay);
        }

        if (completedDate >= startDay && completedDate < endDay) {
          totals.day++;
        }

        if (
          completedDate >= startWeek &&
          completedDate < new Date(startWeek.getTime() + 7 * 86400000)
        ) {
          totals.week++;
        }

        if (
          completedDate >= startMonth &&
          completedDate < new Date(startMonth.getFullYear(), startMonth.getMonth() + 1, 0)
        ) {
          totals.month++;
        }

        if (
          completedDate >= startYear &&
          completedDate < new Date(startYear.getFullYear() + 1, 0, 1)
        ) {
          totals.year++;
        }
      }
    });

    return { details, totals };
  }

  return { habitsTableData, projectsTableData };
}

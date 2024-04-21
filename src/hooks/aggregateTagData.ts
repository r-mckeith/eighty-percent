import { useState, useEffect, useContext } from 'react';
import { useDateContext } from "../../src/contexts/date/useDateContext";
import { useTagContext } from '../contexts/tags/UseTagContext';
import { useTagDataContext } from "../../src/contexts/tagData/UseTagDataContext";
import { getTagData } from "../../src/api/SupabaseTags";
import { TagProps, TagDataProps } from '../types/TagTypes';

export interface TagAggregatedData {
  tag_name: string;
  day: number;
  week: number;
  month: number;
  year: number;
}

export function useAggregateTagData() {
  const [tagsTableData, setTagsTableData] = useState<TagAggregatedData[]>([]);
  const [tasksTableData, setTasksTableData] = useState<TaskAggregatedData>({
    today: 0,
    last7Days: 0,
    last30Days: 0,
    last365Days: 0,
  });

  const { selectedDate } = useDateContext();
  const { tagData } = useTagDataContext();
  const { tags } = useTagContext(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const yearData = await getTagData(selectedDate);
        const processedData = aggregateTagData(yearData, selectedDate);
        setTagsTableData(processedData);
      } catch (error) {
        console.error("Failed to fetch tag data:", error);
      }
    };

    fetchData();
  }, [selectedDate, tagData]);

  const aggregateTagData = (
    yearData: TagDataProps[],
    selectedDate: Date
  ): TagAggregatedData[] => {
    const tagMap: Record<string, TagAggregatedData> = {};

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

    yearData.forEach((tag) => {
      const completedDate = new Date(tag.date);

      if (!tagMap[tag.tag_name]) {
        tagMap[tag.tag_name] = {
          tag_name: tag.tag_name,
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
        tagMap[tag.tag_name].day += tag.count;
      }
      if (
        completedDate >= startWeek &&
        completedDate < new Date(startDay.getTime() + 86400000)
      ) {
        tagMap[tag.tag_name].week += tag.count;
      }
      if (
        completedDate >= startMonth &&
        completedDate < new Date(startDay.getTime() + 86400000)
      ) {
        tagMap[tag.tag_name].month += tag.count;
      }
      if (
        completedDate >= startYear &&
        completedDate < new Date(startDay.getTime() + 86400000)
      ) {
        tagMap[tag.tag_name].year += tag.count;
      }
    });

    return Object.values(tagMap).filter((tag) => tag.month > 0);
  };

  interface TaskAggregatedData {
    today: number;
    last7Days: number;
    last30Days: number;
    last365Days: number;
  }

  const aggregateTaskData = (tasks: TagProps[]): TaskAggregatedData => {
    const aggregatedData: TaskAggregatedData = {
      today: 0,
      last7Days: 0,
      last30Days: 0,
      last365Days: 0,
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

    tasks.forEach((task) => {
      if (task.completed) {
        const completedDate = new Date(task.completed);

        if (completedDate >= startDay && completedDate < endDay) {
          aggregatedData.today++;
        }
        if (completedDate >= startWeek && completedDate < endDay) {
          aggregatedData.last7Days++;
        }
        if (completedDate >= startMonth && completedDate < endDay) {
          aggregatedData.last30Days++;
        }
        if (completedDate >= startYear && completedDate < endDay) {
          aggregatedData.last365Days++;
        }
      }
    });

    return aggregatedData;
  };

  const tasks = tags.filter(tag => tag.section === "today");
  useEffect(() => {
    setTasksTableData(aggregateTaskData(tasks));
  }, [selectedDate, tags]);

  return { tagsTableData, tasksTableData };
}

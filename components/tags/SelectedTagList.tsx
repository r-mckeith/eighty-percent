import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDateContext } from "../../src/contexts/date/useDateContext";
import { useTagDataContext } from "../../src/contexts/tagData/UseTagDataContext";
import { getTagData } from "../../src/api/SupabaseTags";
import { TagDataProps, TagProps } from "../../src/types/TagTypes";

interface TagAggregatedData {
  tag_name: string;
  day: number;
  week: number;
  month: number;
  year: number;
}

export default function SelectedTagList({ tags }: { tags: TagProps[] }) {
  const [tagsTableData, setTagsTableData] = useState<TagAggregatedData[]>([]);
  const [tasksTableData, setTasksTableData] = useState<TaskAggregatedData>({
    today: 0,
    last7Days: 0,
    last30Days: 0,
    last365Days: 0,
  });
  const { selectedDate } = useDateContext();
  const { tagData } = useTagDataContext();

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

  useEffect(() => {
    const processedTasks = aggregateTaskData(tasks);
    setTasksTableData(processedTasks);
  }, [selectedDate, tags]);

  const tasks = tags.filter((tag) => tag.section === "today");

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

    // Setup the date ranges
    const endDay = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() + 1
      )
    );
    const startDay = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
    );
    const start7Days = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() - 6
      )
    );
    const start30Days = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() - 29
      )
    );
    const start365Days = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() - 364
      )
    );

    tasks.forEach((task) => {
      if (task.completed) {
        const completedDate = new Date(task.completed);

        if (completedDate >= startDay && completedDate < endDay) {
          aggregatedData.today++;
        }
        if (completedDate >= start7Days && completedDate < endDay) {
          aggregatedData.last7Days++;
        }
        if (completedDate >= start30Days && completedDate < endDay) {
          aggregatedData.last30Days++;
        }
        if (completedDate >= start365Days && completedDate < endDay) {
          aggregatedData.last365Days++;
        }
      }
    });

    return aggregatedData;
  };

  const aggregateTagData = (
    yearData: TagDataProps[],
    selectedDate: Date
  ): TagAggregatedData[] => {
    const tagMap: Record<string, TagAggregatedData> = {};

    // UTC midnight of the selected date
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

  if (
    tagsTableData.length === 0 &&
    Object.values(tasksTableData).every((value) => value === 0)
  ) {
    return;
  }

  return (
    <View style={styles.selectedTagList}>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.tagNameCell]}></Text>
        <Text style={[styles.headerCell, styles.timeCell]}>Day</Text>
        <Text style={[styles.headerCell, styles.timeCell]}>Week</Text>
        <Text style={[styles.headerCell, styles.timeCell]}>Month</Text>
        <Text style={[styles.headerCell, styles.timeCell]}>Year</Text>
      </View>

      {!Object.values(tasksTableData).every((value) => value === 0) &&
        <View key={5} style={styles.row}>
          <Text style={[styles.cell, styles.tagNameCell]}>{"Projects"}</Text>
          <Text style={[styles.cell, styles.timeCell]}>
            {tasksTableData.today}
          </Text>
          <Text style={[styles.cell, styles.timeCell]}>
            {tasksTableData. last7Days > tasksTableData.today && tasksTableData.last7Days}
          </Text>
          <Text style={[styles.cell, styles.timeCell]}>
            {tasksTableData.last30Days > tasksTableData.last7Days && tasksTableData.last30Days}
          </Text>
          <Text style={[styles.cell, styles.timeCell]}>
            {tasksTableData.last365Days > tasksTableData.last30Days && tasksTableData.last365Days}
          </Text>
        </View>
      }

      {tagsTableData.map((tag, index) => (
        <View key={index} style={styles.row}>
          <Text style={[styles.cell, styles.tagNameCell]}>{tag.tag_name}</Text>
          <Text style={[styles.cell, styles.timeCell]}>{tag.day}</Text>
          <Text style={[styles.cell, styles.timeCell]}>
            {tag.week > tag.day && tag.week}
          </Text>
          <Text style={[styles.cell, styles.timeCell]}>
            {tag.month > tag.day && tag.month}
          </Text>
          <Text style={[styles.cell, styles.timeCell]}>
            {tag.year > tag.month && tag.year}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  selectedTagList: {
    flex: 1,
    padding: 10,
    backgroundColor: "#eee",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  tableHeader: {
    flexDirection: "row",
    paddingBottom: 4,
    paddingRight: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    padding: 1,
    textAlign: "center",
  },
  cell: {
    flex: 1,
    padding: 1,
    textAlign: "center",
  },
  tagNameCell: {
    flex: 2.75,
    textAlign: "left",
  },
  timeCell: {
    flex: 1,
    textAlign: "center",
  },
});

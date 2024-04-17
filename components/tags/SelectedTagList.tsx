import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDateContext } from "../../src/contexts/date/useDateContext";
import { useTagDataContext } from "../../src/contexts/tagData/UseTagDataContext";
import { getTagData } from "../../src/api/SupabaseTags";
import { TagDataProps } from "../../src/types/TagTypes";

interface TagAggregatedData {
  tag_name: string;
  day: number;
  week: number;
  month: number;
  year: number;
}

export default function SelectedTagList() {
  const [tagsTableData, setTagsTableData] = useState<TagAggregatedData[]>([]);
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

  const aggregateTagData = (
    yearData: TagDataProps[],
    selectedDate: Date
  ): TagAggregatedData[] => {
    const tagMap: {
      [key: string]: { day: number; week: number; month: number; year: number };
    } = {};

    const startDay = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
    );
    const startWeek = new Date(startDay);
    startWeek.setDate(startDay.getDate() - 6);
    const startMonth = new Date(startDay);
    startMonth.setDate(startDay.getDate() - 29);

    yearData.forEach((tag) => {
      const createdAtDate = new Date(tag.created_at);
      const tagDateUTC = new Date(
        Date.UTC(
          createdAtDate.getFullYear(),
          createdAtDate.getMonth(),
          createdAtDate.getDate()
        )
      );

      if (!tagMap[tag.tag_name]) {
        tagMap[tag.tag_name] = { day: 0, week: 0, month: 0, year: 0 };
      }
      if (tagDateUTC.toISOString() === startDay.toISOString()) {
        tagMap[tag.tag_name].day += tag.count;
      }
      if (tagDateUTC >= startWeek && tagDateUTC <= startDay) {
        tagMap[tag.tag_name].week += tag.count;
      }
      if (tagDateUTC >= startMonth && tagDateUTC <= startDay) {
        tagMap[tag.tag_name].month += tag.count;
      }
      tagMap[tag.tag_name].year += tag.count;
    });

    return Object.entries(tagMap).map(([tag_name, counts]) => ({
      tag_name,
      ...counts,
    }))
    .filter(tag => tag.month > 0);
    ;
  };
  
  return (
    <View style={styles.selectedTagList}>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.tagNameCell]}>Tag Name</Text>
        <Text style={[styles.headerCell, styles.timeCell]}>Day</Text>
        <Text style={[styles.headerCell, styles.timeCell]}>Week</Text>
        <Text style={[styles.headerCell, styles.timeCell]}>Month</Text>
        <Text style={[styles.headerCell, styles.timeCell]}>Year</Text>
      </View>
      {tagsTableData.map((tag, index) => (
        <View key={index} style={styles.row}>
          <Text style={[styles.cell, styles.tagNameCell]}>{tag.tag_name}</Text>
          <Text style={[styles.cell, styles.timeCell]}>{tag.day}</Text>
          <Text style={[styles.cell, styles.timeCell]}>{tag.week}</Text>
          <Text style={[styles.cell, styles.timeCell]}>{tag.month}</Text>
          <Text style={[styles.cell, styles.timeCell]}>{tag.year}</Text>
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
    padding: 5,
    textAlign: "center",
  },
  cell: {
    flex: 1,
    padding: 8,
    textAlign: "center",
  },
  tagNameCell: {
    flex: 3, 
    textAlign: "left",
  },
  timeCell: {
    flex: 1, 
    textAlign: "right",
  },
});

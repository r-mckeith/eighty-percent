import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";
import { TagProps } from "../../src/types/TagTypes";
import Tag from "./Tag";
import RenameTag from "./RenameTag";
import AddTag from "./AddTag";
import { useAggregateTagData } from "../../src/hooks/aggregateTagData";

type SectionProps = {
  tags: TagProps[];
  sectionName: string;
  groupId: number;
};

export default function Section({
  tags,
  sectionName,
  groupId,
}: SectionProps) {
  const { tasksTableData } = useAggregateTagData();

  return (
      <View style={styles.section}>
        <View style={styles.addTagContainer}>
        </View>
        <View style={styles.tagContainer}>
          <View style={styles.statsHeader}>
            <Text style={styles.headerCellTagName}></Text>
            <Text style={styles.headerCell}>Day</Text>
            <Text style={styles.headerCell}>Week</Text>
            <Text style={styles.headerCell}>Month</Text>
            <Text style={styles.headerCell}>Year</Text>
          </View>

          {tags.map((tag, index) => (
            <Tag
              key={index}
              tag={tag}
              sectionName={sectionName}
              isEditMode={false}
            />
          ))}
        </View>
        {sectionName === "today" && tasksTableData && (
          <View style={styles.statsContainer}>
            <Text style={styles.tagText}></Text>
            <Text style={styles.statsText}>
              {tasksTableData.today > 0 && tasksTableData.today}
            </Text>
            <Text style={styles.statsText}>
              {tasksTableData.last7Days > tasksTableData.today &&
                tasksTableData.last7Days}
            </Text>
            <Text style={styles.statsText}>
              {tasksTableData.last30Days > tasksTableData.last7Days &&
                tasksTableData.last30Days}
            </Text>
            <Text style={styles.statsText}>
              {tasksTableData.last365Days > tasksTableData.last30Days &&
                tasksTableData.last365Days}
            </Text>
          </View>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexShrink: 1,
    flexGrow: 1,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#333333",
    backgroundColor: "#1c1c1e",
    marginBottom: 20,
  },
  addTagContainer: {
    position: "absolute",
    top: -5,
    right: -5,
  },
  tagContainer: {
    flexDirection: "column",
    alignSelf: "stretch",
  },
  statsHeader: {
    flexDirection: "row",
    backgroundColor: "#333",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#404040",
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  headerCellTagName: {
    flex: 3.5,
    textAlign: "left",
    color: "white",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#333",
  },
  statsText: {
    flex: 1,
    textAlign: "center",
    color: "#DDD",
  },
  tagText: {
    flex: 3.5,
    color: "transparent",
  },
});
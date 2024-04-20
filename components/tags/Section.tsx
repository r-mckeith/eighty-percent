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
  isEditMode: boolean;
  setIsEditMode: (arg0: boolean) => void;
};

export default function Section({
  tags,
  sectionName,
  groupId,
  isEditMode,
  setIsEditMode,
}: SectionProps) {
  const { tasksTableData } = useAggregateTagData();

  return (
    <TouchableWithoutFeedback
      onLongPress={() => setIsEditMode(!isEditMode)}
      onPress={() => isEditMode && setIsEditMode(false)}
    >
      <View style={styles.section}>
        <View style={styles.addTagContainer}>
          {!isEditMode && sectionName !== "today" && (
            <AddTag sectionName={sectionName} groupId={groupId} />
          )}
        </View>
        {isEditMode && (
          <RenameTag
            sectionName={sectionName}
            groupId={groupId}
            setIsEditMode={setIsEditMode}
          />
        )}
        <View style={styles.tagContainer}>
          {sectionName !== "today" && (
            <View style={styles.statsHeader}>
              <Text style={styles.headerCellTagName}></Text>
              <Text style={styles.headerCell}>Day</Text>
              <Text style={styles.headerCell}>Week</Text>
              <Text style={styles.headerCell}>Month</Text>
              <Text style={styles.headerCell}>Year</Text>
            </View>
          )}

          {tags.map((tag, index) => (
            <Tag
              key={index}
              tag={tag}
              sectionName={sectionName}
              isEditMode={isEditMode}
            />
          ))}
        </View>
        {sectionName === "today" && tasksTableData && (
          
          
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>{tasksTableData.today}</Text>
              <Text style={styles.statsText}>{tasksTableData.last7Days > tasksTableData.last7Days && tasksTableData.last7Days}</Text>
              <Text style={styles.statsText}>{tasksTableData.last30Days > tasksTableData.last7Days && tasksTableData.last30Days}</Text>
              <Text style={styles.statsText}>{tasksTableData.last365Days > tasksTableData.last30Days && tasksTableData.last365Days}</Text>
            </View>
          )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  section: {
    flexShrink: 1,
    flexGrow: 1,
    padding: 0,
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
  tagText: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  statsHeader: {
    flexDirection: "row",
    backgroundColor: "#333",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    flex: 3,
    justifyContent: "space-between",
    paddingVertical: 8
  },
  statsText: {
    paddingHorizontal: 5,
    color: "#DDD",
    flex: 1,
    textAlign: "center",
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
});
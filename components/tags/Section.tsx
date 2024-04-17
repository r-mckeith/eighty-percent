import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { TagProps } from "../../src/types/TagTypes";
import Tag from "./Tag";
import RenameTag from "./RenameTag";
import AddTag from "./AddTag";

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
        <View style={[styles.tagContainer, sectionName !== 'today' ? styles.marginTop : {}]}>
          {tags.map((tag, index) => (
            <Tag
              key={index}
              tag={tag}
              sectionName={sectionName}
              isEditMode={isEditMode}
            />
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  section: {
    flexShrink: 1,
    flexGrow: 1,
    minHeight: 70,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 8,
    borderWidth: 2,
    position: "relative",
  },
  addTagContainer: {
    position: "absolute",
    top: -5,
    right: -5,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  marginTop: {
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
});

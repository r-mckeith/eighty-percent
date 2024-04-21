import React from "react";
import { View, StyleSheet } from "react-native";
import { TagProps } from "../../src/types/TagTypes";
import Task from "./Task";

type SectionProps = {
  tags: TagProps[];
  setSelected: (arg0: number) => void;
};

export default function TaskSection({ tags, setSelected }: SectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <Task
            key={index}
            tag={tag}
            setSelected={setSelected}
          />
        ))}
      </View>
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
  tagContainer: {
    flexDirection: "column",
    alignSelf: "stretch",
  },
});

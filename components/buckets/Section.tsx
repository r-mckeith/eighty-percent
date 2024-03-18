import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { TagProps } from "../../src/types/TagTypes";
import Tag from "./Tag";
import ShakingItem from '../ShakingItem';
import AddTag from "./AddTag";

type SectionProps = {
  tags: TagProps[];
  sectionName: string;
  isEditMode: boolean;
  setIsEditMode: (arg0: boolean) => void;
};

export default function Section({
  tags,
  sectionName,
  isEditMode,
  setIsEditMode,
}: SectionProps) {


  const deactivateEditMode = () => {
    if (isEditMode) setIsEditMode(false);
  };

  return (
    <TouchableWithoutFeedback
      onLongPress={() => setIsEditMode(!isEditMode)}
      onPress={() => isEditMode &&  setIsEditMode(false)}
    >
      <View
        style={[
          styles.section,
          { borderColor: "black", backgroundColor: "#FFF" },
        ]}
      >
        {isEditMode && <AddTag sectionName={sectionName} />}
        <View style={styles.tagContainer}>
          {tags.map((tag, index) => (
            // <Tag
            //   key={index}
            //   tag={tag}
            //   sectionName={sectionName}
            //   isEditMode={isEditMode}
            // />
            <ShakingItem
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
    minHeight: 150,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 8,
    borderWidth: 2,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
});

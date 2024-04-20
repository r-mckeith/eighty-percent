import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTagContext } from "../../src/contexts/tags/UseTagContext";
import { TagProps } from "../../src/types/TagTypes";
import { deleteTag, selectTag } from "../../src/api/SupabaseTags";
import { useTagDataContext } from "../../src/contexts/tagData/UseTagDataContext";
import { useDateContext } from "../../src/contexts/date/useDateContext";
import RightSwipe from "../tags/RightSwipe";
import { handleToggleCompleted } from "../../helpers/tagHelpers";
import {
  TagAggregatedData,
  useAggregateTagData,
} from "../../src/hooks/aggregateTagData";

type TagComponent = {
  tag: TagProps;
  sectionName: string;
  isEditMode: boolean;
};

export default function Tag({ tag, sectionName }: TagComponent) {
  const [isSelected, setIsSelected] = useState(false);
  const [isSelectedLater, setIsSelectedLater] = useState(false);
  const [tagData, setTagData] = useState<TagAggregatedData | null>(null);

  const { dispatch: tagDispatch } = useTagContext();
  const { dispatch: tagDataDispatch } = useTagDataContext();
  const { selectedDate } = useDateContext();
  const { tagsTableData } = useAggregateTagData();

  const swipeableRow = useRef<Swipeable | null>(null);

  useEffect(() => {
    const data = tagsTableData.find((data) => data.tag_name === tag.name);
    if (data !== undefined) {
      setTagData(data);
    } else {
      setTagData(null);
    }
    if (sectionName === "today") {
      setIsSelectedLater(false);
      setIsSelected(false);
      if (
        tag.completed &&
        tag.completed === selectedDate.toISOString().split("T")[0]
      ) {
        setIsSelected(true);
      } else if (
        tag.completed &&
        tag.completed > selectedDate.toISOString().split("T")[0]
      ) {
        setIsSelectedLater(true);
      }
    }
  }, [selectedDate, isSelected, isSelectedLater, tag.completed, tagsTableData]);

  async function handleDeleteTag(id: number) {
    try {
      await deleteTag(id);
      swipeableRow.current?.close();
      tagDispatch({ type: "DELETE_TAG", id });
    } catch (error) {
      console.error("Failed to delete tag:", error);
    }
  }

  const handleSelectTag = async (selectedTag: TagProps) => {
    if (sectionName === "today") {
      setIsSelected(!isSelected);
      handleToggleCompleted(tag.id, selectedDate, tagDispatch);
    } else {
      try {
        setIsSelected(true);
        const updatedTagData = await selectTag(selectedTag, selectedDate);
        tagDataDispatch({ type: "UPDATE_TAG_DATA", payload: updatedTagData });
        setTimeout(() => setIsSelected(false), 1);
      } catch (error) {
        console.error("Error selecting tag:", error);
        setIsSelected(false);
      }
    }
  };

  const tagStyle = isSelected
    ? [styles.tag, styles.selectedTag]
    : isSelectedLater
    ? [styles.tag, styles.disabledTag]
    : styles.tag;

  return (
    <Swipeable
      ref={swipeableRow}
      renderRightActions={() => (
        <RightSwipe
          handleDelete={handleDeleteTag}
          id={tag.id}
          swipeableRow={swipeableRow}
        />
      )}
      overshootLeft={false}
      rightThreshold={20}
    >
      <TouchableOpacity
        activeOpacity={isSelectedLater ? 1 : 0.2}
        onPress={!isSelectedLater ? () => handleSelectTag(tag) : () => {}}
        style={tagStyle}
      >
        <View style={styles.tagText}>
          <Text
            style={[
              styles.tagName,
              tag.section === 'today' && isSelected
                ? styles.selectedText
                : isSelectedLater
                ? styles.selectedLaterText
                : {},
            ]}
          >
            {tag.name}
          </Text>
          {tag.section === "habits" && tagData && (
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>{tagData.day}</Text>
              <Text style={styles.statsText}>{tagData.week > tagData.day && tagData.week}</Text>
              <Text style={styles.statsText}>{tagData.month > tagData.week && tagData.month}</Text>
              <Text style={styles.statsText}>{tagData.year > tagData.month && tagData.year}</Text>
            </View>
          )}
        </View>
        {tag.section === 'today' && isSelected && (
          <MaterialCommunityIcons name="check" size={16} color="white" />
        )}
        {tag.section === 'today' && isSelectedLater && (
          <MaterialCommunityIcons name="arrow-right" size={16} color="white" />
        )}
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#2c2c2e",
    borderBottomWidth: 1,
    borderColor: "#333",
    alignSelf: "stretch",
  },
  selectedTag: {
    backgroundColor: "#3a3a3c",
  },
  disabledTag: {
    backgroundColor: "#3a3a3c",
    borderColor: "#505050",
  },
  tagText: {
    flexDirection: "row",
    color: "#FFF",
    flex: 1,
    justifyContent: "space-between",
  },
  tagName: {
    flex: 2.75,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
  },
  statsContainer: {
    flexDirection: "row",
    flex: 3,
    justifyContent: "space-between",
  },
  statsText: {
    paddingHorizontal: 5,
    color: "#DDD",
    flex: 1,
    textAlign: "center",
  },
  selectedText: {
    textDecorationLine: "line-through",
    color: "#b1b1b3",
  },
  selectedLaterText: {
    color: "#b1b1b3",
  },
});
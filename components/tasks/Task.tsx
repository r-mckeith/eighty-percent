import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { handleDeleteTag } from "../../helpers/tagHelpers";
import RightSwipe from "./RightSwipe";
import AddTask from "./AddTask";
import ScopeTask from "./ScopeTask";
import { TagProps } from "../../src/types/TagTypes";
import { useTagContext } from "../../src/contexts/tags/UseTagContext";
import { useTagDataContext } from "../../src/contexts/tagData/UseTagDataContext";

export default function Task({
  id,
  name,
  completed,
  inScopeDay,
  depth,
}: TagProps) {
  const { tags, dispatch: tagDispatch } = useTagContext();
  const { tagData } = useTagDataContext();

  const swipeableRow = useRef<Swipeable | null>(null);

  function getDepthStyle() {
    switch (depth) {
      case 0:
        return styles.sectionLevel;
      case 1:
        return styles.objectiveLevel;
      case 2:
        return styles.goalLevel;
      case 3:
        return styles.taskLevel;
      default:
        return styles.subtaskLevel;
    }
  }

  return (
    <View>
      <Swipeable
        ref={swipeableRow}
        renderRightActions={() => (
          <RightSwipe
            handleDelete={handleDeleteTag}
            id={id}
            dispatch={tagDispatch}
            swipeableRow={swipeableRow}
          />
        )}
        overshootLeft={false}
        rightThreshold={120}
      >
        <View style={styles.taskContainer}>
          <ScopeTask id={id} inScopeDay={inScopeDay ? inScopeDay : null} completed={completed} />
          <Text
            style={[
              styles.taskName,
              getDepthStyle(),
              completed ? styles.completedTask : null,
            ]}
          >
            {name}
          </Text>
          <AddTask parentId={id} depth={depth ? depth : 0} />
        </View>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  taskName: {
    marginLeft: 7,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
    flex: 1,
  },
  sectionLevel: {
    // color: 'red'
    // fontWeight: 'bold',
    // fontSize: 18, // Bigger and bolder for higher hierarchy
  },
  addButton: {
    // marginLeft: 'auto',
    // padding: 8,
  },
  objectiveLevel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  goalLevel: {
    fontSize: 18,
    fontWeight: "600",
  },
  taskLevel: {
    fontSize: 16,
    fontWeight: "500",
  },
  subtaskLevel: {
    fontSize: 14,
    fontWeight: "400",
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#b1b1b3",
  },
});

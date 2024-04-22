import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { deleteTag } from "../../src/api/SupabaseTags";
import RightSwipe from "./RightSwipe";
import AddTask from "./AddTask";
import ScopeTask from "./ScopeTask";
import { TagProps } from "../../src/types/HabitTypes";
import { useTagContext } from "../../src/contexts/habits/UseHabitContext";

export default function Task({
  tag,
  rootTagId,
  setSelected,
}: {
  tag: TagProps;
  rootTagId?: number | null;
  setSelected?: (arg0: number) => void;
}) {
  const { dispatch: tagDispatch } = useTagContext();

  const swipeableRow = useRef<Swipeable | null>(null);

  async function handleDeleteTag (id: number, dispatch: React.Dispatch<any>) {
    try {
      await deleteTag(id);
      swipeableRow.current?.close();
      dispatch({ type: 'DELETE_TAG', id });
    } catch (error) {
      console.error('Failed to delete tag:', error);
    }
  };

  return (
    <View>
      <Swipeable
        ref={swipeableRow}
        renderRightActions={() => (
          <RightSwipe
            handleDelete={handleDeleteTag}
            id={tag.id}
            dispatch={tagDispatch}
            swipeableRow={swipeableRow}
          />
        )}
        overshootLeft={false}
        rightThreshold={120}
      >
        <View>
          <TouchableOpacity
                  activeOpacity={rootTagId ? 1 : 0.2}

            style={styles.task}
            onPress={() => setSelected && setSelected(tag.id)}
          >
            {rootTagId && (
              <ScopeTask
                id={tag.id}
                inScopeDay={tag.inScopeDay ? tag.inScopeDay : null}
                completed={tag.completed}
              />
            )}
            <Text
              style={[
                styles.taskName,
                tag.completed ? styles.completedTask : null,
              ]}
            >
              {tag.name}
            </Text>
            {rootTagId && !tag.completed && (
              <AddTask parentId={tag.id} depth={tag.depth ? tag.depth : 0} />
            )}
          </TouchableOpacity>
        </View>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#2c2c2e",
    borderBottomWidth: 1,
    borderColor: "#333",
    alignSelf: "stretch",
  },
  taskName: {
    marginLeft: 7,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
    flex: 1,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#b1b1b3",
  },
});

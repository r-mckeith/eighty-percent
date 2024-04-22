import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { deleteHabit } from "../../src/api/SupabaseHabits";
import RightSwipe from "./RightSwipe";
import AddProject from "./AddProject";
import ScopeTask from "./ScopeProject";
import { HabitProps } from "../../src/types/HabitTypes";
import { useHabitContext } from "../../src/contexts/habits/UseHabitContext";

type Project = {
  project: HabitProps;
  rootTagId?: number | null;
  setSelected?: (arg0: number) => void;
};

export default function Project({ project, rootTagId, setSelected }: Project) {
  const { dispatch: habitDispatch } = useHabitContext();

  const swipeableRow = useRef<Swipeable | null>(null);

  async function handleDeleteProject(
    id: number,
  ) {
    try {
      // habits and projects are still the same objects in the db for now
      await deleteHabit(id);
      swipeableRow.current?.close();
      habitDispatch({ type: "DELETE_HABIT", id });
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  }

  return (
    <View>
      <Swipeable
        ref={swipeableRow}
        renderRightActions={() => (
          <RightSwipe
            handleDelete={handleDeleteProject}
            id={project.id}
            dispatch={habitDispatch}
            swipeableRow={swipeableRow}
          />
        )}
        overshootLeft={false}
        rightThreshold={120}
      >
        <View>
          <TouchableOpacity
            activeOpacity={rootTagId ? 1 : 0.2}
            style={styles.project}
            onPress={() => setSelected && setSelected(project.id)}
          >
            {rootTagId && (
              <ScopeTask
                id={project.id}
                inScopeDay={project.inScopeDay ? project.inScopeDay : null}
                completed={project.completed}
              />
            )}
            <Text
              style={[
                styles.projectName,
                project.completed ? styles.completedProject : null,
              ]}
            >
              {project.name}
            </Text>
            {rootTagId && !project.completed && (
              <AddProject parentId={project.id} depth={project.depth ? project.depth : 0} />
            )}
          </TouchableOpacity>
        </View>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  project: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#2c2c2e",
    borderBottomWidth: 1,
    borderColor: "#333",
    alignSelf: "stretch",
  },
  projectName: {
    marginLeft: 7,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
    flex: 1,
  },
  completedProject: {
    textDecorationLine: "line-through",
    color: "#b1b1b3",
  },
});

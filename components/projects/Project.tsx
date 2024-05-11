import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import ProjectRightSwipe from "./ProjectRightSwipe";
import AddButton from "../shared/AddButton";
import ScopeTask from "./ScopeProject";
import { HabitProps } from "../../src/types/HabitTypes";
import { Row, RowText, Section, Swipe } from "../layout";

type Project = {
  project: HabitProps;
  rootProjectId?: number | null;
  setSelected?: (arg0: number) => void;
};

export default function Project({ project, rootProjectId, setSelected }: Project) {
  const swipeableRow = useRef<Swipeable | null>(null);

  return (
    <Swipe
      key={project.id}
      renderRightActions={() => <ProjectRightSwipe project={project} swipeableRow={swipeableRow} />}
    >
      <Row opacity={rootProjectId ? 1 : 0.2} onPress={() => setSelected && setSelected(project.id)}>
        {rootProjectId && (
          <ScopeTask
            id={project.id}
            inScopeDay={project.inScopeDay ? project.inScopeDay : null}
            completed={project.completed}
          />
        )}
        <RowText text={project.name} style={project.completed ? styles.completedProject : null} />
        {rootProjectId && !project.completed && (
          <AddButton
            parentId={project.id}
            depth={project.depth ? project.depth : 0}
            type={"project"}
          />
        )}
      </Row>
    </Swipe>
  );
}

const styles = StyleSheet.create({
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

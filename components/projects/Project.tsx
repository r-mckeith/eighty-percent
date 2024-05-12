import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import AddButton from "../shared/AddButton";
import Scope from "./Scope";
import { HabitProps } from "../../src/types/HabitTypes";
import { Row, RowText, Swipe } from "../layout";
import RightSwipe from "../rightSwipe/RightSwipe";

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
      swipeableRow={swipeableRow}
      renderRightActions={() => <RightSwipe item={project} swipeableRow={swipeableRow} />}
    >
      <Row opacity={rootProjectId ? 1 : 0.2} onPress={() => setSelected && setSelected(project.id)}>
        {rootProjectId && (
          <Scope
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
  completedProject: {
    textDecorationLine: "line-through",
    color: "#b1b1b3",
  },
});

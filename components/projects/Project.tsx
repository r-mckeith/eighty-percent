import React, { useRef } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import AddButton from '../shared/AddButton';
import Scope from './Scope';
import { HabitProps } from '../../src/types/HabitTypes';
import { Row, RowText, Swipe } from '../shared';
import RightSwipe from '../rightSwipe/RightSwipe';

type Project = {
  project: HabitProps;
  rootProjectId?: number | null;
  first: boolean;
  last: boolean;
  setSelected?: (arg0: number) => void;
};

export default function Project({ project, rootProjectId, first, last, setSelected }: Project) {
  const swipeableRow = useRef<Swipeable | null>(null);

  return (
    <Swipe
      key={project.id}
      swipeableRow={swipeableRow}
      renderRightActions={() => <RightSwipe item={project} swipeableRow={swipeableRow} />}>
      <Row
        opacity={rootProjectId ? 1 : 0.2}
        onPress={() => setSelected && setSelected(project.id)}
        disabled={!!project.completed}
        first={first}
        last={last}>
        {rootProjectId && (
          <Scope
            id={project.id}
            inScopeDay={project.inScopeDay ? project.inScopeDay : null}
            completed={project.completed}
          />
        )}
        <RowText text={project.name} disabled={!!project.completed} completed={!!project.completed} />
        {rootProjectId && !project.completed && (
          <AddButton parentId={project.id} depth={project.depth ? project.depth : 0} type={'project'} />
        )}
      </Row>
    </Swipe>
  );
}

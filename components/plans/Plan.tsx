import React, { useRef } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import AddButton from '../shared/AddButton';
import Scope from './Scope';
import { PlanProps } from '../../src/types/shared';
import { Row, RowText, Swipe } from '../layout';
import RightSwipe from '../rightSwipe/RightSwipe';
import { List, Checkbox, RadioButton } from 'react-native-paper';

type Plan = {
  plan: PlanProps;
  rootPlanId?: number | null;
  first: boolean;
  last: boolean;
  setSelected?: (arg0: number) => void;
};

export default function Plan({ plan, rootPlanId, first, last, setSelected }: Plan) {
  const swipeableRow = useRef<Swipeable | null>(null);

  return (
    <Swipe
      key={plan.id}
      swipeableRow={swipeableRow}
      renderRightActions={() => <RightSwipe item={plan} swipeableRow={swipeableRow} type={'plan'} />}>
      {/* <List.Item
      disabled={true}
        title={plan.name}
        left={props => <List.Icon {...props} icon={plan.inScopeDay ? 'radiobox-marked' : 'radiobox-blank'} />}
        right={props => <List.Icon {...props} icon='plus' />}
      /> */}
      <RadioButton.Item
        key={plan.id}
        label={plan.name}
        value={plan.name}
        // onPress={() => setSelected(plan.id)}
        disabled={plan.completed ? true : false}
      />
      {/* <Row
        opacity={rootPlanId ? 1 : 0.2}
        onPress={() => setSelected && setSelected(plan.id)}
        disabled={!!plan.completed}
        first={first}
        last={last}>
        {rootPlanId && (
          <Scope id={plan.id} inScopeDay={plan.inScopeDay ? plan.inScopeDay : null} completed={plan.completed} />
        )}
        <RowText text={plan.name} disabled={!!plan.completed} completed={!!plan.completed} flex={8} />
        {rootPlanId && !plan.completed && (
          <AddButton parentId={plan.id} depth={plan.depth ? plan.depth : 0} type={'plan'} />
        )}
      </Row> */}
    </Swipe>
  );
}

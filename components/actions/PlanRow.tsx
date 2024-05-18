import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { PlanProps } from '../../src/types/HabitTypes';
import { markPlanAsComplete } from '../../src/api/Plans';
import { usePlanContext, useDateContext } from '../../src/contexts';
import { Row, RowText, Icon, StatsText } from '../shared';

type PlanRow = {
  plan: PlanProps;
  first: boolean;
  last: boolean;
};

export default function PlanRow({ plan, first, last }: PlanRow) {
  console.log('planRow', plan)
  const [isSelected, setIsSelected] = useState(false);
  const [isSelectedLater, setIsSelectedLater] = useState(false);

  const { selectedDate } = useDateContext();
  const { dispatch } = usePlanContext();

  useEffect(() => {
    setIsSelectedLater(false);
    setIsSelected(false);
    if (plan.completed && plan.completed === selectedDate.toISOString().split('T')[0]) {
      setIsSelected(true);
    } else if (plan.completed && plan.completed > selectedDate.toISOString().split('T')[0]) {
      setIsSelectedLater(true);
    }
  }, [selectedDate, isSelected, isSelectedLater, plan.completed]);

  const handleSelectPlan = async (selectedPlan: PlanProps) => {
    setIsSelected(!isSelected);
    handleToggleCompleted(selectedPlan.id, selectedDate, dispatch);
  };

  async function handleToggleCompleted(id: number, selectedDate: Date, dispatch: React.Dispatch<any>) {
    dispatch({ type: 'TOGGLE_COMPLETED', id: id, selectedDate: selectedDate });

    try {
      const updatedPlan = await markPlanAsComplete(id, selectedDate);

      if (updatedPlan) {
      } else {
        console.error('Failed to toggle complete');
      }
    } catch (error) {
      console.error('Failed to toggle complete', error);
    }
  }

  return (
    <Row
      opacity={isSelectedLater ? 1 : 0.2}
      onPress={!isSelectedLater ? () => handleSelectPlan(plan) : () => {}}
      disabled={isSelectedLater}
      selected={isSelected}
      first={first}
      last={last}>
      <View style={styles.rowLayout}>
        <RowText text={plan.name} disabled={isSelected || isSelectedLater} completed={isSelected} />
      </View>
      <StatsText
        day={''}
        week={''}
        children={<Icon name={isSelected ? 'check' : isSelectedLater ? 'arrow-right' : ''} />}
      />
    </Row>
  );
}

const styles = StyleSheet.create({
  rowLayout: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
});

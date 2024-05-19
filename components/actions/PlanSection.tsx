import React from 'react';
import { PlanProps } from '../../src/types/shared';
import { markPlanAsComplete } from '../../src/api/Plans';
import { usePlanContext, useDateContext } from '../../src/contexts';
import { Row, RowText, StatsText, Section } from '../layout';
import { Icon } from '../shared';

type Plans = {
  plans: PlanProps[];
};

export default function Plans({ plans }: Plans) {
  const { selectedDate } = useDateContext();
  const { dispatch } = usePlanContext();

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
    <Section title='Plans'>
      {plans.map((plan, index) => {
        const isSelected = plan.completed ? plan.completed === selectedDate.toISOString().split('T')[0] : false;
        const isSelectedLater = plan.completed ? plan.completed > selectedDate.toISOString().split('T')[0] : false;
        return (
          <Row
            key={index}
            opacity={isSelectedLater ? 1 : 0.2}
            onPress={!isSelectedLater ? () => handleToggleCompleted(plan.id, selectedDate, dispatch) : () => {}}
            disabled={isSelectedLater}
            selected={isSelected}
            first={index === 0}
            last={index === plans.length - 1 || plans.length === 1}>
            <RowText text={plan.name} disabled={isSelected || isSelectedLater} completed={isSelected} flex={8} maxLength={40} />
            <Icon name={isSelected ? 'check' : isSelectedLater ? 'arrow-right' : ''} style={{ paddingRight: 15 }} />
          </Row>
        );
      })}
    </Section>
  );
}

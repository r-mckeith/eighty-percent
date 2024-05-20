import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlanProps } from '../../src/types/shared';
import { markPlanAsComplete } from '../../src/api/Plans';
import { usePlanContext, useDateContext } from '../../src/contexts';
import { Row, RowText, Section } from '../layout';
import { Icon } from '../shared';

type Plans = {
  plans: PlanProps[];
};

export default function Plans({ plans }: Plans) {
  const { selectedDate } = useDateContext();
  const { dispatch } = usePlanContext();

  const planMap: { [key: string]: PlanProps } = plans.reduce((acc: { [key: string]: PlanProps }, plan: PlanProps) => {
    acc[plan.id] = plan;
    return acc;
  }, {});

  const getBreadcrumbTrail = (plan: PlanProps) => {
    let breadcrumb = [];
    let currentPlan: PlanProps | undefined = plan;

    while (currentPlan) {
      breadcrumb.unshift(currentPlan.name);
      currentPlan = currentPlan.parentId ? planMap[currentPlan.parentId] : undefined;
    }

    breadcrumb.pop();

    return breadcrumb.length > 0 ? `${breadcrumb.join(' > ')} >` : null;
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
    <Section>
      {plans.map((plan, index) => {
        const isSelected = plan.completed ? plan.completed === selectedDate.toISOString().split('T')[0] : false;
        const isSelectedLater = plan.completed ? plan.completed > selectedDate.toISOString().split('T')[0] : false;
        const breadcrumb = getBreadcrumbTrail(plan);

        return (
          <Row
            key={index}
            opacity={isSelectedLater ? 1 : 0.2}
            onPress={!isSelectedLater ? () => handleToggleCompleted(plan.id, selectedDate, dispatch) : () => {}}
            disabled={isSelectedLater}
            selected={isSelected}
            first={index === 0}
            last={index === plans.length - 1 || plans.length === 1}>
            <View style={styles.textContainer}>
              {!isSelected && !isSelectedLater && <Text style={styles.breadcrumbText}>{breadcrumb}</Text>}

              <RowText
                text={plan.name}
                disabled={isSelected || isSelectedLater}
                completed={isSelected}
                maxLength={30}
              />
            </View>
            <Icon name={isSelected ? 'check' : isSelectedLater ? 'arrow-right' : ''} style={{ paddingRight: 15 }} />
          </Row>
        );
      })}
    </Section>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'column',
    flex: 8,
  },
  breadcrumbText: {
    fontSize: 10,
    color: '#999',
    marginBottom: 2,
  },
});

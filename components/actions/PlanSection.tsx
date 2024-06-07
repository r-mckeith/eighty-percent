import React from 'react';
import { Divider, List } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { markPlanAsComplete } from '../../src/api/Plans';
import { usePlanContext, useDateContext } from '../../src/contexts';
import { PlanProps } from '../../src/types';

type Plans = {
  plans: (PlanProps & { breadcrumb: string })[];
};

export default function PlanSection({ plans }: Plans) {
  const { selectedDate, selectedDateString } = useDateContext();
  const { dispatch } = usePlanContext();

  async function handleToggleCompleted(plan: PlanProps, selectedDate: Date, dispatch: React.Dispatch<any>) {
    if (plan.name === 'Weekly review') {
    } else {
      dispatch({ type: 'TOGGLE_COMPLETED', id: plan.id, selectedDate: selectedDate });
      try {
        const updatedPlan = await markPlanAsComplete(plan.id, selectedDate);

        if (updatedPlan) {
        } else {
          console.error('Failed to toggle complete');
        }
      } catch (error) {
        console.error('Failed to toggle complete', error);
      }
    }
  }

  return (
    <View style={{ marginBottom: 30 }}>
      {plans.map((plan, index) => {
        const isSelected = plan.completed ? plan.completed === selectedDateString : false;
        const isSelectedLater = plan.completed ? plan.completed > selectedDateString : false;
        const breadcrumb = plan.breadcrumb;

        return (
          <View key={index}>
            <List.Item
              title={breadcrumb ? breadcrumb : ''}
              description={plan.name}
              titleStyle={styles.description}
              descriptionStyle={styles.title}
              disabled={isSelectedLater}
              style={{opacity: isSelected || isSelectedLater ? 0.25 : 1}}
              onPress={!isSelectedLater ? () => handleToggleCompleted(plan, selectedDate, dispatch) : () => {}}
              right={props => (
                <List.Icon {...props} icon={isSelected ? 'check' : isSelectedLater ? 'arrow-right' : ''} />
              )}
            />
            <Divider />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 0.15,
  },
  description: {
    fontWeight: '400',
    fontSize: 12,
    letterSpacing: 0.5,
  },
});

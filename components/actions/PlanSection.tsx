import React, { useState } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { getColors } from '../../src/colors';
import { PlanProps } from '../../src/types/shared';
import { markPlanAsComplete } from '../../src/api/Plans';
import { usePlanContext, useDateContext } from '../../src/contexts';
import { Row, RowText, Section, truncateText } from '../layout';
import { Icon } from '../shared';
import ReviewModal from '../reviews/ReviewModal';

type Plans = {
  plans: PlanProps[];
};

export default function Plans({ plans }: Plans) {
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { selectedDate } = useDateContext();
  const { dispatch } = usePlanContext();

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const planMap: { [key: string]: PlanProps } = plans.reduce((acc: { [key: string]: PlanProps }, plan: PlanProps) => {
    acc[plan.id] = plan;
    return acc;
  }, {});

  const getBreadcrumbTrail = (plan: PlanProps) => {
    let breadcrumb = [];
    let currentPlan: PlanProps | undefined = plan;

    while (currentPlan) {
      breadcrumb.unshift(truncateText(currentPlan.name, 20));
      currentPlan = currentPlan.parentId ? planMap[currentPlan.parentId] : undefined;
    }

    breadcrumb.pop();

    return breadcrumb.length > 0 ? `${breadcrumb.join(' > ')} >` : null;
  };

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
    <>
    <Section>
      {plans.map((plan, index) => {
        const isSelected = plan.completed ? plan.completed === selectedDate.toISOString().split('T')[0] : false;
        const isSelectedLater = plan.completed ? plan.completed > selectedDate.toISOString().split('T')[0] : false;
        const breadcrumb = getBreadcrumbTrail(plan);

        return (
          <Row
            key={index}
            opacity={isSelectedLater ? 1 : 0.2}
            onPress={!isSelectedLater ? () => handleToggleCompleted(plan, selectedDate, dispatch) : () => {}}
            disabled={isSelectedLater}
            selected={isSelected}
            first={index === 0}
            last={index === plans.length - 1 || plans.length === 1}>
            <View style={styles.textContainer}>
              {!isSelected && !isSelectedLater && breadcrumb && (
                <Text style={[styles.breadcrumbText, colors.text]}>{breadcrumb}</Text>
              )}

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
    <ReviewModal visible={showReviewModal} onClose={() => setShowReviewModal(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'column',
    flex: 8,
  },
  breadcrumbText: {
    fontSize: 10,
    marginBottom: 2,
  },
});

import React, { useState, useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';
import { Button } from 'react-native-paper';
import { usePlanContext } from '../src/contexts';
import { getColors } from '../src/colors';
import { PlanProps } from '../src/types';
import { Toggle, SectionTitle } from '../components/shared';
import AddPlan from '../components/plans/AddPlan';
import PlanSection from '../components/plans/PlanSection';

export default function Plans() {
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [filteredPlans, setFilteredPlans] = useState<PlanProps[]>([]);
  const [expanded, setExpanded] = useState<number[]>([]);

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const { plans } = usePlanContext();

  const sortedPlans = plans.sort((a, b) => {
    const planA = a.completed ? 1 : 0;
    const planB = b.completed ? 1 : 0;
    return planA - planB;
  });

  useEffect(() => {
    const filteredPlans = showCompleted ? sortedPlans : sortedPlans.filter(plan => !plan.completed);
    setFilteredPlans(filteredPlans);
  }, [plans, showCompleted]);

  return (
    <View style={[colors.background, { flex: 1 }]}>

      <NestableScrollContainer stickyHeaderIndices={[1]}>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
        <Toggle
          onToggle={() => setShowCompleted(!showCompleted)}
          value={showCompleted}
          label={'Show Completed'}
          style={{ paddingLeft: 15 }}
        />
        <Button mode='text' style={{ paddingRight: 10 }} textColor={colors.text.color} onPress={() => setExpanded([])}>
          Collapse all
        </Button>
      </View>
        <SectionTitle title='Recent Plans'>
          <AddPlan order={plans.filter(plan => !plan.parentId).length + 1} />
        </SectionTitle>
        <PlanSection plans={filteredPlans} expanded={expanded} setExpanded={setExpanded} />
      </NestableScrollContainer>
    </View>
  );
}

import React, { useState, useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
import { Button } from 'react-native-paper';
import { usePlanContext } from '../src/contexts';
import { getColors } from '../src/colors';
import { PlanProps } from '../src/types';
import PlanSection from '../components/plans/PlanSection';
import { AddButton, Toggle, SectionTitle, Scroll } from '../components/shared';

export default function Plans() {
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [rootPlans, setRootPlans] = useState<PlanProps[]>([]);
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

    const planRoots = filteredPlans.filter(plan => plan.parentId === 0);
    setRootPlans(planRoots);
  }, [plans, showCompleted]);

  return (
    <View style={[colors.background, { flex: 1 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 }}>
        <Toggle
          onToggle={() => setShowCompleted(!showCompleted)}
          value={showCompleted}
          label={'Show Completed'}
          style={{ paddingLeft: 10 }}
        />
        <Button mode='text' style={{ paddingRight: 10 }} onPress={() => setExpanded([])}>
          Collapse all
        </Button>
      </View>

      <Scroll stickyIndices={[0]}>
        <SectionTitle title='Recent Plans'>
          <AddButton parentId={0} depth={0} type={'plan'} />
        </SectionTitle>
        <PlanSection rootPlans={rootPlans} plans={filteredPlans} expanded={expanded} setExpanded={setExpanded} />
      </Scroll>
    </View>
  );
}

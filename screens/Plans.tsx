import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { usePlanContext } from '../src/contexts';
import { PlanProps } from '../src/types';
import { RootPlans } from '../components/plans';
import { AddButton, Toggle, SectionTitle, Scroll } from '../components/shared';

export default function Plans() {
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [rootPlans, setRootPlans] = useState<PlanProps[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<PlanProps[]>([]);
  const [expanded, setExpanded] = useState<number[]>([]);


  const { plans } = usePlanContext();

  useEffect(() => {
    const filteredPlans = showCompleted ? plans : plans.filter(plan => !plan.completed);
    setFilteredPlans(filteredPlans);

    const planRoots = filteredPlans.filter(plan => plan.parentId === 0);
    setRootPlans(planRoots);
  }, [plans, showCompleted]);

  return (
    <View>
      <Toggle
        onToggle={() => setShowCompleted(!showCompleted)}
        value={showCompleted}
        label={'Show Completed'}
        style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10, paddingTop: 10 }}
      />
      <Scroll stickyIndices={[0]}>
        <SectionTitle title='Recent Plans'>
          <AddButton parentId={0} depth={0} type={'plan'} />
        </SectionTitle>
        <RootPlans rootPlans={rootPlans} plans={filteredPlans} expanded={expanded} setExpanded={setExpanded} />
      </Scroll>
    </View>
  );
}

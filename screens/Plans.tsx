import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { usePlanContext } from '../src/contexts';
import { PlanProps } from '../src/types';
import { RootPlans, NestedList, ToggleAndBack } from '../components/plans';
import { SectionTitle, Scroll } from '../components/layout';
import { AddButton, Toggle } from '../components/shared';

export default function Plans() {
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [rootPlans, setRootPlans] = useState<PlanProps[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<PlanProps[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const { plans } = usePlanContext();

  useEffect(() => {
    const filteredPlans = showCompleted ? plans : plans.filter(plan => !plan.completed);
    setFilteredPlans(filteredPlans);

    const planRoots = filteredPlans.filter(plan => plan.parentId === 0);
    setRootPlans(planRoots);
  }, [showCompleted, plans, selectedPlan]);

  function handlePressBack() {
    setSelectedPlan(null);
    setShowCompleted(false);
  }

  return (
    <Scroll>
      {selectedPlan && (
        <View>
          <ToggleAndBack onPressBack={handlePressBack} onToggle={setShowCompleted} showCompleted={showCompleted} />
          <NestedList plans={filteredPlans} rootPlanId={selectedPlan} />
        </View>
      )}

      {!selectedPlan && (
        <View>
          <Toggle
            onToggle={setShowCompleted}
            value={showCompleted}
            label={'Show Completed'}
            style={{ justifyContent: 'flex-end', paddingBottom: 30 }}
          />
          <SectionTitle title='Recent Plans'>
            <AddButton parentId={0} depth={0} type={'plan'} />
          </SectionTitle>
          <RootPlans rootPlans={rootPlans} plans={plans} setSelected={setSelectedPlan} />
        </View>
      )}
    </Scroll>
  );
}

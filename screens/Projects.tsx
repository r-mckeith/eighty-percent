import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { usePlanContext } from "../src/contexts";
import AddButton from "../components/shared/AddButton";
import { PlanProps } from "../src/types/HabitTypes";
import PlanSection from "../components/plans/PlanSection";
import NestedList from "../components/plans/NestedList";
import { SectionTitle, Scroll } from "../components/shared";
import ToggleAndBack from "../components/plans/ToggleAndBack";
import { Toggle } from "../components/shared";

export default function Plans() {
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [planRoots, setPlanRoots] = useState<PlanProps[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<PlanProps[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const { plans } = usePlanContext();

  useEffect(() => {
    const filteredPlans = showCompleted
      ? plans
      : plans.filter((plan) => !plan.completed);
    setFilteredPlans(filteredPlans);

    const planRoots = filteredPlans.filter((plan) => plan.parentId === 0);
    setPlanRoots(planRoots);
  }, [showCompleted, plans, selectedPlan]);

  function handlePressBack() {
    setSelectedPlan(null);
    setShowCompleted(false);
  }

  return (
    <Scroll>
      {selectedPlan && (
        <View>
          <ToggleAndBack
            onPressBack={handlePressBack}
            onToggle={setShowCompleted}
            showCompleted={showCompleted}
          />
          <NestedList plans={filteredPlans} rootPlanId={selectedPlan} />
        </View>
      )}

      {!selectedPlan && (
        <>
          <Toggle
            onToggle={setShowCompleted}
            value={showCompleted}
            label={'Show Completed'}
            style={{justifyContent: 'flex-end', paddingBottom: 30}}
          />
          <SectionTitle title="Recent">
            <AddButton parentId={0} depth={0} type={"plan"} />
          </SectionTitle>
          <PlanSection plans={planRoots} setSelected={setSelectedPlan} />
        </>
      )}
    </Scroll>
  );
}

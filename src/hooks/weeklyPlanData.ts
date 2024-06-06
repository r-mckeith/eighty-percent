import { useState, useEffect } from 'react';
import { PlanProps } from '../types';
import { useDateContext, usePlanContext } from '../contexts';

export type WeeklyPlanData = {
  name: string; 
  days: { day: string; status: string; icon: string; color: string; }[]
}[];

const emptyPlanData = [{
  name: '',
  days:[{ day: '', status: '', icon: '', color: '' }]
}];

export function useWeeklyPlanData() {
  const [weeklyPlanData, setWeeklyPlanData] = useState<WeeklyPlanData>(emptyPlanData);

  const { selectedDate, todayDate, todayString, yesterday, yesterdayString } = useDateContext();
  const { plans } = usePlanContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aggregatedPlans = aggregatePlanData(plans);

        setWeeklyPlanData(aggregatedPlans);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [selectedDate]);

  function aggregatePlanData(plans: PlanProps[]) {
    const startDay = new Date(selectedDate);
    startDay.setHours(0, 0, 0, 0);
    startDay.setDate(startDay.getDate() - 6);

    const endDay = new Date(selectedDate);
    endDay.setHours(23, 59, 59, 999);

    return plans
      .map(plan => ({
        name: plan.name,
        completedDay: plan.completed ? new Date(plan.completed) : null,
        inScopeDay: plan.inScopeDay ? new Date(plan.inScopeDay) : null,
        completed: !!plan.completed,
      }))
      .filter(
        plan =>
          (plan.inScopeDay && plan.inScopeDay >= startDay && plan.inScopeDay <= endDay) ||
          (plan.completedDay && plan.completedDay >= startDay && plan.completedDay <= endDay)
      )
      .map(plan => {
        const inScopeDate = plan.inScopeDay;
        const completedDate = plan.completedDay;

        return {
          name: plan.name,
          days: Array.from({ length: 7 }, (_, dayIndex) => {
            const day = new Date(startDay);
            day.setDate(startDay.getDate() + dayIndex);

            const dayStr = day.toISOString().split('T')[0];
            const completedDayStr = completedDate ? completedDate.toISOString().split('T')[0] : '';

            const isCompleted = completedDate && dayStr === completedDayStr;
            const isInScope = inScopeDate ? day.getTime() >= inScopeDate.getTime() : false;
            const isPushed = !isCompleted && isInScope && completedDate && completedDate > day;
            const isIncomplete = isInScope && !completedDate;

            let status = '';
            let icon = '';
            let color = 'red';

            if (isPushed || isIncomplete) {
              status = 'P';
              icon = '→';
              color = '#FF0000';
            } else if (isCompleted) {
              status = 'C';
              icon = '✓';
              color = 'blue';
            } else if (isIncomplete) {
              status = 'I';
              icon = '✗';
              color = 'red';
            }

            return {
              day: day.toDateString(),
              status: status,
              icon: icon,
              color: color,
            };
          }),
        };
      });
  }

  return { weeklyPlanData };
}

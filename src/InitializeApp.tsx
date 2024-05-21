import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDateContext, usePlanContext, useReviewContext } from './contexts';
import { addPlan } from './api/Plans';



const InitializeApp = ({ children }: any) => {
  const [loading, setLoading] = useState(true);

  const { reviews } = useReviewContext();
  const { dispatch: planDispatch } = usePlanContext();
  const { selectedDate } = useDateContext();

  function moreThanAWeekOld(lastReviewDate: any) {
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const currentDate: any = new Date(selectedDate);
    const lastReview: any = new Date(lastReviewDate);
    return currentDate - lastReview > oneWeekInMilliseconds;
  }

  useEffect(() => {
    const lastReview = reviews[0];

    if (!lastReview) return;

    async function addReviewIfNeeded(): Promise<void> {
      if (moreThanAWeekOld(lastReview)) {
      console.log(lastReview.date, 'inside');

        const newPlan: any = {
          name: 'Weekly review',
          parentId: 0,
          depth: 1,
          inScopeDay: selectedDate.toISOString().split('T')[0],
        };

        try {
          const createdPlan = await addPlan(newPlan);
          planDispatch({ type: 'ADD_PLAN', payload: createdPlan });
        } catch (error) {
          console.error('Failed to add plan:', error);
        } finally {
          setLoading(false);
        }
      }
    }
    addReviewIfNeeded();
  }, [reviews]);

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size='large' />
  //     </View>
  //   );
  // }

  return children;
};

export default InitializeApp;

import React, { useState } from 'react';
import { View } from 'react-native';
import DailyReview from './DailyReview';
import { Button } from 'react-native-paper';
import { HabitProps, PlanProps } from '../../src/types';

type DailyReviewButton = {
  habits: HabitProps[];
  plans: PlanProps[];
  isYesterdayReview: boolean;
};

export default function DailyReviewButton({ habits, plans, isYesterdayReview }: DailyReviewButton) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <Button mode='contained' style={{ marginTop: 10 }} onPress={() => setShowModal(true)}>
        Daily review
      </Button>
      <DailyReview habits={habits} plans={plans} visible={showModal} onClose={() => setShowModal(false)} isYesterdayReview={isYesterdayReview}/>
    </View>
  );
}

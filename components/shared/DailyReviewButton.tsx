import React, { useState } from 'react';
import { View } from 'react-native';
import DailyReview from '../reviews/DailyReview';
import { Button } from 'react-native-paper';
import { HabitProps, PlanProps } from '../../src/types/shared';

type DailyReviewButton = {
  habits: HabitProps[];
  plans: PlanProps[];
};

export default function DailyReviewButton({ habits, plans }: DailyReviewButton) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <Button mode='contained' style={{ marginTop: 10 }} onPress={() => setShowModal(true)}>
        Daily review
      </Button>
      <DailyReview habits={habits} plans={plans} visible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
}

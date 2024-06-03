import React, { useState } from 'react';
import { View } from 'react-native';
import WeeklyReview from '../reviews/WeeklyReview';
import { Button } from 'react-native-paper';

export default function ReviewButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <Button mode='contained' style={{ marginTop: 10 }} onPress={() => setShowModal(true)}>
        Weekly review
      </Button>
      <WeeklyReview visible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
}

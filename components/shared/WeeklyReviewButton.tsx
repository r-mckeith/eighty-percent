import React, { useState } from 'react';
import { View } from 'react-native';
import ReviewModal from '../reviews/WeeklyReview';
import { Button } from 'react-native-paper';

export default function ReviewButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <Button mode='contained' style={{ marginTop: 10 }} buttonColor={'#0E5FFF'} onPress={() => setShowModal(true)}>
        Weekly review
      </Button>
      <ReviewModal visible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
}

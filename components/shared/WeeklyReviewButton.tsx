import React, { useState } from 'react';
import { View, useColorScheme } from 'react-native';
import ReviewModal from '../reviews/ReviewModal';
import { getColors } from '../../src/colors';
import { Button } from 'react-native-paper';

export default function ReviewButton() {
  const [showModal, setShowModal] = useState(false);

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View>
      <Button mode='contained' style={{ marginTop: 10 }} onPress={() => setShowModal(true)}>
        Weekly review
      </Button>
      <ReviewModal visible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
}

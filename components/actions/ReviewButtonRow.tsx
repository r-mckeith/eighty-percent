import React, { useState } from 'react';
import { View, useColorScheme } from 'react-native';
import { getColors } from '../../src/colors';
import ReviewModal from '../reviews/ReviewModal';
import { Row, RowText } from '../layout';

export default function ReviewButtonRow({ first }: { first: boolean }) {
  const [showModal, setShowModal] = useState(false);

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View>
      <Row opacity={0.2} style={colors.reviewButton} onPress={() => setShowModal(true)} first={first ? first : false} last={true}>
        <RowText text={'Weekly review'} />
      </Row>
      <ReviewModal visible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
}

import React from 'react';
import { useColorScheme, Text } from 'react-native';
import { getColors } from '../../src/colors';
import { useReviewContext } from '../../src/contexts';
import { Section, Row } from '../layout';

export default function Focus() {
  const { reviews } = useReviewContext();

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const lastReview = reviews && reviews[0]?.response ? reviews[0]?.response : null;

  if (!lastReview) return

  return (
    <Section>
      <Row opacity={1} first={true} last={true}>
        <Text>
          <Text style={[{ fontWeight: 'bold' }, colors.text]}>This week's focus: </Text>
          <Text style={colors.text}>{lastReview && lastReview.improve}</Text>
        </Text>
      </Row>
    </Section>
  );
}

import React from 'react';
import { StyleSheet, useColorScheme, Text } from 'react-native';
import { getColors } from '../../src/colors';
import { useReviewContext } from '../../src/contexts';
import { Section, SectionTitle, Row } from '../layout';

export default function Focus() {
  const { reviews } = useReviewContext();

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const lastReview = reviews && reviews[0]?.response;

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

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  activityHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

import React from 'react';
import { Text, useColorScheme } from 'react-native';
import { Section, SectionTitle, Row } from '../layout';
import { getColors } from '../../src/colors';

export default function Summary({ lastReview }: any) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <Section>
      <SectionTitle title='Last Week' />

      <Row opacity={1} first={true} last={false}>
        <Text>
          <Text style={[{ fontWeight: 'bold' }, colors.text]}>Good: </Text>
          <Text style={colors.text}>{lastReview.good}</Text>
        </Text>
      </Row>
      <Row opacity={1} first={false} last={false}>
        <Text>
          <Text style={[{ fontWeight: 'bold' }, colors.text]}>Bad: </Text>
          <Text style={colors.text}>{lastReview.bad}</Text>
        </Text>
      </Row>
      <Row opacity={1} first={false} last={true}>
        <Text>
          <Text style={[{ fontWeight: 'bold' }, colors.text]}>Improve: </Text>
          <Text style={colors.text}>{lastReview.improve}</Text>
        </Text>
      </Row>
    </Section>
  );
}

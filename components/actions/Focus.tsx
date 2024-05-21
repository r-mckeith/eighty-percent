import React from 'react';
import { useColorScheme, Text } from 'react-native';
import { getColors } from '../../src/colors';
import { Section, Row } from '../layout';

export default function Focus({ review }: { review: string }) {

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <Section>
      <Row opacity={1} first={true} last={true}>
        <Text>
          <Text style={[{ fontWeight: 'bold' }, colors.text]}>This week's focus: </Text>
          <Text style={colors.text}>{review}</Text>
        </Text>
      </Row>
    </Section>
  );
}

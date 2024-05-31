import React from 'react';
import { useColorScheme } from 'react-native';
import { getColors } from '../../src/colors';
import { Card, Text } from 'react-native-paper';

export default function Focus({ review }: { review: string }) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <Card mode={'elevated'} style={[{ marginBottom: 30 }, colors.background]}>
      <Card.Content>
        <Text variant='titleLarge'>This week's focus:</Text>
        <Text variant='bodyMedium'>{review}</Text>
      </Card.Content>
    </Card>
  );
}

import React from 'react';
import { useColorScheme } from 'react-native';
import { getColors } from '../../src/colors';
import { Card, Text } from 'react-native-paper';

export default function Summary({ lastReview }: any) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <Card mode='outlined' style={colors.background}>
      <Card.Content style={{ paddingBottom: 10 }}>
        <Text variant='bodyMedium'> {lastReview.good}</Text>
      </Card.Content>
      <Card.Content style={{ paddingBottom: 10 }}>
        <Text variant='bodyMedium'> {lastReview.bad}</Text>
      </Card.Content>
      <Card.Content>
        <Text variant='bodyMedium'> {lastReview.improve}</Text>
      </Card.Content>
    </Card>
  );
}

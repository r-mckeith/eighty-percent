import React from 'react';
import { useColorScheme } from 'react-native';
import { getColors } from '../../src/colors';
import { Card, Divider, Text } from 'react-native-paper';

export default function Summary({ lastReview }: any) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <Card mode='outlined' style={[colors.background, { paddingBottom: 30 }]}>
      <Card.Content style={{ paddingBottom: 10 }}>
        <Text variant='bodyMedium' style={{ paddingBottom: 10 }}>
          {lastReview.good}
        </Text>
        <Divider />
      </Card.Content>
      <Card.Content style={{ paddingBottom: 10 }}>
        <Text variant='bodyMedium' style={{ paddingBottom: 10 }}>
          {lastReview.bad}
        </Text>
        <Divider />
      </Card.Content>
      <Card.Content>
        <Text variant='bodyMedium'>{lastReview.improve}</Text>
      </Card.Content>
    </Card>
  );
}

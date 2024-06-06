import React from 'react';
import { Text, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

type TargetSelector = {
  times: number;
  timeframe: string;
  setTimes: (arg0: number) => void;
  setTimeframe: (arg0: string) => void;
};

export default function TargetSelector({ times, timeframe, setTimes, setTimeframe }: TargetSelector) {
  return (
    <View>
      <SegmentedButtons
        style={{ paddingVertical: 10 }}
        value={times.toString()}
        onValueChange={value => setTimes(Number(value))}
        buttons={[...Array(4).keys()].map(i => ({ label: (i + 1).toString(), value: (i + 1).toString() }))}
      />
      <Text style={{ textAlign: 'center', fontSize: 16 }}>{times === 1 ? 'time per' : 'times per'}</Text>
      <SegmentedButtons
        style={{ paddingTop: 10 }}
        value={timeframe}
        onValueChange={value => setTimeframe(value)}
        buttons={[
          { label: 'Day', value: 'day' },
          { label: 'Week', value: 'week' },
        ]}
      />
    </View>
  );
}

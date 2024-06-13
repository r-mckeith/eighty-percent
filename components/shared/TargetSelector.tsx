import React from 'react';
import { View } from 'react-native';
import Slider from '@react-native-community/slider';
import { SegmentedButtons, Text } from 'react-native-paper';

type TargetSelector = {
  times: number;
  timeframe: string;
  setTimes: (arg0: number) => void;
  setTimeframe: (arg0: string) => void;
};

export default function TargetSelector({ times, timeframe, setTimes, setTimeframe }: TargetSelector) {
  return (
    <View style={{ paddingBottom: 10 }}>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={10}
        onValueChange={value => setTimes(Number(value))}
        step={1}
        tapToSeek={true}
        minimumTrackTintColor='#0E9FFF'
      />
      <Text style={{ textAlign: 'center', fontSize: 16 }}>{`${times} ${times === 1 ? 'time per' : 'times per'}`}</Text>
      <SegmentedButtons
        style={{ paddingTop: 10 }}
        theme={{ colors: { secondaryContainer: '#0E9FFF' } }}
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

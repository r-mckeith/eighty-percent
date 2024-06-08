import React from 'react';
import { useColorScheme, View } from 'react-native';
import { getColors } from '../../src/colors';
import { Text } from 'react-native-paper';

export default function GridHeader({ title, selectedDate }: { title: string; selectedDate: any }) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  function generateDayHeaders() {
    const fullWeek = ['Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo'];
    const date = new Date(selectedDate);
    const selectedDayOfWeek = date.getDay();
    const adjustedIndex = selectedDayOfWeek === 0 ? 6 : selectedDayOfWeek - 1;
    return [...fullWeek.slice(adjustedIndex), ...fullWeek.slice(0, adjustedIndex)];
  }

  return (
    <View>
    <View style={[colors.background, { flexDirection: 'row', alignItems: 'center', flex: 10, paddingVertical: 5 }]}>
      <Text variant='headlineSmall' style={{ flex: 4 }}>
        {title}
      </Text>
      <View style={{ flexDirection: 'row', flex: 6, justifyContent: 'space-evenly', paddingRight: 20 }}>
        {generateDayHeaders().map((header, index) => (
          <Text key={index} variant='bodyMedium' style={{ flex: 4 }}>
            {header}
          </Text>
        ))}
      </View>
    </View>
    </View>

  );
}

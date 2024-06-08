import React from 'react';
import { useColorScheme, View } from 'react-native';
import { getColors } from '../../src/colors';
import { Text, DataTable } from 'react-native-paper';

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
    <View style={[colors.background, { flexDirection: 'row', alignItems: 'center', flex: 10 }]}>
      <Text variant='headlineMedium' style={{ flex: 4, color: '#0E5FFF' }}>
        {title}
      </Text>
      <View style={{ flexDirection: 'row', flex: 6, justifyContent: 'space-evenly', paddingRight: 20 }}>
        {generateDayHeaders().map((header, index) => (
          <DataTable.Title key={index}>
            <Text variant='bodyMedium' style={{ flex: 4, color: '#0E5FFF' }}>
              {header}
            </Text>
          </DataTable.Title>
        ))}
      </View>
    </View>
  );
}

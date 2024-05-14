import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Section, Row, RowText } from '../shared';
import { getColors } from '../../src/colors';

type Grid = {
  data: any;
  selectedDate: any;
  name: string;
};

export default function Grid({ data, selectedDate, name }: Grid) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  
  const dataLength = data.length;

  function generateDayHeaders() {
    const fullWeek = ['Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo'];
    const date = new Date(selectedDate);
    const selectedDayOfWeek = date.getDay();
    const adjustedIndex = selectedDayOfWeek === 0 ? 6 : selectedDayOfWeek - 1;
    return [...fullWeek.slice(adjustedIndex), ...fullWeek.slice(0, adjustedIndex)];
  }

  return (
    <Section>
      <View style={[styles.gridHeader, colors.border]}>
        <Text style={[styles.headerCell, colors.text]}>{name}</Text>
        {generateDayHeaders().map((header, index) => (
          <Text key={index} style={[styles.gridCell, colors.text]}>
            {header}
          </Text>
        ))}
      </View>
      {data &&
        data.map((data: any, index: any) => (
          <Row key={index} opacity={1} last={index === dataLength - 1}>
            <RowText text={data.name} fontSize={12} style={{ marginLeft: 7 }} />
            {data.days.map((day: any, idx: number) => (
              <Text
                key={idx}
                style={[
                  styles.gridCell,
                  {
                    color: day.status === 'P' || day.icon === '-' ? day.color : colors.text.color
                  },
                ]}>
                {day.icon}
              </Text>
            ))}
          </Row>
        ))}
    </Section>
  );
}

const styles = StyleSheet.create({
  gridHeader: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerCell: {
    flex: 4,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  gridCell: {
    flex: 1,
    textAlign: 'center',
  },
});

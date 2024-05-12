import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Section, Row, RowText } from "../shared";

type Grid = {
  data: any;
  selectedDate: any;
  name: string;
};

export default function Grid({ data, selectedDate, name }: Grid) {
  function generateDayHeaders() {
    const fullWeek = ["Tu", "We", "Th", "Fr", "Sa", "Su", "Mo"];
    const date = new Date(selectedDate);
    const selectedDayOfWeek = date.getDay();
    const adjustedIndex = selectedDayOfWeek === 0 ? 6 : selectedDayOfWeek - 1;
    return [...fullWeek.slice(adjustedIndex), ...fullWeek.slice(0, adjustedIndex)];
  }

  return (
    <Section>
      <View style={styles.gridHeader}>
        <Text style={styles.headerCell}>{name}</Text>
        {generateDayHeaders().map((header, index) => (
          <Text key={index} style={styles.gridCell}>
            {header}
          </Text>
        ))}
      </View>
      {data &&
        data.map((data: any) => (
          <Row opacity={0}>
            <RowText text={data.name} fontSize={12}/>
            {data.days.map((day: any, idx: number) => (
              <Text
                key={idx}
                style={[
                  styles.gridCell,
                  {
                    color: day.color,
                  },
                ]}
              >
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
    flexDirection: "row",
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
  },
  headerCell: {
    flex: 4,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  gridCell: {
    flex: 1,
    textAlign: "center",
    color: "white",
  },
});

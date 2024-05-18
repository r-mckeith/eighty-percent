import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { HabitProps } from '../../src/types/HabitTypes';
import { selectHabit } from '../../src/api/Habits';
import { useHabitDataContext } from '../../src/contexts/habitData/UseHabitDataContext';
import { useDateContext } from '../../src/contexts/date/useDateContext';
import { useAggregatedData, HabitsAggregatedData } from '../../src/hooks/aggregateData';
import { Row, RowText, Swipe, StatsText, Section } from '../shared';
import RightSwipe from '../rightSwipe/RightSwipe';
import StatsHeader from './StatsHeader';

type Habits = {
  habits: HabitProps[];
  sectionName: string;
};

export default function Habits({ habits, sectionName }: Habits) {
  const { dispatch: habitDataDispatch } = useHabitDataContext();
  const { habitsTableData } = useAggregatedData();
  const { selectedDate } = useDateContext();

  const swipeableRow = useRef<Swipeable | null>(null);

  const handleSelectHabit = async (selectedHabit: HabitProps) => {
    try {
      const updatedHabitData = await selectHabit(selectedHabit, selectedDate);
      habitDataDispatch({
        type: 'UPDATE_HABIT_DATA',
        payload: updatedHabitData,
      });
    } catch (error) {
      console.error('Error selecting habit:', error);
    }
  };

  return (
    <Section title={sectionName}>
      <StatsHeader />
      {habits.map((habit, index) => {
        const habitData = habitsTableData.find(data => data.tag_id === habit.id)
        return (
          <Swipe
            key={habit.id}
            swipeableRow={swipeableRow}
            renderRightActions={() => (
              <RightSwipe item={habit} habitData={habitData} showData={true} swipeableRow={swipeableRow} />
            )}>
            <Row
              key={index}
              opacity={0.2}
              onPress={() => handleSelectHabit(habit)}
              first={false}
              last={index === habits.length -1 || habits.length === 1}>
              <View style={styles.rowLayout}>
                <RowText text={habit.name} />
                {habitData && (
                  <StatsText
                    day={habitData.day > 0 ? habitData.day : '-'}
                    week={habitData.week > 0 ? habitData.week : '-'}
                  />
                )}
              </View>
            </Row>
          </Swipe>
        );
      })}
    </Section>
  );
}

const styles = StyleSheet.create({
  rowLayout: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
});

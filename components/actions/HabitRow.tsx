import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { HabitProps } from '../../src/types/HabitTypes';
import { selectHabit } from '../../src/api/Habits';
import { useHabitDataContext } from '../../src/contexts/habitData/UseHabitDataContext';
import { useDateContext } from '../../src/contexts/date/useDateContext';
import { useAggregatedData, HabitsAggregatedData } from '../../src/hooks/aggregateData';
import { Row, RowText, Swipe, StatsText } from '../shared';
import RightSwipe from '../rightSwipe/RightSwipe';

type HabitRow = {
  habit: HabitProps;
  sectionName?: string;
  first: boolean;
  last: boolean;
};

export default function HabitRow({ habit, first, last }: HabitRow) {
  const [habitData, setHabitData] = useState<HabitsAggregatedData | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const { dispatch: habitDataDispatch } = useHabitDataContext();
  const { habitsTableData } = useAggregatedData();
  const { selectedDate } = useDateContext();

  const swipeableRow = useRef<Swipeable | null>(null);

  useEffect(() => {
    const data = habitsTableData.find(data => data.tag_id === habit.id);
    if (data !== undefined) {
      setHabitData(data);
    } else {
      setHabitData(null);
    }
  }, [selectedDate, habit.completed, habitsTableData]);

  const handleSelectHabit = async (selectedHabit: HabitProps) => {
    setIsSelected(true);
    try {
      const updatedHabitData = await selectHabit(selectedHabit, selectedDate);
      habitDataDispatch({
        type: 'UPDATE_HABIT_DATA',
        payload: updatedHabitData,
      });
      setTimeout(() => setIsSelected(false), 1);
    } catch (error) {
      console.error('Error selecting habit:', error);
    }
  };

  return (
    <Swipe
      key={habit.id}
      swipeableRow={swipeableRow}
      renderRightActions={() => (
        <RightSwipe item={habit} habitData={habitData} showData={true} swipeableRow={swipeableRow} />
      )}>
      <Row opacity={0.2} onPress={() => handleSelectHabit(habit)} first={first} selected={isSelected} last={last}>
        <View style={styles.rowLayout}>
          <RowText text={habit.name} />
          {habitData && (
            <StatsText day={habitData.day > 0 ? habitData.day : '-'} week={habitData.week > 0 ? habitData.week : '-'} />
          )}
        </View>
      </Row>
    </Swipe>
  );
}

const styles = StyleSheet.create({
  rowLayout: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
});

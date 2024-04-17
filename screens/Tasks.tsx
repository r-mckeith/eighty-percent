import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { useTaskContext } from '../src/contexts/tasks/UseTaskContext';
import { useDateContext } from '../src/contexts/date/useDateContext';
import TaskContainer from '../components/tasks/TaskContainer';
import Header from '../components/ListHeader';
import AddTask from '../components/tasks/AddTask';

export default function MonthlyScreen() {
  const [showCompleted, setShowCompleted] = useState<boolean>(false)
  const { state } = useTaskContext();
  const { selectedDate, setSelectedDate } = useDateContext();

  const tasks = showCompleted ? state : state.filter(task => !task.completed)

  return (
    <>
      <Header
        title={''}
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate}
      />
      <View style={styles.toggleAndAddContainer}>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Show Completed</Text>
          <Switch
            value={showCompleted}
            onValueChange={setShowCompleted}
          />
        </View>
        <View style={styles.addButton}>
          <AddTask parentId={0} depth={0} />
        </View>
      </View>
      <View style={styles.container}>
        <TaskContainer tasks={tasks} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleAndAddContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    marginRight: 8,
  },
  addButton: {
    marginRight: 20
  }
});

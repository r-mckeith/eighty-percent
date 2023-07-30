import React, {useContext, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TaskInterface } from '../src/types/TaskTypes'
import { TaskContext } from '../src/contexts/TaskContext';
import { deleteTask } from '../src/api/SupabaseTasks';
import CompleteTask from './CompleteTask';
import AddTask from './AddTask';
import AddNote from './AddNote';
import ScopeTask from './ScopeTask'

const Task: React.FC<TaskInterface> = ({
  id,
  name,
  parentId,
  completed,
  inScopeDay,
  inScopeWeek,
  depth,
  planningScreen,
  currentTab,
  onPress,
  onToggleCompleted,
  onToggleDay,
  onToggleWeek,
  // onDelete,
}) => {

  const swipeableRow = useRef<Swipeable | null>(null);

  const [showNoteModal, setShowNoteModal] = useState(false);

  const context = useContext(TaskContext);

  if (!context) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { dispatch } = context;

  const handleDelete = async (
    ) => {
    
      try {
        await deleteTask(id);
    
        dispatch({ type: 'DELETE_TASK', id });
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    };

  const renderRightActions = () => {
    return (
      parentId !== null && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RectButton style={[styles.rightSwipeItem, styles.deleteButton]} onPress={() => handleDelete()}>
            <MaterialCommunityIcons name="delete" size={30} color="white" />
            <Text style={styles.deleteText}>Delete</Text>
          </RectButton>
          
          <RectButton style={[styles.rightSwipeItem, styles.addNoteButton]} onPress={() => 
            {setShowNoteModal(true); if (swipeableRow.current) {swipeableRow.current.close();}}}>
            <MaterialCommunityIcons name="note-outline" size={30} color="white" />
            <Text style={styles.deleteText}>Add Note</Text>
          </RectButton>
          {/* Add more buttons here */}
        </View>
      )
    );
  };

  return (
    <View>
      <Swipeable ref={swipeableRow} renderRightActions={renderRightActions} overshootRight={false}>     
        <View style={[
        styles.taskContainer, 
        depth === 0 && styles.sectionLevel, 
        depth === 1 && styles.objectiveLevel,
        depth === 2 && styles.goalLevel,
        depth === 3 && styles.taskLevel,
        depth === 4 && styles.subtaskLevel,
      ]}>
      {parentId && planningScreen && 
        <CompleteTask id={id} completed={completed} onToggleCompleted={onToggleCompleted ? onToggleCompleted : () => {}}/>
      }
      {parentId && !planningScreen && 
          <ScopeTask 
            id={id} 
            inScopeDay={inScopeDay}
            inScopeWeek={inScopeWeek}
            currentTab={currentTab}
            onToggleDay={onToggleDay ? onToggleDay : () => {}}
            onToggleWeek={onToggleWeek ? onToggleWeek : () => {}}
          />
        }
          <Text onPress={onPress} style={[styles.taskName]}>
            {name}
          </Text>
          <AddTask parentId={id} depth={depth}/>
        </View>
      </Swipeable>  
      <AddNote showModal={showNoteModal} onClose={() => setShowNoteModal(false)} taskId={id} setShowModal={setShowNoteModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 0.5,
  },
  taskName: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    color: '#333',
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  sectionLevel: {
    paddingLeft: 5,
    borderLeftColor: '#d8d8d8',
    borderLeftWidth: 2,
  },
  objectiveLevel: {
    paddingLeft: 10,
    borderLeftColor: '#c0c0c0',
    borderLeftWidth: 2,
  },
  goalLevel: {
    paddingLeft: 15,
    borderLeftColor: '#a8a8a8',
    borderLeftWidth: 2,
  },
  taskLevel: {
    paddingLeft: 20,
    borderLeftColor: '#909090',
    borderLeftWidth: 2,
  },
  subtaskLevel: {
    paddingLeft: 25,
    borderLeftColor: '#787878',
    borderLeftWidth: 2,
  },
  rightSwipeItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 15,
    height: '100%',
  },
  deleteButton: {
    backgroundColor: '#b22222',
    marginRight: 10,
  },
  addNoteButton: {
    backgroundColor: '#696969',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  editButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
});




export default Task;

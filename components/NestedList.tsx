import React from 'react';
import { View, StyleSheet } from 'react-native';
import Task from './tasks/Task';
import { Task as TaskProps } from '../src/types/TaskTypes';

export default function NestedList({ tasks }: { tasks: TaskProps[] }) {

  const findRoottags = () => {
    const allIds = new Set(tasks.map(task => task.id));
    return tasks.filter(task => !task.parentId || !allIds.has(task.parentId));
  };
  
  // const rendertags = (parentId: number | null) => {
  //   const tagsToRender = parentId === null ? findRoottags() : tags.filter(tag => tag.parentId === parentId);
    
  //   return tagsToRender
  //     .sort((a, b) => b.id - a.id)
  //     .map((tag, index) => (
  //       <View 
  //         key={tag.id} 
  //         style={[
  //           parentId !== null ? styles.subtask : undefined,
  //           parentId === null && index !== 0 ? styles.headerSpacing : undefined,
  //         ]}
  //       >
  //         <Task {...tag}/>
  //         {rendertags(tag.id)}
  //       </View>
  //     ));
  // };

  const rendertags = (parentId: number | null) => {
    const tagsToRender = parentId === null ? findRoottags() : tasks.filter(task => task.parentId === parentId);
    
    // Determine sort direction based on whether it's a root tag or a child tag
    tagsToRender.sort((a, b) => {
      if (parentId === null) {
        // For root tags, sort by id in descending order (newest to oldest)
        return b.id - a.id;
      } else {
        // For child tags, sort by id in ascending order (oldest to newest)
        return a.id - b.id;
      }
    });
    
    return tagsToRender.map((task, index) => (
      <View 
        key={task.id} 
        style={[
          parentId !== null ? styles.subtask : undefined,
          parentId === null && index !== 0 ? styles.headerSpacing : undefined,
        ]}
      >
        <Task {...task}/>
        {rendertags(task.id)}
      </View>
    ));
  };
  
  
  return (
    <View style={styles.container}>
      {rendertags(null)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
    padding: 10,
    marginTop: 15,
    marginHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: 'lightgray',
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerSpacing: {
    marginTop: 20,
  },
  subtask: {
    marginLeft: 20,
  },
});
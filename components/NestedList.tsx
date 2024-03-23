import React from 'react';
import { View, StyleSheet } from 'react-native';
import Task from './tasks/Task';
import { TagProps } from '../src/types/TagTypes';

export default function NestedList({ tags }: { tags: TagProps[] }) {

  const findRoottags = () => {
    const allIds = new Set(tags.map(tag => tag.id));
    return tags.filter(tag => !tag.parentId || !allIds.has(tag.parentId));
  };
  
  const rendertags = (parentId: number | null) => {
    const tagsToRender = parentId === null ? findRoottags() : tags.filter(tag => tag.parentId === parentId);
    
    return tagsToRender
      .sort((a, b) => b.id - a.id)
      .map((tag, index) => (
        <View 
          key={tag.id} 
          style={[
            parentId !== null ? styles.subtask : undefined,
            parentId === null && index !== 0 ? styles.headerSpacing : undefined,
          ]}
        >
          <Task {...tag}/>
          {rendertags(tag.id)}
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
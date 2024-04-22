import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { TagProps } from "../src/types/HabitTypes";
import Task from "./projects/Task";

// A helper function to generate a unique ID for new items
const generateID = () => Date.now().toString();

const initialTags = [
  { id: generateID(), text: "Example Tag 1", children: [] },
  // Add more tags with nested children as needed
];

export default function DynamicTagInput({ tags }: { tags: TagProps[]}) {
  const [localTags, setLocalTags] = useState<any>(initialTags);
  const inputsRef = useRef<any>({});

  const addTagAtIndex = (parentID: any, index: number) => {
    const newTag = {
      id: generateID(),
      text: "",
      children: [],
    };

    // Recursive function to find and update the parent tag to insert the new tag
    const insertNewTag = (tags: any, parentID: any, newTag: any) => {
      return tags.map((tag: any) => {
        if (tag.id === parentID) {
          const newChildren = [...tag.children];
          newChildren.splice(index + 1, 0, newTag); // Insert at the desired position
          return { ...tag, children: newChildren };
        } else if (tag.children.length > 0) {
          return {
            ...tag,
            children: insertNewTag(tag.children, parentID, newTag),
          };
        }
        return tag;
      });
    };

    const newTags = parentID
      ? insertNewTag(tags, parentID, newTag)
      : [...tags, newTag];
    setLocalTags(newTags);

    setTimeout(() => inputsRef.current[newTag.id]?.focus(), 100);
  };

  const updateTagText = (id: any, text: string) => {
    const updateText = (tags: any) => {
      return tags.map((tag: any) => {
        if (tag.id === id) {
          return { ...tag, text };
        } else if (tag.children.length > 0) {
          return { ...tag, children: updateText(tag.children) };
        }
        return tag;
      });
    };

    setLocalTags(updateText(tags));
  };

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

  const renderTagInput = ({ item, level = 0 }: any) => {
    return (
      <View style={{ marginLeft: level * 20 }}>
        <TextInput
          ref={(el) => (inputsRef.current[item.id] = el)}
          style={styles.input}
          value={item.text}
          onChangeText={(text) => updateTagText(item.id, text)}
          onSubmitEditing={() => addTagAtIndex(item.id, item.children.length)}
          blurOnSubmit={false}
          returnKeyType="next"
        />
        {/* {item && item.children && item.children.length > 0 && (
          <FlatList
            data={item.children}
            renderItem={({ item: childItem }) => renderTagInput({ item: childItem, level: level + 1 })}
            keyExtractor={(childItem) => childItem.id}
            // listKey={item.id}
          />
        )} */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => addTagAtIndex(null, tags.length)}
        style={styles.addButton}
      >
        <Text>Add Root Tag</Text>
      </TouchableOpacity>
      <View style={styles.container}>{rendertags(null)}</View>

      {/* <FlatList
        data={tags}
        renderItem={({ item }) => renderTagInput({ item })}
        keyExtractor={(item) => item.id}
        style={styles.list}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  list: {
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 16,
    marginVertical: 5,
  },
  addButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
  },
  headerSpacing: {
    marginTop: 20,
  },
  subtask: {
    marginLeft: 20,
  },
});

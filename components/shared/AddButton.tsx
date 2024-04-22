import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NewHabitProps } from "../../src/types/HabitTypes";
import { useHabitContext } from "../../src/contexts/habits/UseHabitContext";
import { useGroupContext } from "../../src/contexts/groups/UseGroupContext";
import { addHabit, addProject } from "../../src/api/SupabaseHabits";
import { addGroup } from "../../src/api/SupabaseGroups";
import AddModal from "./AddModal";

type AddButton = {
  type: string;
  sectionName?: string;
  groupId?: number;
  parentId?: number;
  depth?: number;
};

export default function AddButton({ sectionName, groupId, parentId, depth, type }: AddButton) {
  const [showModal, setShowModal] = useState(false);

  const { dispatch: habitDispatch } = useHabitContext();
  const { dispatch: groupDispatch } = useGroupContext();

  const habit = type === 'habit';
  const project = type === 'project';

  async function handleAddHabit(name: string): Promise<void> {
    if (sectionName && groupId) {
      const newHabit: NewHabitProps = {
        name: name,
        section: sectionName,
        group_id: groupId,
      };

      try {
        const createdHabit = await addHabit(newHabit);
        habitDispatch({ type: "ADD_HABIT", payload: createdHabit });
      } catch (error) {
        console.error("Failed to add habit:", error);
      }
    }
  }

  async function handleAddProject(name: string): Promise<void> {
    if (depth) {
      const newProject: any = {
        name: name,
        parentId: parentId,
        depth: depth + 1,
        section: "today",
      };

      try {
        const createdProject = await addProject(newProject);
        habitDispatch({ type: "ADD_HABIT", payload: createdProject });
      } catch (error) {
        console.error("Failed to add habit:", error);
      }
    }
  }


  async function handleAddGroup (name: string): Promise<void> {
    try {
      const createdGroup = await addGroup(name);
      groupDispatch({ type: "ADD_GROUP", payload: createdGroup });
    } catch (error) {
      console.error("Failed to add group:", error);
    }
  };

  const handleAction = habit ? handleAddHabit : project ? handleAddProject : handleAddGroup;

  function getProjectLevelName(depth: number): "List" | "Task" | "Subtask" {
    const newProjectDepth = depth + 1;
    switch (newProjectDepth) {
      case 1:
        return "List";
      case 2:
        return "Task";
      default:
        return "Subtask";
    }
  }

  const displayName = depth ? getProjectLevelName(depth) :  habit ? 'Habit' : 'Group'

  return (
    <View>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <MaterialCommunityIcons name="plus" size={24} color={"white"} />
      </TouchableOpacity>

      <AddModal visible={showModal} onClose={() => setShowModal(false)} onAdd={handleAction} displayName={displayName} />
    </View>
  );
}

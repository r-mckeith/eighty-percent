import addDays from 'date-fns/addDays';
import { toggleScope, addListTag, deleteTag, markTagAsComplete } from '../src/api/SupabaseTags';
import { TagProps } from '../src/types/TagTypes';

export const handleDeleteTag = async (id: number, dispatch: React.Dispatch<any>) => {
  try {
    await deleteTag(id);
    dispatch({ type: 'DELETE_TAG', id });
  } catch (error) {
    console.error('Failed to delete tag:', error);
  }
};

export const addTagToList = async (
  newTaskName: string,
  userId: string | null,
  parentId: number,
  depth: number,
  section: string,
  dispatch: React.Dispatch<any>
): Promise<boolean> => {

  if (!userId) {
    throw new Error("User's ID is not available.");
  }
  
  const newTag: any = {
    name: newTaskName,
    parentId: parentId,
    depth: depth + 1,
    user_id: userId,
    section: section
  };

  try {
    const createdTag = await addListTag(newTag);
    dispatch({ type: 'ADD_TAG', payload: createdTag });
    return true;
  } catch (error) {
    console.error('Failed to add tag:', error);
    return false;
  }
};

export const handleToggleCompleted = async (id: number, selectedDate: Date, dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'TOGGLE_COMPLETED', id: id, selectedDate: selectedDate });

  try {
    const updatedTask = await markTagAsComplete(id, selectedDate);
    
    if (updatedTask) {
    } else {
      console.error('Failed to toggle complete');
    }
  } catch (error) {
    console.error('Failed to toggle complete', error);
  }
};

export const handleToggleScope = async (id: any, selectedDate: any, dispatch: any) => {  
  dispatch({ type: 'TOGGLE_SCOPE', id: id, selectedDate: selectedDate });

  try {
    const updatedTask = await toggleScope(id, selectedDate);
    
    if (updatedTask) {
    } else {
      console.error('Failed to toggle scope for day');
    }
  } catch (error) {
    console.error('Failed to toggle scope for day:', error);
  }
};

export const findChildTags = (tagId: number, tags: TagProps[]): TagProps[] => {
  if (!tags) {
    console.error('Tasks is undefined!');
    return [];
  }

  const directChildren = tags.filter(tag => tag.parentId === tagId);
  let allChildren = [...directChildren];

  directChildren.forEach(child => {
    const grandchildren = findChildTags(child.id, tags);
    allChildren = [...allChildren, ...grandchildren];
  });

  return allChildren;
};

export const findParentTags = (taskId: number, tags: TagProps[]): TagProps[] => {
  const parentTask = tags.find(task => task.id === taskId);
  return parentTask && parentTask.parentId
    ? [...findParentTags(parentTask.parentId, tags), parentTask]
    : [];
};

const today = new Date
export const todayFormatted = today.toISOString().split('T')[0];
const tomorrow = addDays(new Date(), 1);
export const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

export function getTaskLevelName (depth: number): "List" | "Task" | "Subtask" {
  const newTaskDepth = depth+1;
  switch (newTaskDepth) {
    case 1: 
      return 'List';
    case 2:
      return 'Task';
    default:
      return 'Subtask';
  }
}
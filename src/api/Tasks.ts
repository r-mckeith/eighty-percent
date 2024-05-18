import { TaskProps, NewTaskProps } from '../types/HabitTypes';
import { supabase } from './Client';

export async function getTasks() {
  const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const tasks = data || [];

  return tasks;
}

export async function addTask(newTask: NewTaskProps): Promise<TaskProps> {
  let { data, error } = await supabase.from('tasks').insert([newTask]).select();

  if (error) {
    console.error(error);
    throw new Error('Failed to add task');
  }

  if (!data) {
    throw new Error('No data returned after insert operation');
  } else {
    return data[0];
  }
}

export async function editTask(taskId: number, updatedTask: NewTaskProps): Promise<TaskProps> {
  let { data, error } = await supabase.from('tasks').update([updatedTask]).eq('id', taskId).select();

  if (error) {
    console.error(error);
    throw new Error('Failed to update task');
  }

  if (!data) {
    throw new Error('No data returned after update operation');
  } else {
    return data[0];
  }
}

export async function deleteTask(taskId: number) {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId);

  if (error) {
    console.error(error);
  }
}

export async function toggleScope(taskId: number, selectedDate: string) {
  const { data, error } = await supabase.from('tasks').select('inScopeDay').eq('id', taskId).single();

  if (error || !data) {
    console.error('Failed to fetch task:', error);
    throw new Error('Failed to fetch task');
  }

  const newScopeDate = data.inScopeDay ? null : selectedDate;

  const { data: updateData, error: updateError } = await supabase
    .from('tasks')
    .update({ inScopeDay: newScopeDate })
    .eq('id', taskId)
    .select();

  if (updateError) {
    console.error('Failed to toggle scope:', updateError);
    throw new Error('Failed to update task');
  }

  if (!data) {
    throw new Error('No data returned after insert operation');
  } else {
    return updateData;
  }
}

export async function markTaskAsComplete(taskId: number, completionDate: Date) {
  const fetchResult = await supabase.from('tasks').select('completed').eq('id', taskId).single();

  if (fetchResult.error || !fetchResult.data) {
    console.error('Failed to fetch task:', fetchResult.error);
    throw new Error('Failed to fetch task');
  }

  const task = fetchResult.data;

  const newCompletionDate = task.completed ? null : completionDate;

  const data = await supabase.from('tasks').update({ completed: newCompletionDate }).eq('id', taskId);

  if (data.error) {
    console.error('Failed to mark task as complete/incomplete:', data.error);
    throw new Error('Failed to update task');
  }

  if (!data) {
    throw new Error('No data returned after insert operation');
  } else {
    return data;
  }
}

// to be used later to toggle/ complete children tags

// export const findChildTags = (tagId: number, tags: HabitProps[]): HabitProps[] => {
//   if (!tags) {
//     console.error('Tasks is undefined!');
//     return [];
//   }

//   const directChildren = tags.filter(tag => tag.parentId === tagId);
//   let allChildren = [...directChildren];

//   directChildren.forEach(child => {
//     const grandchildren = findChildTags(child.id, tags);
//     allChildren = [...allChildren, ...grandchildren];
//   });

//   return allChildren;
// };

// export const findParentTags = (taskId: number, tags: HabitProps[]): HabitProps[] => {
//   const parentTask = tags.find(task => task.id === taskId);
//   return parentTask && parentTask.parentId
//     ? [...findParentTags(parentTask.parentId, tags), parentTask]
//     : [];
// };

import { NewTask } from "../types/TaskTypes";
import { supabase } from "./SupabaseClient";
import { Task } from "../types/TaskTypes";

export const getTasks = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select('*')
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
  }
  return data || [];
};

export async function addTask(newTask: NewTask): Promise<Task> {
  console.log(newTask)
  let { data: taskData, error: taskError } = await supabase
    .from("tasks")
    .insert([newTask])
    .select();

  if (taskError) {
    console.error(taskError);
    throw new Error("Failed to add task");
  }

  if (!taskData) {
    throw new Error("No data returned after insert operation");
  } else {
    return taskData[0];
  }
}

export const deleteTask = async (taskId: number, tasks: Task[]) => {
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);

  if (error) {
    console.error(error);
  }
};

export const toggleCompleted = async (taskId: number, completionDate: Date) => {
  const fetchResult = await supabase
    .from("tasks")
    .select("completed")
    .eq("id", taskId)
    .single();

  if (fetchResult.error || !fetchResult.data) {
    console.error("Failed to fetch task:", fetchResult.error);
    throw new Error("Failed to fetch task");
  }

  const task = fetchResult.data;

  const newCompletionDate = task.completed ? null : completionDate;

  const data = await supabase
    .from("tasks")
    .update({ completed: newCompletionDate })
    .eq("id", taskId);

  if (data.error) {
    console.error("Failed to mark task as complete/incomplete:", data.error);
    throw new Error("Failed to update task");
  }

  if (!data) {
    throw new Error("No data returned after insert operation");
  } else {
    return data;
  }
};

export const toggleScope = async (taskId: number, selectedDate: string) => {
  const { data, error } = await supabase
    .from("tags")
    .select("inScopeDay")
    .eq("id", taskId)
    .single();

  if (error || !data) {
    console.error("Failed to fetch task:", error);
    throw new Error("Failed to fetch task");
  }

  const newScopeDate = data.inScopeDay ? null : selectedDate;

  const { data: updateData, error: updateError } = await supabase
    .from("tasks")
    .update({ inScopeDay: newScopeDate })
    .eq("id", taskId)
    .select();

  if (updateError) {
    console.error("Failed to toggle scope:", updateError);
    throw new Error("Failed to update task");
  }

  if (!data) {
    throw new Error("No data returned after insert operation");
  } else {
    return updateData;
  }
};

import { NewHabitProps, HabitProps, HabitDataProps } from "../types/HabitTypes";
import { supabase } from "./SupabaseClient";

export async function getHabits() {
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const habits = data || [];

  return habits;
}

export async function getHabitData(selectedDate: Date): Promise<HabitDataProps[]> {
  if (!selectedDate || !(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
    return [];
  }

  const endDate = new Date(selectedDate);
  const startDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate() - 365
  );

  const { data, error } = await supabase
    .from("tag_data")
    .select("created_at, tag_id, count, tag_name, date")
    .filter("date", "gte", startDate.toISOString().split("T")[0])
    .filter("date", "lte", endDate.toISOString().split("T")[0])
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data || [];
}

export async function addHabit(newHabit: NewHabitProps): Promise<HabitProps> {
  let { data: habitData, error: habitError } = await supabase
    .from("tags")
    .insert([newHabit])
    .select();

  if (habitError) {
    console.error(habitError);
    throw new Error("Failed to add habit");
  }

  if (!habitData) {
    throw new Error("No data returned after insert operation");
  } else {
    return habitData[0];
  }
}

export async function addProject(newProject: any): Promise<HabitProps> {
  let { data: habitData, error: habitError } = await supabase
    .from("tags")
    .insert([newProject])
    .select();

  if (habitError) {
    console.error(habitError);
    throw new Error("Failed to add task");
  }

  if (!habitData) {
    throw new Error("No data returned after insert operation");
  } else {
    return habitData[0];
  }
}

// export async function editTag (noteId: number, updatedFields: Partial<NewNote>) {
//   const { data, error } = await supabase
//     .from('notes')
//     .update(updatedFields)
//     .eq('id', noteId);

//   if (error) {
//     console.error(error);
//   }
// };

export async function deleteHabit(habitId: number) {
  const { data, error } = await supabase.from("tags").delete().eq("id", habitId);

  if (error) {
    console.error(error);
  }
}

export async function toggleScope(habitId: number, selectedDate: string) {
  const { data, error } = await supabase
    .from("tags")
    .select("inScopeDay")
    .eq("id", habitId)
    .single();

  if (error || !data) {
    console.error("Failed to fetch task:", error);
    throw new Error("Failed to fetch task");
  }

  const newScopeDate = data.inScopeDay ? null : selectedDate;

  const { data: updateData, error: updateError } = await supabase
    .from("tags")
    .update({ inScopeDay: newScopeDate })
    .eq("id", habitId)
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
}

export async function selectHabit(habit: HabitProps, selectedDate: any): Promise<HabitDataProps> {
  const dateFormatted = selectedDate.toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("tag_data")
    .select("*")
    .eq("tag_id", habit.id)
    .gte("date", dateFormatted)
    .lte("date", dateFormatted);

  if (error) {
    console.error(error);
    throw new Error("Failed to select habit data");
  }

  if (data && data.length > 0) {
    const currentCount = data[0].count;
    const updatedCount = currentCount + 1;

    const { data: updatedData, error: updateError } = await supabase
      .from("tag_data")
      .update({ count: updatedCount })
      .eq("id", data[0].id)
      .select();

    if (updateError) {
      console.error(updateError);
      throw new Error("Failed to update habit data count");
    }

    if (!updatedData) {
      throw new Error("Updated data is not available.");
    }

    return updatedData[0];
  } else {
    // Habit data doesn't exist, insert a new row
    const newData: Partial<HabitDataProps> = {
      tag_id: habit.id,
      count: 1,
      tag_name: habit.name,
      date: selectedDate,
    };

    const { data: insertedData, error: insertError } = await supabase
      .from("tag_data")
      .insert([newData])
      .select();

    if (insertError) {
      console.error(insertError);
      throw new Error("Failed to insert habit data");
    }

    return insertedData[0];
  }
}

export async function markHabitAsComplete(habitId: number, completionDate: Date) {
  const fetchResult = await supabase.from("tags").select("completed").eq("id", habitId).single();

  if (fetchResult.error || !fetchResult.data) {
    console.error("Failed to fetch habit:", fetchResult.error);
    throw new Error("Failed to fetch habit");
  }

  const habit = fetchResult.data;

  const newCompletionDate = habit.completed ? null : completionDate;

  const data = await supabase
    .from("tags")
    .update({ completed: newCompletionDate })
    .eq("id", habitId);

  if (data.error) {
    console.error("Failed to mark task as complete/incomplete:", data.error);
    throw new Error("Failed to update task");
  }

  if (!data) {
    throw new Error("No data returned after insert operation");
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

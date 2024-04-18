import {
  NewTagProps,
  TagProps,
  TagDataProps,
  DateRange,
} from "../types/TagTypes";
import { supabase } from "./SupabaseClient";

export const getTags = async () => {
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const tags = data || [];

  return tags;
};

export const getTagData = async (
  selectedDate: Date
): Promise<TagDataProps[]> => {
  if (!selectedDate || !(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
    console.log('Selected date is not valid:', selectedDate);
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
};

export async function addTag(newTag: NewTagProps): Promise<TagProps> {
  let { data: tagData, error: tagError } = await supabase
    .from("tags")
    .insert([newTag])
    .select();

  if (tagError) {
    console.error(tagError);
    throw new Error("Failed to add tag");
  }

  if (!tagData) {
    throw new Error("No data returned after insert operation");
  } else {
    return tagData[0];
  }
}

export async function addListTag(newTag: any): Promise<TagProps> {
  let { data: tagData, error: tagError } = await supabase
    .from("tags")
    .insert([newTag])
    .select();

  if (tagError) {
    console.error(tagError);
    throw new Error("Failed to add task");
  }

  if (!tagData) {
    throw new Error("No data returned after insert operation");
  } else {
    return tagData[0];
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

export async function deleteTag(tagId: number) {
  const { data, error } = await supabase.from("tags").delete().eq("id", tagId);

  if (error) {
    console.error(error);
  }
}

export const toggleScope = async (tagId: number, selectedDate: string) => {
  const { data, error } = await supabase
    .from("tags")
    .select("inScopeDay")
    .eq("id", tagId)
    .single();

  if (error || !data) {
    console.error("Failed to fetch task:", error);
    throw new Error("Failed to fetch task");
  }

  const newScopeDate = data.inScopeDay ? null : selectedDate;

  const { data: updateData, error: updateError } = await supabase
    .from("tags")
    .update({ inScopeDay: newScopeDate })
    .eq("id", tagId)
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

export async function selectTag(
  tag: TagProps,
  selectedDate: any
): Promise<TagDataProps> {
  const dateFormatted = selectedDate.toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("tag_data")
    .select("*")
    .eq("tag_id", tag.id)
    .gte("date", dateFormatted)
    .lte("date", dateFormatted);

  if (error) {
    console.error(error);
    throw new Error("Failed to select tag data");
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
      throw new Error("Failed to update tag data count");
    }

    if (!updatedData) {
      throw new Error("Updated data is not available.");
    }

    return updatedData[0];
  } else {
    // Tag data doesn't exist, insert a new row
    const newData: Partial<TagDataProps> = {
      tag_id: tag.id,
      count: 1,
      tag_name: tag.name,
      date: selectedDate,
    };

    const { data: insertedData, error: insertError } = await supabase
      .from("tag_data")
      .insert([newData])
      .select();

    if (insertError) {
      console.error(insertError);
      throw new Error("Failed to insert tag data");
    }

    return insertedData[0];
  }
}

export const markTagAsComplete = async (
  tagId: number,
  completionDate: Date
) => {
  const fetchResult = await supabase
    .from("tags")
    .select("completed")
    .eq("id", tagId)
    .single();

  if (fetchResult.error || !fetchResult.data) {
    console.error("Failed to fetch tag:", fetchResult.error);
    throw new Error("Failed to fetch tag");
  }

  const tag = fetchResult.data;

  const newCompletionDate = tag.completed ? null : completionDate;

  const data = await supabase
    .from("tags")
    .update({ completed: newCompletionDate })
    .eq("id", tagId);

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

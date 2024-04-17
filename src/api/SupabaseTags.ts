import { NewTagProps, TagProps, TagDataProps, DateRange } from '../types/TagTypes';
import { supabase } from './SupabaseClient'

export const getTags = async () => {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const tags = data || [];

  return tags;
};

export const getTagData = async (range: DateRange, selectedDate: Date) => {
  let startDate: string;
  let endDate: string;

  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();
  const dateSelected = selectedDate.getDate();

  switch (range) {
    case DateRange.Today:
      startDate = selectedDate.toISOString().split('T')[0];
      endDate = selectedDate.toISOString().split('T')[0];
      break;
    case DateRange.ThisWeek:
      const weekStartDay = selectedDate.getDay();
      const weekStart = new Date(selectedYear, selectedMonth, dateSelected - weekStartDay);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      startDate = weekStart.toISOString();
      endDate = weekEnd.toISOString();
      break;
    case DateRange.ThisMonth:
      startDate = new Date(selectedYear, selectedMonth, 1).toISOString();
      endDate = new Date(selectedYear, selectedMonth + 1, 0).toISOString();
      break;
    case DateRange.ThisYear:
      startDate = new Date(selectedYear, 0, 1).toISOString();
      endDate = new Date(selectedYear, 11, 31).toISOString();
      break;
  }

  const { data, error } = await supabase
    .from('tag_data')
    .select('created_at, tag_id, count')
    .filter('date', 'gte', startDate)
    .filter('date', 'lte', endDate)
    .order('created_at', { ascending: true })
    .select();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const tagData = data || [];

  return tagData;
};

export async function addTag(newTag: NewTagProps): Promise<TagProps> {
  let { data: tagData, error: tagError } = await supabase
    .from('tags')
    .insert([newTag])
    .select();

  if (tagError) {
    console.error(tagError);
    throw new Error('Failed to add tag');
  }

  if (!tagData) {
    throw new Error('No data returned after insert operation');
  } else {
    return tagData[0];
  }
}

export async function addListTag(newTag: any): Promise<TagProps> {
  let { data: tagData, error: tagError } = await supabase
    .from('tags')
    .insert([newTag])
    .select();

  if (tagError) {
    console.error(tagError);
    throw new Error('Failed to add task');
  }

  if (!tagData) {
    throw new Error('No data returned after insert operation');
  } else {
    return tagData[0];
  }
}

export async function deleteTag (tagId: number) {
  const { data, error } = await supabase
    .from('tags')
    .delete()
    .eq('id', tagId);

  if (error) {
    console.error(error);
  }
};

export async function selectTag(tag: TagProps, selectedDate: any): Promise<TagDataProps> {
  const dateFormatted = selectedDate.toISOString().split('T')[0];

  const { data, error } = await supabase
      .from('tag_data')
      .select('*')
      .eq('tag_id', tag.id)
      .gte('date', dateFormatted)
      .lte('date', dateFormatted);

  if (error) {
      console.error(error);
      throw new Error('Failed to select tag data');
  }

  if (data && data.length > 0) {
      const currentCount = data[0].count;
      const updatedCount = currentCount + 1;

      const { data: updatedData, error: updateError } = await supabase
          .from('tag_data')
          .update({ count: updatedCount })
          .eq('id', data[0].id)
          .select();

      if (updateError) {
          console.error(updateError);
          throw new Error('Failed to update tag data count');
      }

      if (!updatedData) {
          throw new Error('Updated data is not available.');
      }
      
      return updatedData[0];

  } else {
      // Tag data doesn't exist, insert a new row
      const newData: Partial<TagDataProps> = {
          tag_id: tag.id,
          count: 1,
          tag_name: tag.name,
          date: selectedDate
      };

      const { data: insertedData, error: insertError } = await supabase
          .from('tag_data')
          .insert([newData])
          .select();

      if (insertError) {
          console.error(insertError);
          throw new Error('Failed to insert tag data');
      }

      return insertedData[0];
  }
}



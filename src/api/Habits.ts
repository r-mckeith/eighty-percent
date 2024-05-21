import { NewHabitProps, HabitProps, HabitDataProps } from '../types/shared';
import { supabase } from './Client';

export async function getHabits() {
  const { data, error } = await supabase.from('tags').select('*').order('created_at', { ascending: true });

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
  const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 365);

  const { data, error } = await supabase
    .from('tag_data')
    .select('id, created_at, tag_id, count, tag_name, date')
    .filter('date', 'gte', startDate.toISOString().split('T')[0])
    .filter('date', 'lte', endDate.toISOString().split('T')[0])
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data || [];
}

export async function addHabit(newHabit: NewHabitProps): Promise<HabitProps> {
  let { data: habitData, error: habitError } = await supabase.from('tags').insert([newHabit]).select();

  if (habitError) {
    console.error(habitError);
    throw new Error('Failed to add habit');
  }

  if (!habitData) {
    throw new Error('No data returned after insert operation');
  } else {
    return habitData[0];
  }
}

export async function editHabit(habitId: number, newName: string): Promise<HabitProps> {
  let { data: habitData, error: habitError } = await supabase
    .from('tags')
    .update({ name: newName })
    .eq('id', habitId)
    .select();

  if (habitError) {
    console.error(habitError);
    throw new Error('Failed to update habit');
  }

  if (!habitData) {
    throw new Error('No data returned after update operation');
  } else {
    return habitData[0];
  }
}

export async function editHabitData(
  habit: HabitProps,
  selectedDate: Date,
  updatedCount: number
): Promise<HabitDataProps> {
  const dateFormatted = selectedDate.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('tag_data')
    .select('*')
    .eq('tag_id', habit.id)
    .gte('date', dateFormatted)
    .lte('date', dateFormatted);

  if (error) {
    console.error(error);
    throw new Error('Failed to select habit data');
  }

  if (data && data.length > 0) {
    const { data: updatedData, error: updateError } = await supabase
      .from('tag_data')
      .update({ count: updatedCount })
      .eq('id', data[0].id)
      .select();

    if (updateError) {
      console.error(updateError);
      throw new Error('Failed to update habit data count');
    }

    if (!updatedData) {
      throw new Error('Updated data is not available.');
    }

    return updatedData[0];
  } else {
    // Habit data doesn't exist, insert a new row
    const newData: Partial<HabitDataProps> = {
      tag_id: habit.id,
      count: updatedCount,
      tag_name: habit.name,
      date: selectedDate,
    };

    const { data: insertedData, error: insertError } = await supabase.from('tag_data').insert([newData]).select();

    if (insertError) {
      console.error(insertError);
      throw new Error('Failed to insert habit data');
    }

    return insertedData[0];
  }
}

export async function deleteHabit(habitId: number) {
  const { data, error } = await supabase.from('tags').delete().eq('id', habitId);

  if (error) {
    console.error(error);
  }
}

export async function selectHabit(habit: HabitProps, selectedDate: Date): Promise<HabitDataProps> {
  const dateFormatted = selectedDate.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('tag_data')
    .select('*')
    .eq('tag_id', habit.id)
    .gte('date', dateFormatted)
    .lte('date', dateFormatted);

  if (error) {
    console.error(error);
    throw new Error('Failed to select habit data');
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
      throw new Error('Failed to update habit data count');
    }

    if (!updatedData) {
      throw new Error('Updated data is not available.');
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

    const { data: insertedData, error: insertError } = await supabase.from('tag_data').insert([newData]).select();

    if (insertError) {
      console.error(insertError);
      throw new Error('Failed to insert habit data');
    }

    return insertedData[0];
  }
}

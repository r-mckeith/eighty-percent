import { PlanProps, NewPlanProps } from '../types';
import { supabase } from './Client';

export async function getPlans() {
  const { data, error } = await supabase.from('plans').select('*').order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const plans = data || [];

  return plans;
}

export async function addPlan(newPlan: NewPlanProps): Promise<PlanProps> {
  let { data, error } = await supabase.from('plans').insert([newPlan]).select();

  if (error) {
    console.error(error);
    throw new Error('Failed to add plan');
  }

  if (!data) {
    throw new Error('No data returned after insert operation');
  } else {
    return data[0];
  }
}

export async function updatePlan(planId: number, newName?: string, order?: number): Promise<PlanProps> {
  const { data, error } = await supabase.from('plans').select('*').eq('id', planId).single();

  if (error) {
    console.error('Error fetching plan:', error);
    throw new Error('Failed to fetch plan');
  }

  if (!data) {
    throw new Error('No plan found with the given ID');
  }

  const newPlan = {
    ...data,
    name: newName ? newName : data.name,
    order: order !== undefined ? order : data.order
  };

  const { data: updatedData, error: updateError } = await supabase.from('plans').update(newPlan).eq('id', planId).select();

  if (updateError) {
    console.error('Error updating plan:', updateError);
    throw new Error('Failed to update plan');
  }

  if (!updatedData || updatedData.length === 0) {
    throw new Error('No data returned after update operation');
  }

  return updatedData[0];
}

export async function deletePlan(planId: number) {
  const { error } = await supabase.from('plans').delete().eq('id', planId);

  if (error) {
    console.error(error);
  }
}

export async function toggleScope(planId: number, selectedDate: string) {
  const { data, error } = await supabase.from('plans').select('inScopeDay').eq('id', planId).single();

  if (error || !data) {
    console.error('Failed to fetch plan:', error);
    throw new Error('Failed to fetch plan');
  }

  const newScopeDate = data.inScopeDay ? null : selectedDate;

  const { data: updateData, error: updateError } = await supabase
    .from('plans')
    .update({ inScopeDay: newScopeDate })
    .eq('id', planId)
    .select();

  if (updateError) {
    console.error('Failed to toggle scope:', updateError);
    throw new Error('Failed to update plan');
  }

  if (!data) {
    throw new Error('No data returned after insert operation');
  } else {
    return updateData;
  }
}

export async function markPlanAsComplete(planId: number, completionDate: Date) {
  const fetchResult = await supabase.from('plans').select('completed').eq('id', planId).single();

  if (fetchResult.error || !fetchResult.data) {
    console.error('Failed to fetch plan:', fetchResult.error);
    throw new Error('Failed to fetch plan');
  }

  const plan = fetchResult.data;

  const newCompletionDate = plan.completed ? null : completionDate;

  const data = await supabase.from('plans').update({ completed: newCompletionDate }).eq('id', planId);

  if (data.error) {
    console.error('Failed to mark plan as complete/incomplete:', data.error);
    throw new Error('Failed to update plan');
  }

  if (!data) {
    throw new Error('No data returned after insert operation');
  } else {
    return data;
  }
}

// to be used later to toggle/ complete children plans

// export const findChildPlans = (planId: number, plans: PlanProps[]): PlanProps[] => {
//   if (!plans) {
//     console.error('Plan is undefined!');
//     return [];
//   }

//   const directChildren = plans.filter(plan => plan.parentId === planId);
//   let allChildren = [...directChildren];

//   directChildren.forEach(child => {
//     const grandchildren = findChildPlans(child.id, plans);
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

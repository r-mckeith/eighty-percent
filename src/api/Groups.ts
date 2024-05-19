import { GroupProps } from '../types/shared';
import { supabase } from './Client'

export async function getGroups () {
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const groups = data || [];

  return groups;
};

export async function addGroup(groupName: string): Promise<GroupProps> {
  let { data: groupData, error: groupError } = await supabase
    .from('groups')
    .insert({ name: groupName })
    .select();

  if (groupError) {
    console.error(groupError);
    throw new Error('Failed to add group');
  }

  if (!groupData) {
    throw new Error('No data returned after insert operation');
  } else {
    return groupData[0];
  }
}

export async function updateGroupName (groupId: number, updatedName: string) {
  const { data, error } = await supabase
    .from('groups')
    .update({ name: updatedName })
    .eq('id', groupId);

  if (error) {
    console.error(error);
  }
};
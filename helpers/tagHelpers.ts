import addDays from 'date-fns/addDays';
import { addListTag, deleteTag } from '../src/api/SupabaseTags';
import { TagProps } from '../src/types/TagTypes';

export const handleDeleteTag = async (id: number, dispatch: React.Dispatch<any>) => {
  try {
    await deleteTag(id);
    dispatch({ type: 'DELETE_TAG', id });
  } catch (error) {
    console.error('Failed to delete tag:', error);
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
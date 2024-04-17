import addDays from 'date-fns/addDays';
import { deleteTask, toggleCompleted, toggleScope, addTask } from '../src/api/SupabaseTasks';
import { Task } from '../src/types/TaskTypes';

export const handleDelete = async (id: number, tasks: Task[], dispatch: React.Dispatch<any>) => {
  try {
    await deleteTask(id, tasks);
    dispatch({ type: 'DELETE_TASK', id });
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
};

export const findChildTasks = (taskId: number, tasks: Task[]): Task[] => {
  if (!tasks) {
    console.error('Tasks is undefined!');
    return [];
  }

  const directChildren = tasks.filter(task => task.parentId === taskId);
  let allChildren = [...directChildren];

  directChildren.forEach(child => {
    const grandchildren = findChildTasks(child.id, tasks);
    allChildren = [...allChildren, ...grandchildren];
  });

  return allChildren;
};

export const findParentTasks = (taskId: number, tasks: Task[]): Task[] => {
  const parentTask = tasks.find(task => task.id === taskId);
  return parentTask && parentTask.parentId
    ? [...findParentTasks(parentTask.parentId, tasks), parentTask]
    : [];
};

export function isRouteNameInScope(routeName: string, scopeRoutes: string[]) {
  return scopeRoutes.includes(routeName);
}

const today = new Date
export const todayFormatted = today.toISOString().split('T')[0];
const tomorrow = addDays(new Date(), 1);
export const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
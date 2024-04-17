// Main Task Data
export interface TaskData {
  id: number;
  name?: string;
  parentId?: number | null;
  completed?: Date | null;
  depth: number;
  inScopeDay: string | null;
}

// For New Task
export interface NewTask {
  name: string;
  parentId: number;
  depth: number;
  user_id: string;
}

// Complete Task Interface
export interface Task extends NewTask {
  id: number;
  created_at: string;
  completed: string | null;
  inScopeDay: string | null;
}
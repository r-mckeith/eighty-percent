export interface AddTaskProps {
  parentId: number;
  depth: number;
  currentTab?: string;
}

export interface NewTask extends AddTaskProps {
  name: string;
  recurringOptions?: {
    isRecurring?: boolean | null;
    selectedDays?: string | null;
    timesPerDay?: string | null;
  };
  inScopeDay?: boolean | null;
  inScopeWeek?: boolean | null;
}

export interface TaskProps extends NewTask {
  id: number;
  completed?: boolean;
  inScopeDay?: boolean;
  inScopeWeek?: boolean;
  onAddSubTask?: (name: string, parentId: number, recurringOptions: {isRecurring: boolean, selectedDays: string, timesPerDay: string}) => void;
  onAddNote?: (id: number, text: string, taskIdId: number) => void;
}

export interface TaskDataInterface {
  id: number;
  name?: string;
  parentId?: number | null;
  completed?: boolean;
  recurringOptions?: {
    isRecurring?: boolean | null;
    selectedDays?: string | null;
    timesPerDay?: string | null;
  };
  depth: number;
  inScopeDay?: boolean | null;
  inScopeWeek?: boolean | null;
  onAddTask?: (name: string, parentId: number, recurringOptions: {isRecurring: boolean, selectedDays: string, timesPerDay: string}) => void;
  onAddNote?: (id: number, text: string, taskIdId: number) => void;
}

export interface TaskInterface extends TaskDataInterface {
  planningScreen?: boolean;
  onPress?: () => void;
  currentTab?: string;
  parentId: number;
  onToggleCompleted?: (id: number) => void;
  onToggleDay?: (id: number) => void;
  onToggleWeek?: (id: number) => void;
  onDelete?: (id: number) => void;
  subTasks?: any;
}
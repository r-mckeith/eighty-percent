export type NewHabitProps = {
  name: string;
  section: string;
  group_id: number;
};

export type HabitDataProps = {
  id: number;
  created_at: Date;
  tag_id: number;
  count: number;
  tag_name: string;
  date: Date;
};

export type HabitProps = {
  id: number;
  name: string;
  section: string;
  group_id: number;
  user_id: number;
  tag_data: HabitDataProps[];
  inScopeDay?: string | null;
  completed?: string | null;
  depth?: number;
  parentId?: number;
};

export type TaskProps = {
  id: number;
  name: string;
  user_id: number;
  inScopeDay?: string | null;
  completed?: string | null;
  depth?: number;
  parentId?: number;
};

export type NewTaskProps = {
  name: string;
  parentId?: number;
  depth?: number;
};

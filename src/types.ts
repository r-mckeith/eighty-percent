export type NewHabitProps = {
  name: string;
  section: string;
  group_id: number;
  target?: { times: number; timeframe: string | null };
};

export type HabitDataProps = {
  id: number;
  created_at: Date;
  tag_id: number;
  count: number;
  tag_name: string;
  date: string;
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
  parentId?: number;
  target?: { times: number; timeframe: string } | null;
};

export type TaskProps = {
  id: number;
  name: string;
  user_id: number;
  inScopeDay?: string | null;
  completed?: string | null;
  parentId?: number;
};

export type NewTaskProps = {
  name: string;
  parentId?: number;
};

export type PlanProps = {
  id: number;
  name: string;
  user_id: number;
  inScopeDay?: string | null;
  completed?: string | null;
  parentId?: number;
  order: number;
};

export type NewPlanProps = {
  name: string;
  parentId?: number;
};

export type GroupProps = {
  id: number;
  user_id: number;
  name: string;
};

export type ReviewProps = any;

export type DailyReviewProps = any;

export type NoteProps = any;

export type NewNoteProps = any;

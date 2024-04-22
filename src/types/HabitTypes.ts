export interface Tag extends NewHabitProps {
  id: number;
  user_id: number;
  tag_data: HabitDataProps[]; 
};

export type NewHabitProps = {
  name: string;
  section: string;
  group_id: number
}

export type HabitDataProps = {
  created_at: Date;
  tag_id: number;
  count: number;
  tag_name: string;
  date: Date;
}

export enum DateRange {
  Today,
  ThisWeek,
  ThisMonth,
  ThisYear
}

export interface HabitProps extends NewHabitProps {
  id: number;
  user_id: number;
  tag_data: HabitDataProps[];
  inScopeDay?: string | null;
  completed?: string | null;
  depth?: number;
  parentId?: number; 
};
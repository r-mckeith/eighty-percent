import { HabitDataProps } from "../types/HabitTypes";

export type Action =
  | { type: "INITIALIZE_HABIT_DATA"; payload: HabitDataProps[] }
  | { type: "ADD_TAG_DATA"; payload: HabitDataProps }
  | { type: "UPDATE_HABIT_DATA"; payload: HabitDataProps };

export const habitDataReducer = (state: HabitDataProps[], action: Action): HabitDataProps[] => {
  switch (action.type) {
    case "INITIALIZE_HABIT_DATA":
      return action.payload;
    case "ADD_TAG_DATA":
    case "UPDATE_HABIT_DATA":
      const existingIndex = state.findIndex((item) => item.tag_id === action.payload.tag_id);
      if (existingIndex >= 0) {
        const updatedState = [...state];
        updatedState[existingIndex] = { ...state[existingIndex], ...action.payload };
        return updatedState;
      } else {
        // Add new tag data
        return [...state, action.payload];
      }
    default:
      return state;
  }
};

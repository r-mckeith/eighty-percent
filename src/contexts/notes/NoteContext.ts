import React from 'react';
import { Action } from '../../reducers/NoteReducer';
import { NoteProps } from '../../types/shared';

export interface NoteContextType {
  notes: NoteProps[];
  dispatch: React.Dispatch<Action>;
}

export const NoteContext = React.createContext<NoteContextType | undefined>(undefined);

import React from 'react';
import { Action } from '../../reducers/GroupReducer';
import { GroupProps } from '../../types/shared';

export interface GroupContextType {
  groups: GroupProps[];
  dispatch: React.Dispatch<Action>;
}

export const GroupContext = React.createContext<GroupContextType | undefined>(undefined);

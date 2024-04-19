import React, { useEffect, useReducer, ReactNode } from 'react';
import { getGroups } from '../../api/SupabaseGroups';
import { GroupContext } from './GroupContext';
import { groupReducer } from '../../reducers/GroupReducer';

interface GroupContextProviderProps {
  children: ReactNode;
}

const GroupContextProvider = ({ children }: GroupContextProviderProps) => {
  const [groups, dispatch] = useReducer(groupReducer, []);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const fetchedGroups = await getGroups();
        if (fetchedGroups.length > 0) {
          dispatch({ type: 'INITIALIZE_GROUPS', payload: fetchedGroups });
        } else {
          setTimeout(fetchGroups, 5000);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
        setTimeout(fetchGroups, 5000);
      }
    };

    fetchGroups();
  }, []);

  return (
    <GroupContext.Provider value={{ groups, dispatch }}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContextProvider;

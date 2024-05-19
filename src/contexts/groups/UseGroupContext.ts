import { useContext } from 'react';
import { GroupContext } from './GroupContext';

export const useGroupContext = () => {
  const context = useContext(GroupContext);

  if (!context) {
    throw new Error('useGroupContext must be used within a GroupContextProvider');
  }

  return context;
};

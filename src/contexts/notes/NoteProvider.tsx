import React, { useEffect, useReducer, ReactNode } from 'react';
import { getNotes } from '../../api/Notes';
import { NoteContext } from './NoteContext';
import { noteReducer } from '../../reducers/NoteReducer';

interface NoteContextProviderProps {
  children: ReactNode;
}

const NoteContextProvider = ({ children }: NoteContextProviderProps) => {
  const [notes, dispatch] = useReducer(noteReducer, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await getNotes();
        if (fetchedNotes.length > 0) {
          dispatch({ type: 'INITIALIZE_NOTES', payload: fetchedNotes });
        } else {
          setTimeout(fetchNotes, 5000);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
        setTimeout(fetchNotes, 5000);
      }
    };

    fetchNotes();
  }, []);

  return <NoteContext.Provider value={{ notes, dispatch }}>{children}</NoteContext.Provider>;
}

export default NoteContextProvider;

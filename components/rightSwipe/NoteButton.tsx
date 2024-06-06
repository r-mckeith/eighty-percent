import React, { useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { addNote } from '../../src/api/Notes';
import { useDateContext, useNoteContext } from '../../src/contexts';
import { NoteProps } from '../../src/types';
import { AddModal } from '../shared';
import RightSwipeButton from './RightSwipeButton';
import { View } from 'react-native';

type NoteButton = {
  type: string;
  itemId: number;
  swipeableRow: React.RefObject<Swipeable | null>;
};

export default function NoteButton({ type, itemId, swipeableRow }: NoteButton) {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const { dispatch } = useNoteContext();
  const { selectedDate } = useDateContext();

  function handleClose() {
    swipeableRow.current?.close();
    setShowAddModal(false);
  }

  async function handleAddNote(note: string) {
    swipeableRow.current?.close();
    const newNote: NoteProps = {
      note: note,
      type: type,
      itemId: itemId,
      date: selectedDate.toISOString().split('T')[0],
    };
    try {
      await addNote(newNote);
      dispatch({ type: 'ADD_NOTE', payload: newNote });
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  }

  return (
    <View>
      <RightSwipeButton icon='book' backgroundColor='blue' text='Note' onPress={() => setShowAddModal(true)}/>

      <AddModal visible={showAddModal} onClose={handleClose} onSave={handleAddNote} displayName='Note' />
    </View>
  );
}

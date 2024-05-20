import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { addNote } from '../../src/api/Notes';
import { useDateContext, useNoteContext } from '../../src/contexts';
import { NoteProps } from '../../src/types/shared';
import { AddModal } from '../shared';
import { Icon } from '../shared';

type Note = {
  type: string;
  itemId: number;
  swipeableRow: React.RefObject<Swipeable | null>;
};

export default function Note({ type, itemId, swipeableRow }: Note) {
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
    <>
      <Icon
        name='book'
        size={24}
        color='white'
        opacity={0.2}
        opacityStyle={[styles.rightSwipeItem, styles.editButton]}
        onPress={() => setShowAddModal(true)}
      />

      <AddModal visible={showAddModal} onClose={handleClose} onSave={handleAddNote} displayName='Note' />
    </>
  );
}

const styles = StyleSheet.create({
  rightSwipeItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    paddingVertical: 12,
  },
  editButton: {
    backgroundColor: 'green',
  },
});

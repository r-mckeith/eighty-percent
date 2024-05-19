import React, { useState } from 'react';
import TextInput from '../shared/TextInput';
import Modal from './Modal';

type AddModal = {
  visible: boolean;
  displayName: string;
  onClose: () => void;
  onAdd: (name: string) => void;
};

export default function AddModal({ visible, displayName, onClose, onAdd }: AddModal) {
  const [newName, setNewName] = useState('');

  function handleSave() {
    if (newName) {
      onAdd(newName);
      setNewName('');
      onClose();
    }
  }

  function handleCancel() {
    setNewName('');
    onClose();
  }

  const disabled = newName === '';

  return (
    <Modal
      placeholder={`New ${displayName}`}
      visible={visible}
      onClose={handleCancel}
      onSave={handleSave}
      disabled={disabled}>
      <TextInput placeholder={displayName} value={newName} handleChangeText={setNewName} autoFocus={true} />
    </Modal>
  );
}

import React, { useState } from 'react';
import TextInput from './TextInput';
import Modal from './Modal';

type EditModal = {
  visible: boolean;
  id: number;
  name: string;
  onClose: () => void;
  onSave: (id: number, name: string) => void;
};

export default function EditModal({ visible, id, name, onClose, onSave }: EditModal) {
  const [newName, setNewName] = useState(name);

  function handleSave() {
    if (newName) {
      onSave(id, newName);
      setNewName(name);
      onClose();
    }
  }

  function handleCancel() {
    setNewName(name);
    onClose();
  }

  const disabled = newName === name;

  return (
    <Modal
      placeholder={`Edit ${name}`}
      visible={visible}
      onClose={handleCancel}
      onSave={handleSave}
      disabled={disabled}>
      <TextInput placeholder={name} value={newName} handleChangeText={setNewName} autoFocus={true} />
    </Modal>
  );
}

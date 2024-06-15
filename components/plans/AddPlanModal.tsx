import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { TextInput } from 'react-native-paper';
import { getColors } from '../../src/colors';
import { Modal } from '../shared';

type AddPlanModal = {
  order: number;
  visible: boolean;
  onClose: () => void;
  onSave: (name: string, order: number) => void;
};

export default function AddPlanModal({ order, visible, onClose, onSave }: AddPlanModal) {
  const [name, setName] = useState('');

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  function handleSave() {
    if (name) {
      setName('');
      onClose();
      onSave(name, order);
    }
  }

  function handleCancel() {
    setName('');
    onClose();
  }

  const disabled = name === '';

  return (
    <Modal visible={visible} onClose={handleCancel} onSave={handleSave} disabled={disabled}>
      <TextInput
        style={colors.background}
        label='New plan'
        activeUnderlineColor={colors.text.color}
        value={name}
        mode='flat'
        dense={true}
        onChangeText={setName}
        autoFocus={true}
        onSubmitEditing={handleSave}
        returnKeyType='done'
      />
    </Modal>
  );
}

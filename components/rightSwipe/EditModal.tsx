import React, { useState } from 'react';
import { TextInput, Modal, TargetSelector, Toggle } from '../shared';
import { HabitProps, PlanProps } from '../../src/types/shared';

type EditModal = {
  visible: boolean;
  item: HabitProps | PlanProps;
  type: string;
  target: { times: number; timeframe: string } | null;
  onClose: () => void;
  onSave: (id: number, newName: string, target: { times: number; timeframe: string } | null) => void;
};

export default function EditModal({ visible, item, type, target, onClose, onSave }: EditModal) {
  const [newName, setNewName] = useState(item.name);
  const [hasTarget, setHasTarget] = useState(!!target);
  const [times, setTimes] = useState(target?.times ? target.times : 1);
  const [timeframe, setTimeframe] = useState(target?.timeframe ? target.timeframe : 'day');

  function handleSave() {
    if (newName) {
      const target = hasTarget ? { times, timeframe } : null;
      onSave(item.id, newName, target);
      setNewName(item.name);
      onClose();
    }
  }

  function handleCancel() {
    setNewName(item.name);
    onClose();
  }

  const disabled =
    newName === item.name &&
    ((target && target.times === times && target.timeframe === timeframe) || (!target && !hasTarget));
  return (
    <Modal
      placeholder={`Edit ${item.name}`}
      visible={visible}
      onClose={handleCancel}
      onSave={handleSave}
      disabled={disabled}>
      {type === 'habit' && (
        <Toggle onToggle={setHasTarget} value={hasTarget} label={'Set target'} style={{ justifyContent: 'flex-end' }} />
      )}
      <TextInput
        placeholder={item.name}
        value={newName}
        handleChangeText={setNewName}
        autoFocus={true}
        onSave={handleSave}
      />
      {hasTarget && (
        <TargetSelector times={times} timeframe={timeframe} setTimes={setTimes} setTimeframe={setTimeframe} />
      )}
    </Modal>
  );
}

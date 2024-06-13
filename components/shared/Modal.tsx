import React from 'react';
import { View, useColorScheme } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import { Scroll } from '../shared';
import { getColors } from '../../src/colors';

type Modal = {
  children: any;
  placeholder?: string;
  visible: boolean;
  disabled: boolean;
  stickyIndices?: number[];
  onClose: () => void;
  onSave: () => void;
};

export default function SmallModal({ children, visible, disabled, stickyIndices, onClose, onSave }: Modal) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const containerStyle = [colors.background, {minHeight: 350}];

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={containerStyle}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
            <Button onPress={onClose} textColor='red' style={{paddingLeft: 10}}>
              Cancel
            </Button>
            <Button onPress={onSave} disabled={disabled} textColor='blue' style={{paddingRight: 10}}>
              Done
            </Button>
          </View>
          <Scroll stickyIndices={stickyIndices}>{children}</Scroll>
      </Modal>
    </Portal>
  );
}

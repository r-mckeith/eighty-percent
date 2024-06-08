import React from 'react';
import { View, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
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

  const containerStyle = [colors.background, { padding: 20 }];

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={containerStyle}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Button onPress={onClose} textColor='red'>
              Cancel
            </Button>
            <Button onPress={onSave} disabled={disabled} textColor='blue'>
              Done
            </Button>
          </View>
          <Scroll stickyIndices={stickyIndices}>{children}</Scroll>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
}

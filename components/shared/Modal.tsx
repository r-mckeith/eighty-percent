import React from 'react';
import { View, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modal, Portal, Button } from 'react-native-paper';
import { getColors } from '../../src/colors';

type Modal = {
  children: any;
  placeholder?: string;
  visible: boolean;
  size?: string;
  disabled: boolean;
  onClose: () => void;
  onSave: () => void;
};

export default function SmallModal({ children, visible, disabled, onClose, onSave }: Modal) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const containerStyle = [colors.background, { padding: 20 }];

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={containerStyle}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true} stickyHeaderIndices={[1]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Button onPress={onClose} textColor='red'>
                Cancel
              </Button>
              <Button onPress={onSave} disabled={disabled} textColor='blue'>
                Done
              </Button>
            </View>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
}

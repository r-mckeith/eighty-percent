import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, KeyboardAvoidingView, Platform, View, useColorScheme } from 'react-native';
import ModalHeader from './ModalHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { getColors } from '../../src/colors';

type SmallModal = {
  children: any;
  placeholder: string;
  visible: boolean;
  size?: string;
  disabled: boolean;
  onClose: () => void;
  onSave: () => void;
};

export default function SmallModal({ children, placeholder, visible, size, disabled, onClose, onSave }: SmallModal) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const modalSize = size === 'large' ? styles.large : styles.small;

  return (
    <Modal animationType='slide' transparent={true} visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 0}>
        <View style={[styles.modalView, modalSize, colors.modal, colors.shadow]}>
          <ModalHeader placeholder={placeholder} onSave={onSave} onClose={onClose} disabled={disabled} />

          <ScrollView style={{ width: '100%', marginTop: 30 }} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  small: {
    width: '100%',
    height: '60%',
    position: 'absolute',
  },
  large: {
    width: '100%',
    height: '100%',
  },
  largeScroll: {
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

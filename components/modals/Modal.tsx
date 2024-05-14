import React from "react";
import { Modal, StyleSheet, KeyboardAvoidingView, Platform, View } from "react-native";
import ModalHeader from "./ModalHeader";
import { ScrollView } from "react-native-gesture-handler";

type SmallModal = {
  children: any;
  placeholder: string;
  visible: boolean;
  size?: string;
  disabled: boolean;
  onClose: () => void;
  onSave: () => void;
};

export default function SmallModal({
  children,
  placeholder,
  visible,
  size,
  disabled,
  onClose,
  onSave,
}: SmallModal) {
  const modalSize = size === "large" ? styles.large : styles.small;

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={[styles.modalView, modalSize]}>
          <ModalHeader placeholder={placeholder} onSave={onSave} onClose={onClose} disabled={disabled} />

          <ScrollView style={{ width: "100%", marginTop: 30 }}>{children}</ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    marginHorizontal: 20,
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  small: {
    width: "80%",
  },
  large: {
    width: "100%",
    height: "100%",
  },
  largeScroll: {
    width: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});

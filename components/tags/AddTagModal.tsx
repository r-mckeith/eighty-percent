import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type AddTagModalProps = {
  visible: boolean;
  sectionName: string;
  onClose: () => void;
  onAddTag: (name: string, section: string) => void;
};

export default function AddTagModal({
  visible,
  sectionName,
  onClose,
  onAddTag,
}: AddTagModalProps) {
  const [newTagName, setNewTagName] = useState("");

  const handleAddTag = () => {
    if (newTagName) {
      onAddTag(newTagName, sectionName);
      setNewTagName("");
      onClose();
    }
  };

  function handlePressCancel() {
    setNewTagName('')
    onClose()
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={[styles.modalButton, styles.leftButton]}
              onPress={handlePressCancel}
            >
              <Text style={[styles.buttonText, { color: "red" }]}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[styles.buttonText, { color: "white" }]}>New Habit</Text>
            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.rightButton,
                newTagName ? {} : styles.disabledButton,
              ]}
              onPress={handleAddTag}
              disabled={!newTagName}
            >
              <Text
                style={[
                  styles.buttonText,
                  newTagName ? { color: "blue" } : { color: "grey" },
                ]}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Habit..."
            placeholderTextColor="white"
            value={newTagName}
            onChangeText={setNewTagName}
            autoFocus={true}
            returnKeyType="done"
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  modalView: {
    marginHorizontal: 20,
    width: "90%",
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
  modalHeader: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  modalButton: {
    padding: 10,
  },
  leftButton: {
    alignSelf: "flex-start",
  },
  rightButton: {
    alignSelf: "flex-end",
    marginRight: -70,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: "bold",
  },
  textInput: {
    marginTop: 30,
    alignSelf: "stretch",
    height: 40,
    color: "white",
    borderBottomWidth: 1,
    borderColor: "#bbb",
    paddingHorizontal: 0,
    paddingVertical: 10,
    width: "100%",
  },
});

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { CANCEL_BUTTON, CIRCLE_CHECK_BUTTON } from '../../src/utils/colors';

// type AddTagModalProps = {
//   visible: boolean;
//   sectionName: string;
//   onClose: () => void;
//   onAddTag: (name: string, section: string) => void;
// }

// export default function AddTagModal ({ visible, sectionName, onClose, onAddTag }: AddTagModalProps) {
//   const [newTagName, setNewTagName] = useState('');

//   const handleAddTag = () => {
//     if (newTagName) {
//       onAddTag(newTagName, sectionName);
//       setNewTagName('');
//       onClose();
//     }
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.centeredView}>
//         <View style={styles.modalView}>
//           <Text style={styles.modalText}>New tag</Text>
//           <TextInput
//             style={[styles.textInput, styles.input, { marginBottom: 10 }]}
//             placeholder={'Tag name...'}
//             value={newTagName}
//             onChangeText={setNewTagName}
//             autoFocus={true}
//             onSubmitEditing={handleAddTag}
//             returnKeyType="done"
//           />
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={styles.iconButton}
//               onPress={handleAddTag}
//             >
//               <MaterialCommunityIcons name="check-circle-outline" size={24} color={CIRCLE_CHECK_BUTTON} />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.iconButton} onPress={onClose}>
//               <MaterialCommunityIcons name="cancel" size={24} color={CANCEL_BUTTON} />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//   },
//   modalView: {
//     margin: 20,
//     width: '90%',
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   input: {
//     height: 40,
//     borderWidth: 0,
//     borderBottomWidth: 1,
//     borderColor: '#bbb',
//     marginBottom: 10,
//     paddingHorizontal: 0,
//     paddingVertical: 10,
//   },
//   textInput: {
//     width: '100%',
//   },
//   switchRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 10,
//   },
//   iconButton: {
//     padding: 10,
//   },
// });

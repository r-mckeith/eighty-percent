import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type EditModal = {
  visible: boolean;
  placeholder: string;
  habitData: any,
  onClose: () => void;
  onSave: (value: number) => void;
};

export default function DataEditModal({
  visible,
  placeholder,
  habitData,
  onClose,
  onSave,
}: EditModal) {
  const [currentValue, setCurrentValue] = useState<number>(habitData);

  function incrementValue() {
    setCurrentValue(currentValue + 1);
  }

  function decrementValue() {
    setCurrentValue(currentValue - 1);
  }

  function handleSave() {
    onSave(currentValue);
    onClose();
  }

  function handleCancel() {
    setCurrentValue(habitData);
    onClose();
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={[styles.modalButton, styles.leftButton]}
              onPress={handleCancel}
            >
              <Text style={[styles.buttonText, { color: "red" }]}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[styles.buttonText, { color: "white" }]}>{placeholder}</Text>
            <TouchableOpacity 
              style={[styles.modalButton, styles.rightButton]}
              onPress={handleSave}>
              <Text style={[styles.buttonText, { color: "blue" }]}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.numberInputContainer}>
            <TouchableOpacity onPress={decrementValue} style={styles.controlButton}>
              <Text style={styles.controlButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.numberDisplay}>{currentValue}</Text>
            <TouchableOpacity onPress={incrementValue} style={styles.controlButton}>
              <Text style={styles.controlButtonText}>+</Text>
            </TouchableOpacity>
          </View>
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
  buttonText: {
    fontWeight: "bold",
  },
  numberInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  numberDisplay: {
    fontSize: 24,
    color: "white",
    marginHorizontal: 20,
  },
  controlButton: {
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 5,
  },
  controlButtonText: {
    color: "white",
    fontSize: 24,
  },
});

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Modal,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";

// type EditModal = {
//   visible: boolean;
//   placeholder: string;
//   id: number;
//   name: string;
//   onClose: () => void;
//   onSave: (id: number, name: string) => void;
// };

// export default function DataEditModal({ visible, placeholder, id, name, onClose, onSave }: EditModal) {
//   const [newName, setNewName] = useState(name);

//   function handleEdit() {
//     if (newName) {
//       onSave(id, newName);
//       setNewName(name);
//       onClose();
//     }
//   }

//   function handlePressCancel() {
//     setNewName(name);
//     onClose();
//   }

//   return (
//     <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
//       <KeyboardAvoidingView
//         style={styles.centeredView}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         <View style={styles.modalView}>
//           <View style={styles.modalHeader}>
//             <TouchableOpacity
//               style={[styles.modalButton, styles.leftButton]}
//               onPress={handlePressCancel}
//             >
//               <Text style={[styles.buttonText, { color: "red" }]}>Cancel</Text>
//             </TouchableOpacity>
//             <Text style={[styles.buttonText, { color: "white" }]}>{placeholder}</Text>
//             <TouchableOpacity
//               style={[
//                 styles.modalButton,
//                 styles.rightButton,
//                 newName === name ? styles.disabledButton : {},
//               ]}
//               onPress={handleEdit}
//               disabled={newName === name}
//             >
//               <Text
//                 style={[styles.buttonText, newName === name ? { color: "grey" } : { color: "blue" }]}
//               >
//                 Done
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <TextInput
//             style={styles.textInput}
//             placeholder={name}
//             placeholderTextColor="white"
//             value={newName}
//             onChangeText={setNewName}
//             autoFocus={true}
//             returnKeyType="done"
//           />
//         </View>
//       </KeyboardAvoidingView>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 50,
//   },
//   modalView: {
//     marginHorizontal: 20,
//     width: "90%",
//     backgroundColor: "#000",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "white",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     position: "relative",
//   },
//   modalHeader: {
//     position: "absolute",
//     top: 10,
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     paddingHorizontal: 10,
//   },
//   modalButton: {
//     padding: 10,
//   },
//   leftButton: {
//     alignSelf: "flex-start",
//   },
//   rightButton: {
//     alignSelf: "flex-end",
//     marginRight: -70,
//   },
//   disabledButton: {
//     opacity: 0.5,
//   },
//   buttonText: {
//     fontWeight: "bold",
//   },
//   textInput: {
//     marginTop: 30,
//     alignSelf: "stretch",
//     height: 40,
//     color: "white",
//     borderBottomWidth: 1,
//     borderColor: "#bbb",
//     paddingHorizontal: 0,
//     paddingVertical: 10,
//     width: "100%",
//   },
// });
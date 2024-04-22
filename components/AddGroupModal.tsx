import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addGroup } from '../src/api/SupabaseGroups';
import { useGroupContext } from '../src/contexts/groups/UseGroupContext';

type AddGroupModalProps = {
  visible: boolean;
  onClose: () => void;
}

export default function AddGroupModal ({ visible, onClose }: AddGroupModalProps) {
  const [newGroupName, setNewGroupName] = useState('');

  const { dispatch } = useGroupContext();

  const handleAddGroup = async (): Promise<void> => {
    try {
      const createdGroup = await addGroup(newGroupName);
      dispatch({ type: "ADD_GROUP", payload: createdGroup });
    } catch (error) {
      console.error("Failed to add group:", error);
    }

    setNewGroupName('');
    onClose();
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>New group</Text>
          <TextInput
            style={[styles.textInput, styles.input, { marginBottom: 10 }]}
            placeholder={'Group name...'}
            value={newGroupName}
            onChangeText={setNewGroupName}
            autoFocus={true}
            onSubmitEditing={handleAddGroup}
            returnKeyType="done"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={handleAddGroup}
            >
              <MaterialCommunityIcons name="check-circle-outline" size={24} color={'#4CAF50'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={onClose}>
              <MaterialCommunityIcons name="cancel" size={24} color={'#F44336'} /> 
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#bbb',
    marginBottom: 10,
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  textInput: {
    width: '100%',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconButton: {
    padding: 10,
  },
});

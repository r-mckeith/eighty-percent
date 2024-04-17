import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useGroupContext } from "../../src/contexts/groups/UseGroupContext";
import { updateGroupName } from "../../src/api/SupabaseGroups";

type AddTag = {
  sectionName: string;
  groupId: number;
  setIsEditMode: (arg0: boolean) => void;
};

export default function AddTag({ sectionName, groupId, setIsEditMode }: AddTag) {
  const [newGroupName, setNewGroupName] = useState("");

  const { dispatch: groupDispatch } = useGroupContext();

  if (sectionName === "today") return;

  function handleUpdateGroupName() {
    if (newGroupName) {
      groupDispatch({ type: "UPDATE_GROUP_NAME", id: groupId, name: newGroupName })
      updateGroupName(groupId, newGroupName);
      setIsEditMode(false);
    }
  }

  return (
    <View style={styles.sectionHeader}>
      <TextInput
        style={[styles.textInput, styles.input]}
        placeholder={`${sectionName}...`}
        value={newGroupName}
        onChangeText={setNewGroupName}
        autoFocus={true}
        onSubmitEditing={handleUpdateGroupName}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleUpdateGroupName}
      >
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={24}
          color={"green"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 20,
    borderBottomWidth: 2,
    borderColor: "#888",
  },
  textInput: {
    paddingHorizontal: 0,
  },
  iconButton: {
    paddingTop: 20,
    paddingLeft: 10,
    marginRight: 70,
  },
});

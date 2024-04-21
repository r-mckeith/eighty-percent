import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NewTagProps } from "../../src/types/TagTypes";
import { useTagContext } from "../../src/contexts/tags/UseTagContext";
import { addTag } from "../../src/api/SupabaseTags";
import AddTagModal from "./AddTagModal";

type AddTag = {
  sectionName: string;
  groupId: number;
};

export default function AddTag({ sectionName, groupId }: AddTag) {
  const [showModal, setShowModal] = useState(false);

  const { dispatch: tagDispatch } = useTagContext();

  const handleAddTag = async (name: string, section: string): Promise<void> => {
    const newTag: NewTagProps = {
      name: name,
      section: section,
      group_id: groupId,
    };

    try {
      const createdTag = await addTag(newTag);
      tagDispatch({ type: "ADD_TAG", payload: createdTag });
    } catch (error) {
      console.error("Failed to add tag:", error);
    }
  };

  return (
    <View style={styles.sectionHeader}>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
      >
        <MaterialCommunityIcons name="plus" size={24} color={'white'} />
      </TouchableOpacity>

      <AddTagModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onAddTag={handleAddTag}
        sectionName={sectionName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
});

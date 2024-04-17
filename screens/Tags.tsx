import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { useTagContext } from "../src/contexts/tags/UseTagContext";
import { useDateContext } from "../src/contexts/date/useDateContext";
import { useGroupContext } from "../src/contexts/groups/UseGroupContext";
import { TagProps } from "../src/types/TagTypes";
import Header from "../components/DateHeader";
import Section from "../components/tags/Section";
import SelectedTagList from "../components/tags/SelectedTagList";
import AddGroupModal from "../components/AddGroupModal";

export default function TagScreen() {
  const { selectedDate, setSelectedDate } = useDateContext();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const { tags } = useTagContext();
  const { groups } = useGroupContext();
  const selectedDateString = selectedDate.toLocaleDateString('en-CA');

  const filterTags = (
    groupName: string,
    groupTags: TagProps[],
    selectedDateString: string
  ) => {
    if (groupName.toLowerCase() === "today") {
      return groupTags.filter((tag) => {
        const isInScopeForTodayOrFuture =
          tag.inScopeDay === selectedDateString ||
          (tag.inScopeDay && tag.inScopeDay < selectedDateString);
        const isUncompletedOrCompletedAfter =
          !tag.completed ||
          (tag.completed && tag.completed >= selectedDateString);
        return isInScopeForTodayOrFuture && isUncompletedOrCompletedAfter;
      });
    }
    return groupTags;
  };

  return (
    <>
      <Header
        title={""}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback
          onPress={() => isEditMode && setIsEditMode(false)}
        >
          <View style={styles.sectionsContainer}>
            {groups.map((group) => {
              const groupTags = tags.filter(
                (tag) => tag.section === group.name
              );
              const filteredTags = filterTags(
                group.name,
                groupTags,
                selectedDateString
              );

              if (filteredTags.length > 0 || group.name !== "today") {
                return (
                  <View key={group.id}>
                    <Text style={styles.sectionTitle}>{group.name === 'today' ? 'projects' : group.name}</Text>
                    <Section
                      tags={filteredTags}
                      sectionName={group.name}
                      groupId={group.id}
                      isEditMode={isEditMode}
                      setIsEditMode={setIsEditMode}
                    />
                  </View>
                );
              }

              return null;
            })}

            {isEditMode && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowModal(true)}
              >
                <MaterialCommunityIcons name="plus-circle-outline" size={24} />
              </TouchableOpacity>
            )}

            <AddGroupModal
              visible={showModal}
              onClose={() => setShowModal(false)}
            />

            <SelectedTagList />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  sectionsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  addButton: {
    alignSelf: "flex-end",
    padding: 16,
  },
  editableSection: {
    padding: 10,
    // Add your styling here for the editable section
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { useTagContext } from "../src/contexts/tags/UseTagContext";
import { useTaskContext } from "../src/contexts/tasks/UseTaskContext";
import { useDateContext } from "../src/contexts/date/useDateContext";
import { useGroupContext } from "../src/contexts/groups/UseGroupContext";
import { TagProps } from "../src/types/TagTypes";
import Header from "../components/DateHeader";
import Section from "../components/tags/Section";
import TaskSection from "../components/tags/TaskSection";
import SelectedTagList from "../components/tags/SelectedTagList";
import AddGroupModal from "../components/AddGroupModal";
import { Task } from "../src/types/TaskTypes";

export default function TagScreen() {
  const { selectedDate, setSelectedDate } = useDateContext();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const { tags } = useTagContext();
  const { state: tasks } = useTaskContext();
  const { groups } = useGroupContext();
  const selectedDateString = selectedDate.toISOString().split("T")[0];

  useEffect(() => {}, [tags, selectedDate, groups]);

  const filterTasks = (groupTags: Task[]) => {
    return groupTags.filter((tag) => {
      const isInScopeForTodayOrFuture =
        tag.inScopeDay === selectedDateString ||
        (tag.inScopeDay && tag.inScopeDay < selectedDateString);
      const isUncompletedOrCompletedAfter =
        !tag.completed ||
        (tag.completed && tag.completed >= selectedDateString);
      return isInScopeForTodayOrFuture && isUncompletedOrCompletedAfter;
    });
  };

  return (
    <>
      <Header
        title={""}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <ScrollView style={styles.scrollView}>
        <TouchableWithoutFeedback
          onPress={() => isEditMode && setIsEditMode(false)}
        >
          <View style={styles.sectionsContainer}>
            {filterTasks(tasks).length > 0 && (
              <>
                <Text style={styles.sectionTitle}>{"Today"}</Text>
                <TaskSection tasks={filterTasks(tasks)} />
              </>
            )}
            {groups.map((group) => {
              const groupTags = tags.filter(
                (tag) => tag.section === group.name
              );
              return (
                <View key={group.id}>
                  <Text style={styles.sectionTitle}>{group.name}</Text>
                  <Section
                    tags={groupTags}
                    sectionName={group.name}
                    groupId={group.id}
                    isEditMode={isEditMode}
                    setIsEditMode={setIsEditMode}
                  />
                </View>
              );
            })}

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowModal(true)}
            >
              <MaterialCommunityIcons name="plus-circle-outline" size={24} />
            </TouchableOpacity>

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

import React, { useState } from "react";
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
import AddGroupModal from "../components/AddGroupModal";
import AddTag from "../components/tags/AddTag";
import { GroupProps } from "../src/types/GroupTypes";

export default function TagScreen() {
  const { selectedDate, setSelectedDate } = useDateContext();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const { tags } = useTagContext();
  const { groups } = useGroupContext();
  const selectedDateString = selectedDate.toLocaleDateString("en-CA");

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
  

  if (groups.length === 0) {
    return (
      <View style={[styles.activityContainer, styles.activityHorizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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

              // if (filteredTags.length > 0 || group.name !== "today") {
              if (0 === 0) {
                return (
                  <View key={group.id}>
                    <View style={styles.sectionName}>
                      <Text style={styles.sectionTitle}>
                        {group.name === "today" ? "projects" : group.name}
                      </Text>
                      <View style={styles.addButton}>
                        {group.name !== "today" && (
                          <AddTag sectionName={group.name} groupId={group.id} />
                        )}
                      </View>
                    </View>
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
                <MaterialCommunityIcons name="plus" size={24} color={"white"} />
              </TouchableOpacity>
            )}

            <AddGroupModal
              visible={showModal}
              onClose={() => setShowModal(false)}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: "center",
  },
  activityHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  sectionName: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  addButton: {
    alignSelf: "flex-end",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#000",
  },
  sectionsContainer: {
    padding: 16,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textTransform: "capitalize",
  },
  editableSection: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
});

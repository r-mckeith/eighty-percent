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
import Section from "../components/habits/Section";
import AddGroupModal from "../components/AddGroupModal";
import AddTag from "../components/habits/AddTag";
import DateHeaderNew from "../components/DateHeaderNew";

export default function TagScreen() {
  const { selectedDate, setSelectedDate } = useDateContext();
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
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
    
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

              if (filteredTags) {
                return (
                  <View key={group.id}>
                    {group.name === "today" && (
                      <View style={styles.datePicker}>
                        <DateHeaderNew
                          selectedDate={selectedDate}
                          onDateChange={setSelectedDate}
                        />
                      </View>
                    )}
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
                    />
                  </View>
                );
              }

              return null;
            })}

            <AddGroupModal
              visible={showModal}
              onClose={() => setShowModal(false)}
            />
          </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  datePicker: {
    alignSelf: "flex-end",
    marginRight: 4,
    marginBottom: 5,
  },
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

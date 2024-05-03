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
  ScrollView,
} from "react-native";
import { useAggregatedData } from "../../src/hooks/aggregateData";
import { useDateContext } from "../../src/contexts/date/useDateContext";

type AddModal = {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
};

export default function ReviewModal({ visible, onClose, onAdd }: AddModal) {
  const [answer, setAnswer] = useState("");

  const { selectedDate } = useDateContext();
  const { habitsTableData, projectsTableData } = useAggregatedData();
  const dayHeaders = ["F", "S", "S", "M", "T", "W", "T"];

  function handleAdd() {
    if (answer) {
      onAdd(answer);
      setAnswer("");
      onClose();
    }
  }

  function handlePressCancel() {
    setAnswer("");
    onClose();
  }

  function prepareGridData() {
    if (!projectsTableData) {
      return [];
    }

    const sevenDaysAgo = new Date(selectedDate);
    sevenDaysAgo.setDate(selectedDate.getDate() - 6);

    return projectsTableData.details.map((project: any) => {
      const inScopeDate = new Date(project.inScopeDay);

      const completedDate = new Date(project.completedDay);

      return {
        name: project.name,
        days: Array.from({ length: 7 }, (_, dayIndex) => {
          const day = new Date(sevenDaysAgo);
          day.setDate(day.getDate() + dayIndex);

          const isCompleted =
            completedDate &&
            day.toISOString().split("T")[0] === completedDate.toISOString().split("T")[0];
          const isInScope = inScopeDate && day.getTime() >= inScopeDate.getTime();
          const isPushed =
            isInScope &&
            completedDate &&
            completedDate.toISOString().split("T")[0] > inScopeDate.toISOString().split("T")[0];
          const isIncomplete = isInScope && !project.completed;

          let status = "";
          let icon = "";

          if (isPushed) {
            status = "P";
            icon = "→";
          } else if (isCompleted) {
            status = "C";
            icon = "✓";
          } else if (isIncomplete) {
            status = "X";
            icon = "✗";
          }

          return {
            day: day.toDateString(),
            status: status,
            icon: icon,
          };
        }),
      };
    });
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalView}>
          <ScrollView style={{ width: "100%" }}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={[styles.modalButton, styles.leftButton]}
                onPress={handlePressCancel}
              >
                <Text style={[styles.buttonText, { color: "red" }]}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.buttonText}>Weekly Review</Text>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.rightButton,
                  answer ? {} : styles.disabledButton,
                ]}
                onPress={handleAdd}
                disabled={!answer}
              >
                <Text style={[styles.buttonText, answer ? { color: "blue" } : { color: "grey" }]}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.summaryText}>
              <Text style={[styles.buttonText, { marginVertical: 10 }]}>
                {`Completed Projects: ${projectsTableData && projectsTableData.totals && projectsTableData.totals.week}`}
              </Text>
              <Text style={styles.buttonText}>
                {`Total Pushes: ${projectsTableData && projectsTableData.totals && projectsTableData.totals.pushesWeek}`}
              </Text>
            </View>
            <View style={styles.grid}>
              <View style={styles.gridHeader}>
                <Text style={styles.headerCell}>Project Name</Text>
                {dayHeaders.map((header, index) => (
                  <Text key={index} style={styles.gridCell}>
                    {header}
                  </Text>
                ))}
              </View>
              {projectsTableData &&
                prepareGridData().map((data: any, index: number) => (
                  <View key={index} style={styles.gridRow}>
                    <Text style={styles.projectName}>{data.name}</Text>
                    {data &&
                      data.days.map((day: any, idx: number) => (
                        <Text
                          key={idx}
                          style={[
                            styles.gridCell,
                            { color: day.status === "P" ? "orange" : day.status === 'C' ? 'blue' : "red" },
                          ]}
                        >
                          {day.icon}
                        </Text>
                      ))}
                  </View>
                ))}
            </View>
            <View style={styles.reviewContainer}>
              <Text style={styles.buttonText}>How did you do?</Text>
              <TextInput
                style={styles.textInput}
                placeholderTextColor="white"
                value={answer}
                onChangeText={setAnswer}
                autoFocus={true}
                returnKeyType="done"
                multiline={true}
                numberOfLines={4}
              />
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>

    //       <View style={styles.modalHeader}>
    //         <TouchableOpacity
    //           style={[styles.modalButton, styles.leftButton]}
    //           onPress={handlePressCancel}
    //         >
    //           <Text style={[styles.buttonText, { color: "red" }]}>Cancel</Text>
    //         </TouchableOpacity>
    //         <Text style={[styles.buttonText, { color: "white" }]}>Weekly Review</Text>
    //         <TouchableOpacity
    //           style={[
    //             styles.modalButton,
    //             styles.rightButton,
    //             answer ? {} : styles.disabledButton,
    //           ]}
    //           onPress={handleAdd}
    //           disabled={!answer}
    //         >
    //           <Text
    //             style={[styles.buttonText, answer ? { color: "blue" } : { color: "grey" }]}
    //           >
    //             Done
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //       <Text style={{color: 'white'}}>You completed projects</Text>
    //       <TextInput
    //         style={styles.textInput}
    //         placeholder={'...'}
    //         placeholderTextColor="white"
    //         value={answer}
    //         onChangeText={setAnswer}
    //         autoFocus={true}
    //         returnKeyType="done"
    //       />
    //     </View>
    //   </KeyboardAvoidingView>
    // </Modal>
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
    width: "100%",
    height: "100%",
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
  summaryText: {
    marginTop: 60,
    marginBottom: 15,
    flexDirection: "column",
  },
  grid: {
    flexDirection: "column",
    width: "100%",
  },
  gridHeader: {
    flexDirection: "row",
    backgroundColor: "#333", // Dark background for header
    padding: 10,
    borderRadius: 10
  },
  headerCell: {
    flex: 4,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  gridRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#555", // Slightly lighter border for rows
  },
  projectName: {
    flex: 4,
    color: "white",
    textAlign: "center",
  },
  gridCell: {
    flex: 1,
    textAlign: "center",
    color: "white", // Ensure text is white
  },
  closeButton: {
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
  reviewContainer: {
    marginTop: 30
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
    marginBottom: 30,
  },
  modalButton: {
    padding: 10,
  },
  leftButton: {
    alignSelf: "flex-start",
  },
  rightButton: {
    alignSelf: "flex-end",
    // marginRight: -70,
  },
  disabledButton: {
    opacity: 0.5,
  },
  textInput: {
    marginTop: 20,
    alignSelf: "stretch",
    height: 30,
    color: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#bbb",
    paddingHorizontal: 15, // Increase horizontal padding for more space
    paddingVertical: 15,
    width: "100%",
  },
});

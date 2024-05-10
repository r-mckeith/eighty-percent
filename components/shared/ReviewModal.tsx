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
import { addReview } from "../../src/api/SupabaseReviews";
import { useAggregatedData } from "../../src/hooks/aggregateData";
import { useDateContext } from "../../src/contexts/date/useDateContext";
import { useReviewContext } from "../../src/contexts/reviews/UseReviewContext";

type ReviewModal = {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
};

export default function ReviewModal({ visible, onClose, onAdd }: ReviewModal) {
  const [answer, setAnswer] = useState<{ good: string; bad: string; improve: string }>({
    good: "",
    bad: "",
    improve: "",
  });

  const { selectedDate } = useDateContext();
  const { habitGridData, projectTableData } = useAggregatedData();
  const { reviews, dispatch } = useReviewContext();
  const lastReview = reviews[0].response;

  function generateDayHeaders() {
    const fullWeek = ["Tu", "We", "Th", "Fr", "Sa", "Su", "Mo"];
    const date = new Date(selectedDate);
    const selectedDayOfWeek = date.getDay();
    const adjustedIndex = selectedDayOfWeek === 0 ? 6 : selectedDayOfWeek - 1;
    return [...fullWeek.slice(adjustedIndex), ...fullWeek.slice(0, adjustedIndex)];
  }

  function handleAdd() {
    console.log(answer);
    if (answer) {
      addReview(answer, selectedDate.toISOString().split("T")[0]);
      setAnswer({ good: "", bad: "", improve: "" });
      onClose();
    }
  }

  function handlePressCancel() {
    onClose();
  }

  const handleChange = (key: string, value: string) => {
    setAnswer((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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
              <Text style={[styles.buttonText, { marginVertical: 10 }]}></Text>
              <Text style={styles.buttonText}></Text>
            </View>
            <View style={styles.summarySection}>
              <Text style={styles.summaryHeader}>Last Week's Review</Text>
              <Text style={styles.reviewSummaryText}>{lastReview.good}</Text>
              <Text style={styles.reviewSummaryText}>{lastReview.bad}</Text>
              <Text style={styles.reviewSummaryText}>{lastReview.improve}</Text>
            </View>

            <View style={styles.grid}>
              <View style={styles.gridHeader}>
                <Text style={styles.headerCell}>Projects</Text>
                {generateDayHeaders().map((header, index) => (
                  <Text key={index} style={styles.gridCell}>
                    {header}
                  </Text>
                ))}
              </View>
              {projectTableData &&
                projectTableData.map((data: any, index: number) => (
                  <View key={index} style={styles.gridRow}>
                    <Text style={styles.projectName}>{data.name}</Text>
                    {data &&
                      data &&
                      data.days.map((day: any, idx: number) => (
                        <Text
                          key={idx}
                          style={[
                            styles.gridCell,
                            {
                              color:
                                day.status === "P"
                                  ? "orange"
                                  : day.status === "C"
                                  ? "green"
                                  : "red",
                            },
                          ]}
                        >
                          {day.icon}
                        </Text>
                      ))}
                  </View>
                ))}
            </View>
            <View style={styles.grid}>
              <View style={styles.gridHeader}>
                <Text style={styles.headerCell}>Habits</Text>
                {generateDayHeaders().map((header, index) => (
                  <Text key={index} style={styles.gridCell}>
                    {header}
                  </Text>
                ))}
              </View>
              {habitGridData &&
                habitGridData.map((data: any, index: number) => (
                  <View key={index} style={styles.gridRow}>
                    <Text style={styles.projectName}>{data.name}</Text>
                    {data &&
                      data &&
                      data.dayCounts.map((day: any, idx: number) => (
                        <Text
                          key={idx}
                          style={[
                            styles.gridCell,
                            {
                              color: day > 0 ? "green" : "orange",
                            },
                          ]}
                        >
                          {day === 0 ? "-" : day}
                        </Text>
                      ))}
                  </View>
                ))}
            </View>
            <View style={styles.reviewContainer}>
              <Text style={styles.buttonText}>What went well this week?</Text>
              <TextInput
                style={styles.textInput}
                placeholderTextColor="white"
                value={answer.good}
                onChangeText={(e) => handleChange("good", e)}
                autoFocus={true}
                returnKeyType="done"
                multiline={true}
                numberOfLines={4}
              />
            </View>
            <View style={styles.reviewContainer}>
              <Text style={styles.buttonText}>What didn't go well?</Text>
              <TextInput
                style={styles.textInput}
                placeholderTextColor="white"
                value={answer.bad}
                onChangeText={(e) => handleChange("bad", e)}
                autoFocus={true}
                returnKeyType="done"
                multiline={true}
                numberOfLines={4}
              />
            </View>
            <View style={styles.reviewContainer}>
              <Text style={styles.buttonText}>What's your plan to improve?</Text>
              <TextInput
                style={styles.textInput}
                placeholderTextColor="white"
                value={answer.improve}
                onChangeText={(e) => handleChange("improve", e)}
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
    marginBottom: 20,
    flexShrink: 1,
    flexGrow: 1,
    borderRadius: 10,
    // marginVertical: 10,
    borderWidth: 2,
    borderColor: "#333333",
    backgroundColor: "#1c1c1e",
    // marginBottom: 20,
  },
  gridHeader: {
    flexDirection: "row",
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
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
    borderBottomColor: "#555",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#2c2c2e",
    borderColor: "#333",
    alignSelf: "stretch",
  },
  projectName: {
    flex: 4,
    color: "#FFF",
  },
  gridCell: {
    flex: 1,
    textAlign: "center",
    color: "white",
  },
  closeButton: {
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
  reviewContainer: {
    marginTop: 30,
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
    // marginRight: -70,
  },
  disabledButton: {
    opacity: 0.5,
  },
  textInput: {
    alignSelf: "stretch",
    height: 30,
    color: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#bbb",
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: "100%",
  },
  summarySection: {
    backgroundColor: '#282c34',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  
  summaryHeader: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewSummaryText: {
    color: '#ddd',
    fontSize: 16,
    lineHeight: 24,
  },
});

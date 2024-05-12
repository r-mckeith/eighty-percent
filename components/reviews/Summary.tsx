import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { RowText, Section } from "../layout";

export default function Summary({ lastReview }: any) {
  return (
    <Section style={{ padding: 20 }}>
      <Text style={styles.summaryHeader}>Last Week</Text>

      <View style={{ flexDirection: "row", alignItems: "stretch", flexWrap: "wrap" }}>
        <RowText text={"Good:"} style={{ marginRight: 4 }} />
        <Text style={styles.reviewSummaryText}>{lastReview.good}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "stretch", flexWrap: "wrap" }}>
        <RowText text={"Bad:"} style={{ marginRight: 4 }} />
        <Text style={styles.reviewSummaryText}>{lastReview.bad}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "stretch", flexWrap: "wrap" }}>
        <RowText text={"Improve:"} style={{ marginRight: 4 }} />
        <Text style={styles.reviewSummaryText}>{lastReview.improve}</Text>
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  summaryHeader: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  reviewSummaryText: {
    color: "white",
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 10,
    width: "74%",
  },
});

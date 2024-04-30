import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Content = ({ name, isLocked = false, setSelected }: { name: string; isLocked?: boolean, setSelected: (arg0: string) => void }) => {
  return (
    
    <TouchableOpacity
    activeOpacity={isLocked ? 1 : 0.2}
    onPress={isLocked ? () => {} : () => setSelected && setSelected(name)}
  >
    <View style={[styles.contentContainer, isLocked && styles.lockedContent]}>
      <Text style={[styles.contentText, isLocked && styles.lockedText]}>{name}</Text>
      {isLocked && (
        <MaterialCommunityIcons name="lock" size={20} color="grey" style={styles.lockIcon} />
      )}
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#333",
  },
  contentText: {
    color: "white",
    fontSize: 16,
  },
  lockedContent: {
    backgroundColor: "#333",
    borderColor: "#505050",
  },
  lockedText: {
    color: "grey",
  },
  lockIcon: {
    marginLeft: 10,
  },
});

export default Content;

import React from "react";
import { StyleSheet } from "react-native";
import { Row, RowText, Icon } from "../layout";

const Content = ({
  name,
  isLocked = false,
  setSelected,
}: {
  name: string;
  isLocked?: boolean;
  setSelected: (arg0: string) => void;
}) => {
  return (
    <Row
      opacity={isLocked ? 1 : 0.2}
      onPress={() => (isLocked ? () => {} : setSelected(name))}
      style={isLocked ? styles.lockedContent : {}}
    >
      <RowText text={name} style={isLocked ? styles.lockedText : {}} />

      {isLocked && <Icon name="lock" size={20} color="grey" />}
    </Row>
  );
};

const styles = StyleSheet.create({
  lockedContent: {
    backgroundColor: "#333",
    borderColor: "#505050",
  },
  lockedText: {
    color: "grey",
  },
});

export default Content;

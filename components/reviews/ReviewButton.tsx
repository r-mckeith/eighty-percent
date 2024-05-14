import React, { useState } from "react";
import { View, TouchableOpacity, Button, StyleSheet, useColorScheme } from "react-native";
import ReviewModal from "./ReviewModal";
import { getColors } from "../../src/colors";

export default function ReviewButton() {
  const [showModal, setShowModal] = useState(false);

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View>
      <TouchableOpacity activeOpacity={0.2} style={colors.reviewButton}>
        <Button title={"review"} onPress={() => setShowModal(true)} color={'white'} />
      </TouchableOpacity>
      <ReviewModal visible={showModal} onClose={() => setShowModal(false)} onAdd={() => {}} />
    </View>
  );
}

import React, { useState } from "react";
import { View, TouchableOpacity, Button, StyleSheet } from "react-native";
import ReviewModal from "./ReviewModal";

export default function ReviewButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <TouchableOpacity activeOpacity={0.2} style={styles.button}>
        <Button title={"review"} onPress={() => setShowModal(true)} color={'white'} />
      </TouchableOpacity>
      <ReviewModal visible={showModal} onClose={() => setShowModal(false)} onAdd={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
   backgroundColor: 'grey',
  },
});

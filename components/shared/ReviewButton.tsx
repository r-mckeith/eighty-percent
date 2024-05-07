import React, { useState } from "react";
import { View, TouchableOpacity, Button } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ReviewModal from "./ReviewModal";

export default function ReviewButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      {/* <TouchableOpacity onPress={() => setShowModal(true)}>
        <MaterialCommunityIcons name="plus" size={24} color={"white"} />
      </TouchableOpacity> */}
      <Button title={'review'} onPress={() => setShowModal(true)} />
      <ReviewModal 
        visible={showModal}
        onClose={() => setShowModal(false)}
        onAdd={() => {}}
      />
    </View>
  );
}
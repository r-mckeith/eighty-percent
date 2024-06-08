import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';

type RightSwipeButton = {
  backgroundColor: string;
  icon: string;
  text: string;
  onPress: () => void;
};

export default function RightSwipeButton({ backgroundColor, icon, text, onPress }: RightSwipeButton) {
  return (
    <View style={{ flexDirection: 'column', backgroundColor: backgroundColor }}>
      <TouchableOpacity onPress={onPress} style={styles.rightSwipeItem}>
        <Icon source={icon} size={20} />
      </TouchableOpacity>
      <Text style={{ fontSize: 10, textAlign: 'center', color: 'white' }}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rightSwipeItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    paddingTop: 6,
  },
});

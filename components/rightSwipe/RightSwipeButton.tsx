import React from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { Icon } from '../shared';

type RightSwipeButton = {
  backgroundColor: string;
  icon: string;
  text: string;
  onPress: () => void;
};

export default function RightSwipeButton({ backgroundColor, icon, text, onPress }: RightSwipeButton) {
  return (
    <View style={{ flexDirection: 'column', backgroundColor: backgroundColor }}>
      <Icon
        name={icon}
        size={24}
        color='white'
        opacity={0.2}
        opacityStyle={[styles.rightSwipeItem]}
        onPress={onPress}
      />
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

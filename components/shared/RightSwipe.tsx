import React from 'react';
import { View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Swipeable } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

type RightSwipe = {
  handleDelete: (id: number) => Promise<void>;
  id: number;
  swipeableRow: React.RefObject<Swipeable | null>;
  dispatch: React.Dispatch<any>;
};

export default function RightSwipe({id, handleDelete}: RightSwipe) {
  return (
    <View style={styles.rightActionContainer}>
      <RectButton style={[styles.rightSwipeItem, styles.deleteButton]} onPress={() => handleDelete(id)}>
        <MaterialCommunityIcons 
                name="close-circle" 
                size={24} 
                color="red"
              />
      </RectButton>
    </View>
  );
};

const styles=StyleSheet.create({
  rightActionContainer: {
    flexDirection: 'row',
    height: 30,
    width: 30,
  },
  rightSwipeItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    height: 30,
    width: 30,
    marginVertical: 5,
    backgroundColor: '#EE4B60',
  },
  deleteButton: {
    backgroundColor: '#c0c0c0',
  },
});

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';

type HeaderProps = {
  title: string;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

export default function ListHeader({ title }: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>

            <TouchableOpacity 
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => {}}
      >
        <Text style={{ color: '#767577', fontSize: 20, fontWeight: 'bold' }}>
          General List
        </Text>
        <MaterialCommunityIcons name="menu-down" size={30} color="#767577" /> 
      </TouchableOpacity>
    </View>  
  );
};

const styles=StyleSheet.create({
  headerContainer: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: "capitalize",
  },
});
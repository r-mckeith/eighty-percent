import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tasks from './Tasks';
import Tags from './Tags';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingVertical: 10,
          backgroundColor: '#000'
        },
      }}
    >
      <Tab.Screen name="Habits" component={Tags} options={{ headerShown: false }}/>
      <Tab.Screen name="Projects" component={Tasks} options={{ headerShown: false }}/>
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}
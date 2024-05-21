import React from 'react';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getColors } from '../src/colors';
import { Actions, Content, Plans, Settings } from '../screens'

const Tab = createBottomTabNavigator();

export function MyTabs() {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingVertical: 10,
          backgroundColor: colors.background.backgroundColor
        }
      }}
    >
      <Tab.Screen name="Actions" component={Actions} options={{ headerShown: false }}/>
      <Tab.Screen name="Plans" component={Plans} options={{ headerShown: false }}/>
      <Tab.Screen name="Content" component={Content} options={{ headerShown: false }}/>
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}
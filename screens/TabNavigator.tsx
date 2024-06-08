import React from 'react';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getColors } from '../src/colors';
import { Actions, Content, Plans, Settings } from '../screens';
import CustomIcon from './Icons';

const Tab = createBottomTabNavigator();

export function MyTabs() {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Actions') {
            iconName = 'actions';
          } else if (route.name === 'Plans') {
            iconName = 'plans';
          } else if (route.name === 'Content') {
            iconName = 'content';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <CustomIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.text.color,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingVertical: 10,
          backgroundColor: colors.background.backgroundColor,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Actions" component={Actions} />
      <Tab.Screen name="Plans" component={Plans} />
      <Tab.Screen name="Content" component={Content} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

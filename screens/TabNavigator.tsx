import React from 'react';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContentSection from '../components/content/ContentSection';
import Projects from './Projects';
import Habits from './Habits';
import Settings from './Settings';
import { getColors } from '../src/colors';

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
      <Tab.Screen name="Actions" component={Habits} options={{ headerShown: false }}/>
      <Tab.Screen name="Plans" component={Projects} options={{ headerShown: false }}/>
      <Tab.Screen name="Content" component={ContentSection} options={{ headerShown: false }}/>
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}
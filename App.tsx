import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { MenuProvider } from 'react-native-popup-menu';
import 'react-native-url-polyfill/auto';
import Auth from './components/auth/Auth';
import {
  DateProvider,
  GroupProvider,
  HabitDataProvider,
  HabitProvider,
  ReviewProvider,
  TaskProvider,
} from './src/contexts';
import { MyTabs } from './screens/TabNavigator';
import { useSession } from './src/contexts/sessions/UseSessionHook';
import { getColors } from './src/colors';

export default function App() {
  const session = useSession();
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <DateProvider>
      <GroupProvider>
        <HabitProvider>
          <TaskProvider>
            <HabitDataProvider>
              <ReviewProvider>
                <SafeAreaView style={[styles.container, colors.background]}>
                  <StatusBar style='light' />
                  <MenuProvider>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                      {session && session.user ? (
                        <NavigationContainer>
                          <MyTabs/>
                        </NavigationContainer>
                      ) : (
                        <Auth />
                      )}
                    </GestureHandlerRootView>
                  </MenuProvider>
                </SafeAreaView>
              </ReviewProvider>
            </HabitDataProvider>
          </TaskProvider>
        </HabitProvider>
      </GroupProvider>
    </DateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000',
  },
});

import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { MenuProvider } from 'react-native-popup-menu';
import 'react-native-url-polyfill/auto';
import Auth from './components/auth/Auth';
import {
  DateProvider,
  GroupProvider,
  HabitDataProvider,
  HabitProvider,
  NoteProvider,
  PlanProvider,
  ReviewProvider,
  TaskProvider,
} from './src/contexts';
import InitializeApp from './src/InitializeApp';
import { MyTabs } from './screens/TabNavigator';
import { useSession } from './src/contexts';
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
              <PlanProvider>
                <NoteProvider>
                  <ReviewProvider>
                    <InitializeApp>
                        <SafeAreaView style={[styles.container, colors.background]}>
                          <StatusBar style='light' />
                          <MenuProvider>
                            <GestureHandlerRootView style={{ flex: 1 }}>
                      <PaperProvider>

                              {session && session.user ? (
                                <NavigationContainer>
                                  <MyTabs />
                                </NavigationContainer>
                              ) : (
                                <Auth />
                              )}
                      </PaperProvider>

                            </GestureHandlerRootView>
                          </MenuProvider>
                        </SafeAreaView>
                    </InitializeApp>
                  </ReviewProvider>
                </NoteProvider>
              </PlanProvider>
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
  },
});

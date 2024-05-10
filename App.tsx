import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { MenuProvider } from "react-native-popup-menu";
import "react-native-url-polyfill/auto";
import Auth from "./components/auth/Auth";
import TagContextProvider from "./src/contexts/habits/HabitContextProvider";
import TagDataContextProvider from "./src/contexts/habitData/TagDataContextProvider";
import DateProvider from "./src/contexts/date/Dateprovider";
import GroupContextProvider from "./src/contexts/groups/GroupContextProvider";
import ReviewContextProvider from "./src/contexts/reviews/ReviewContextProvider";
import { MyTabs } from "./screens/TabNavigator";
import { useSession } from "./src/contexts/sessions/UseSessionHook";

export default function App() {
  const session = useSession();

  return (
    <DateProvider>
      <GroupContextProvider>
        <TagContextProvider>
          <TagDataContextProvider>
            <ReviewContextProvider>
              <SafeAreaView style={styles.container}>
                <StatusBar style="light" />
                <MenuProvider>
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    {session && session.user ? (
                      <NavigationContainer>
                        <MyTabs />
                      </NavigationContainer>
                    ) : (
                      <Auth />
                    )}
                  </GestureHandlerRootView>
                </MenuProvider>
              </SafeAreaView>
            </ReviewContextProvider>
          </TagDataContextProvider>
        </TagContextProvider>
      </GroupContextProvider>
    </DateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

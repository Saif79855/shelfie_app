import { Stack } from "expo-router";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Colors from "../constants/colors";
import { UserProvider } from "../context/UserContext";
import { BooksProvider } from "../context/BooksContext";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <UserProvider>
      <BooksProvider>
        <SafeAreaProvider>
          <StatusBar
            barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
          />

          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.navBackground,
              },
              headerTintColor: theme.title,
            }}
          >
            <Stack.Screen
              name="index"
              options={{ headerTitleAlign: "center", title: "Home" }}
            />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </BooksProvider>
    </UserProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});

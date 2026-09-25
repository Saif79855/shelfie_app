import { Stack } from "expo-router";
import { StatusBar } from "react-native";

const AuthLayout = () => {
  return (
    <>
      <StatusBar />
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
    </>
  );
};

export default AuthLayout;

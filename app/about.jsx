import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { Link } from "expo-router";
import Colors from "../constants/colors";

const about = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? colorScheme.light;
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text }}>about</Text>
      <Link style={{ color: theme.text }} href="/">
        Home
      </Link>
    </View>
  );
};

export default about;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
});

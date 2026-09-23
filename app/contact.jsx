import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
const Contact = () => {
  return (
    <View style={styles.container}>
      <Text>Contact Page</Text>
      <Link href="/">Home</Link>
    </View>
  );
};

export default Contact;

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

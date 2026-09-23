import { StyleSheet, Text, View, Image } from "react-native";
import Icon from "../assets/favicon.png";
import { Link } from "expo-router";
const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Image source={Icon} style={styles.img} />
      <Link href="/about">About Page</Link>
      <Link href="/contact">Contact Page</Link>
    </View>
  );
};

export default Home;

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
  img: {
    margin: 10,
    width: 200,
    height: 200,
  },
});

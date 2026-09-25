import { Image, useColorScheme, StyleSheet } from "react-native";

// images
import DarkLogo from "../assets/img/dark_logo.png";
import LightLogo from "../assets/img/light_logo.png";

const ThemedLogo = () => {
  const colorScheme = useColorScheme();
  const logo = colorScheme === "dark" ? DarkLogo : LightLogo;

  return <Image source={logo} style={styles.logo} />;
};

export default ThemedLogo;

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
});

import { StyleSheet, FlatList, Pressable } from "react-native";
import { useBooks } from "../../hooks/useBooks";
import Colors from "../../constants/colors";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import ThemedCard from "../../components/ThemedCard";
import { useRouter } from "expo-router";

const Books = () => {
  const { books } = useBooks();
  const router = useRouter();
  return (
    <ThemedView style={styles.container} safe={true}>
      <ThemedText title={true} style={styles.heading}>
        Your Reading List
      </ThemedText>

      <Spacer />
      <FlatList
        data={books}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/books/${item.$id}`)}>
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <ThemedText>Written By:-{item.author}</ThemedText>
            </ThemedCard>
          </Pressable>
        )}
      />
    </ThemedView>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },

  list: {
    marginTop: 20,
    paddingBottom: 20,
    width: "100%",
  },

  card: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
    padding: 14,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

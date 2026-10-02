import { StyleSheet, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { useBooks } from "../../../hooks/useBooks";

import ThemedText from "../../../components/ThemedText";
import ThemedButton from "../../../components/ThemedButton";
import ThemedCard from "../../../components/ThemedCard";
import Spacer from "../../../components/Spacer";
import ThemedView from "../../../components/ThemedView";
import ThemedLoader from "../../../components/ThemedLoader";
import Colors from "../../../constants/colors";

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { id } = useLocalSearchParams();
  const { fetchBookById, deleteBook } = useBooks();
  const router = useRouter();

  const handleDelete = async () => {
    await deleteBook(id);
    setBook(null);
    router.replace("/books");
  };

  useEffect(() => {
    async function loadBook() {
      const bookData = await fetchBookById(id);
      setBook(bookData);
    }
    loadBook();
  }, [id]);

  if (!book) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    );
  }

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedText style={styles.title}>Book Name :{book.title}</ThemedText>
        <ThemedText>Written By :{book.author}</ThemedText>
        <Spacer />
        <ThemedText title={true}>Book Description:</ThemedText>
        <Spacer height={10} />

        <ThemedText>{book.description}</ThemedText>
      </ThemedCard>
      <ThemedButton style={styles.delete} onPress={handleDelete}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Delete Book</Text>
      </ThemedButton>
    </ThemedView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  card: {
    margin: 20,
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  delete: {
    marginTop: 40,
    backgroundColor: Colors.warning,
    width: 200,
    alignSelf: "center",
  },
});

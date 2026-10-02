import { createContext, useEffect, useState } from "react";
import { ID, Permission, Query, Role } from "react-native-appwrite";

import { tablesDB, client } from "../lib/appwrite";
import { useUser } from "../hooks/useUser";

const DataBase_ID = "6abe3185002de3966966";
const Collection_ID = "6abe31fc0020858285f4";

export const BooksContext = createContext(null);

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const { user } = useUser();

  async function fetchBooks() {
    try {
      if (!user) {
        return;
      }

      const response = await tablesDB.listRows({
        databaseId: DataBase_ID,
        tableId: Collection_ID,
        queries: [Query.equal("userId", user.$id)],
      });

      setBooks(response.rows);
      console.log(response.rows);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchBookById(id) {
    try {
      const response = await tablesDB.getRow({
        databaseId: DataBase_ID,
        tableId: Collection_ID,
        rowId: id,
      });
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  async function createBook(data) {
    try {
      if (!user) {
        throw new Error("User is not logged in");
      }

      const newBook = await tablesDB.createRow({
        databaseId: DataBase_ID,
        tableId: Collection_ID,
        rowId: ID.unique(),

        data: {
          ...data,
          userId: user.$id,
        },

        permissions: [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ],
      });

      return newBook;
    } catch (error) {
      console.log("Create book error:", error.message);
      throw error;
    }
  }

  async function deleteBook(id) {
    try {
      await tablesDB.deleteRow({
        databaseId: DataBase_ID,
        tableId: Collection_ID,
        rowId: id,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    let unsubscribe;

    const channel = `databases.${DataBase_ID}.tables.${Collection_ID}.rows`;

    if (user) {
      fetchBooks();

      unsubscribe = client.subscribe(channel, (response) => {
        const { payload, events } = response;

        if (events[0].includes("create")) {
          setBooks((prevBooks) => [...prevBooks, payload]);
        }

        if (events[0].includes("delete")) {
          setBooks((prevBooks) =>
            prevBooks.filter((book) => book.$id !== payload.$id),
          );
        }
      });
    } else {
      setBooks([]);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  return (
    <BooksContext.Provider
      value={{
        books,
        fetchBookById,
        fetchBooks,
        createBook,
        deleteBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

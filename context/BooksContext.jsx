import { createContext, useState } from "react";

const DataBase_ID = "6abe3185002de3966966";
const Collection_ID = "6abe31fc0020858285f4";

const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);

  async function fetchBooks() {
    try {
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchBookById(id) {
    try {
    } catch (error) {
      console.log(error.message);
    }
  }
  async function createBook(data) {
    try {
    } catch (error) {
      console.log(error.message);
    }
  }
  async function deleteBook(id) {
    try {
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <BooksContext.Provider
      value={{ books, fetchBookById, fetchBooks, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
}

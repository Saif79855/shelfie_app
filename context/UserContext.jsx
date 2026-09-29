import { ID } from "react-native-appwrite";
import { account } from "../lib/appwrite";
const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  async function login(email, password) {
    try {
      await account.createEmailPasswordSession({ email, password });
      const response = await account.get();
      setUser(response);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async function register(email, password) {
    try {
      await account.create({ userId: ID.unique(), email, password });
      await login(email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async function logout() {
    await account.deleteSession({
      sessionId: "current",
    });

    setUser(null);
  }

  async function getInitialValue() {
    try {
      const response = await account.get();
      setUser(response);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialValue();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, authChecked }}
    >
      {children}
    </UserContext.Provider>
  );
}

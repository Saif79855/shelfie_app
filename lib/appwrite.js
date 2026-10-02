import { Account, Avatars, Client, TablesDB } from "react-native-appwrite";

export const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6ab1405d003c03ced149")
  .setPlatform("dev.saif.shelfie");

export const account = new Account(client);
export const avatars = new Avatars(client);
export const tablesDB = new TablesDB(client);

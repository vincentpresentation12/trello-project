import { createContext } from "react";
import { User } from "firebase/auth";

export interface ContextInterface {
  user: User;
  setUser: (user: User) => void;
}

export const UserTrello = createContext({} as ContextInterface);

import { User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from "firebase/app";

type AuthContextType = {
  user?: User;
  onLogin: (user: User) => void;
  onLogout: () => void;
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env
    .VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
if (!firebase.getApps().length) {
  firebase.initializeApp(firebaseConfig);
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  onLogin: () => {},
  onLogout: () => {},
});

export function AuthContextProvider({ children }: { children?: ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);

  console.log(user);

  const handleLogin = (user: User) => {
    if (user) {
      setUser(undefined);
    }
    setUser(user);
  };

  const handleLogout = () => {
    setUser(undefined);
  };

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{ user, onLogin: handleLogin, onLogout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useContextAuth() {
  return useContext(AuthContext);
}

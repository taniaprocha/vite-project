import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.scss";
import { SignInScreen } from "./screens/signin/signin";
import { DiscoveryScreen } from "./screens/home/discovery";
import { AppContextProvider, useContextApp } from "./context/app-context";
import { initializeApp } from "firebase/app";
import { SignUpScreen } from "./screens/signup/signup";

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
initializeApp(firebaseConfig);

function App() {
  const { user } = useContextApp();
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <DiscoveryScreen /> : <SignInScreen />}
          />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/discovery" element={<DiscoveryScreen />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;

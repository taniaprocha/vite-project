import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.scss";
import { SignInScreen } from "./screens/signin/signin";
import { DiscoveryScreen } from "./screens/home/discovery";
import { AppContextProvider } from "./context/app-context";
import { SignUpScreen } from "./screens/signup/signup";
import { AuthContextProvider, useContextAuth } from "./context/auth-context";

function App() {
  const { user } = useContextAuth();

  return (
    <AuthContextProvider>
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
    </AuthContextProvider>
  );
}

export default App;

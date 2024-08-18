import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.scss";
import { LoginScreen } from "./screens/login/login";
import { DiscoveryScreen } from "./screens/home/discovery";
import { AppContextProvider } from "./context/app-context";

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/discovery" element={<DiscoveryScreen />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;

import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.scss";
import { LoginScreen } from "./screens/login/login";
import { DiscoveryScreen } from "./screens/home/discovery";
/* import dotenv from "dotenv";

dotenv.config(); */
/*import { initializeApp } from 'firebase/app';

 const firebaseConfig = {
  "apiKey": 'AIzaSyARU9Xw1LUF40ONBjLGHfKSUMaLeSuvg4E',
  "authDomain": "https://wonderful-moss-0ac2b9003.5.azurestaticapps.net",
  "databaseURL": "",
  "projectId": "github-discovery-project",
  "storageBucket": "",
  "messagingSenderId": "",
  "appId": "",
  "measurementId": ""
};

const app = initializeApp(firebaseConfig); */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/discovery" element={<DiscoveryScreen />} />
      </Routes>
    </BrowserRouter>
  );

  /* return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  ) */
}

export default App;

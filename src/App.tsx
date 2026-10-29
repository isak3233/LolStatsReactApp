import { Routes, Route } from "react-router";
import StartPage from "./pages/StartPage";
import SummonerPage from "./pages/SummonerPage"

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/summoner/:summonerGameTag" element={<SummonerPage/>} />
      </Routes>
    </main>
  );
}

export default App;
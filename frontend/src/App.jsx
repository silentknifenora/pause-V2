import { useState } from "react";
import Header from "./components/common/Header";
import InfoCard from "./components/common/InfoCard";
import MoodCheckIn from "./components/mood/MoodCheckIn";
import "./App.css";
function App() {
  const [started, setStarted] = useState(false);
  return (
    <div className="app">

      <div className="card">

       {!started ? (
  <>
    <Header />

    <button
      className="checkin-btn"
      onClick={() => setStarted(true)}
    >
      🌸 Start Today's Check-In
    </button>
  </>
) : (
  <MoodCheckIn />
)}

      </div>

      <InfoCard
    icon="💜"
    title="Continue with Echo"
/>

<InfoCard
    icon="📝"
    title="Today's Reflection"
/>

<InfoCard
    icon="🔥"
    title="Your Journey"
/>

    </div>
  );
}

export default App;
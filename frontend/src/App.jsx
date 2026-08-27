import { useState } from "react";
import MoodCheckIn from "./components/mood/MoodCheckIn";
import HomeScreen from "./components/home/Homescreen";
import ContinueConversation from "./components/continue/ContinueConversation";
import MomentsScreen from "./components/moments/MomentsScreen";
import JourneyScreen from "./components/journey/JourneyScreen";
import BreathingScreen from "./components/breathing/BreathingScreen";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("home");
console.log(screen);
return (
  <div className="app">
    {screen === "home" && (
      <HomeScreen
  onStart={() => setScreen("checkin")}
  onContinue={() => setScreen("continue")}
  onMoments={() => setScreen("moments")}
  onJourney={() => setScreen("journey")}
  onBreathing={() => setScreen("breathing")}
/>
    )}

    {screen === "checkin" && <MoodCheckIn />}

    {screen === "continue" && (
  <ContinueConversation
    onBack={() => setScreen("home")}
  />
)}

   {screen === "moments" && (
  <MomentsScreen
    onBack={() => setScreen("home")}
  />
)}
{screen === "journey" && (
  <JourneyScreen
    onBack={() => setScreen("home")}
  />
)}
{screen === "breathing" && (
  <BreathingScreen
    onBack={() => setScreen("home")}
  />
)}
  </div>
);
}

export default App;
import { useState } from "react";
import MoodCard from "./MoodCard";
import EchoScreen from "../echo/EchoScreen";

function MoodCheckIn() {
  const [selectedMood, setSelectedMood] = useState("");
  const [showEcho, setShowEcho] = useState(false);
  
if (showEcho) {
  return <EchoScreen mood={selectedMood} />;
}
  return (
    <div className="card">

      <h2>How are you arriving today?</h2>

<p>
  Take a slow breath.

Choose the emotion that feels closest to how you're feeling right now.
</p>

      <div>

        <MoodCard
          emoji="😊"
          title="Happy"
          selected={selectedMood === "Happy"}
          onClick={() => setSelectedMood("Happy")}
        />

        <MoodCard
          emoji="😌"
          title="Calm"
          selected={selectedMood === "Calm"}
          onClick={() => setSelectedMood("Calm")}
        />

        <MoodCard
          emoji="😐"
          title="Okay"
          selected={selectedMood === "Okay"}
          onClick={() => setSelectedMood("Okay")}
        />

        <MoodCard
          emoji="😔"
          title="Sad"
          selected={selectedMood === "Sad"}
          onClick={() => setSelectedMood("Sad")}
        />

        <MoodCard
          emoji="😰"
          title="Anxious"
          selected={selectedMood === "Anxious"}
          onClick={() => setSelectedMood("Anxious")}
        />

      </div>

      {selectedMood && (
        <button
  className="checkin-btn"
  onClick={() => setShowEcho(true)}
>
  Continue
</button>
      )}

    </div>
  );
}

export default MoodCheckIn;
import { useState } from "react";
import { NotebookPen } from "lucide-react";
import GratitudeScreen from "../gratitude/GratitudeScreen";
import echoResponses from "../../data/echoResponses";
import ProgressDots from "../common/ProgressDots";

function ReflectionScreen({ mood, journal }) {
  const [showMemoryJar, setShowMemoryJar] = useState(false);

  const moodEmojis = {
    Happy: "😊",
    Calm: "😌",
    Okay: "😐",
    Sad: "😔",
    Anxious: "😰",
  };

  const echoMessage =
    echoResponses[mood] ||
    "Thank you for taking a moment to reflect today.";

  if (showMemoryJar) {
    return <GratitudeScreen />;
  }

  return (
    <div className="card">
      <ProgressDots currentStep={3} />
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <NotebookPen size={22} strokeWidth={2} />
        Reflection
      </h2>

      <p style={{ marginBottom: "30px" }}>
        You took a moment for yourself today.
      </p>

      <div className="reflection-box">
        <h3>Mood</h3>
        <p>
          {moodEmojis[mood]} {mood}
        </p>
      </div>

      <div className="reflection-box">
        <h3>What you shared</h3>
        <p>{journal}</p>
      </div>

      <div className="echo-response">
        <h3>Echo</h3>
        <p>{echoMessage}</p>
      </div>

      <button
        className="checkin-btn"
        onClick={() => setShowMemoryJar(true)}
      >
        Save & Continue
      </button>
    </div>
  );
}

export default ReflectionScreen;
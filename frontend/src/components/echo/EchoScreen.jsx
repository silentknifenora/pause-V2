import ReflectionScreen from "../reflection/ReflectionScreen";
import { useState } from "react";
import { saveNewSession } from "../../utils/memoryStorage";
import ProgressDots from "../common/ProgressDots";
function EchoScreen({ mood }) {
  const [journalText, setJournalText] = useState("");
  const [showReflection, setShowReflection] = useState(false);
  const [echoMessage, setEchoMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    
   if (showReflection) {
  return (
    <ReflectionScreen
      mood={mood}
      journal={journalText}
      echoMessage={echoMessage}
    />
  );
}
  return (
    <div className="card">
      <ProgressDots currentStep={2} />

      <h2>Echo</h2>

      <p>
        Thank you for checking in today.
      </p>

      <h3>You selected: {mood}</h3>

      <p>
        What made today feel that way?
      </p>

      <textarea
  value={journalText}
  onChange={(e) => setJournalText(e.target.value)}
  placeholder="Write anything that's on your mind..."
  rows="6"
/>

<p>You typed:</p>

<p>{journalText}</p>

<button
  className="checkin-btn"
  disabled={isLoading}
  onClick={async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/echo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mood,
          journal: journalText,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Echo could not respond.");
      }

      saveNewSession(mood, journalText);
      setEchoMessage(data.response);
      setShowReflection(true);
    } catch (error) {
  console.error("Echo error:", error);

  setEchoMessage(
    error.message || "Echo could not respond."
  );

  saveNewSession(mood, journalText);
  setShowReflection(true);
  } finally {
      setIsLoading(false);
    }
  }}
>
  {isLoading ? "Echo is listening..." : "Share with Echo"}
</button>

</div>
);
}

export default EchoScreen;
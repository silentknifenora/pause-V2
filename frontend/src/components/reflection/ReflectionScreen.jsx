import { useState } from "react";
import { NotebookPen } from "lucide-react";
import GratitudeScreen from "../gratitude/GratitudeScreen";
import ProgressDots from "../common/ProgressDots";

function ReflectionScreen({ mood, journal, echoMessage }) {
  const [showMemoryJar, setShowMemoryJar] = useState(false);
  const [echoFeedback, setEchoFeedback] = useState(null);

  const moodEmojis = {
    Happy: "😊",
    Calm: "😌",
    Okay: "😐",
    Sad: "😔",
    Anxious: "😰",
  };

  const handleFeedback = (feedback) => {
    setEchoFeedback(feedback);

    localStorage.setItem(
      "echoFeedback",
      JSON.stringify({
        mood,
        feedback,
        echoResponse: echoMessage,
        date: new Date().toISOString(),
      })
    );
  };

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

      {echoMessage && (
        <div className="echo-feedback">
          {!echoFeedback ? (
            <>
              <p>Was Echo helpful?</p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <button
                  type="button"
                  onClick={() => handleFeedback("positive")}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "12px",
                    border: "1px solid #ddd8ec",
                    background: "#faf9fd",
                    cursor: "pointer",
                  }}
                >
                  👍 Yes
                </button>

                <button
                  type="button"
                  onClick={() => handleFeedback("negative")}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "12px",
                    border: "1px solid #ddd8ec",
                    background: "#faf9fd",
                    cursor: "pointer",
                  }}
                >
                  👎 Not really
                </button>
              </div>
            </>
          ) : (
            <p>
              Thanks for the feedback
            </p>
          )}
        </div>
      )}

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
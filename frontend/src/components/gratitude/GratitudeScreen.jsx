import { useState } from "react";
import {
  saveMemory,
  getMemories,
} from "../../utils/gratitudeStorage";
import ProgressDots from "../common/ProgressDots";

function GratitudeScreen() {
  const [memory, setMemory] = useState("");
  const [saved, setSaved] = useState(false);

  const memories = getMemories();

  function handleSave() {
    if (!memory.trim()) return;

    saveMemory(memory.trim());
    setSaved(true);
  }

  // Confirmation screen after saving
  if (saved) {
    return (
      <div className="card">
        <ProgressDots currentStep={4} />
        <h2> Moment Saved</h2>

        <p>Your moment has been added to Moments to Keep.</p>

        <div className="memory-card">
          <p>“{memory}”</p>
        </div>

        <button
          className="checkin-btn"
          onClick={() => window.location.reload()}
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Moments to Keep</h2>

      <p>
        What is one small moment from today that you would
        like to remember?
      </p>

      <textarea
        value={memory}
        onChange={(event) => setMemory(event.target.value)}
        placeholder="Write a moment you would like to keep..."
        rows={4}
      />

      <button
        className="checkin-btn"
        onClick={handleSave}
        disabled={!memory.trim()}
      >
        Save This Moment
      </button>

      <hr />

      <h3>Your Saved Moments</h3>

      {memories.length === 0 ? (
        <p>Your collection is waiting for its first moment 🌱</p>
      ) : (
        memories.map((item, index) => (
          <div key={index} className="memory-card">
            <p>{item.text}</p>
            <small>{item.date}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default GratitudeScreen;
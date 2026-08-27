import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import {
  getLastSession,
  updateLastSession,
} from "../../utils/memoryStorage";

function ContinueConversation({ onBack }) {
  const lastSession = getLastSession();

  const [newThought, setNewThought] = useState("");

  function handleContinue() {
    if (!newThought.trim()) return;

    updateLastSession(
      lastSession.mood,
      `${lastSession.journal}\n\n${newThought}`
    );

    alert("Your reflection has been continued.");

    onBack();
  }

  if (!lastSession) {
    return (
      <div className="card">
        <button
          className="minimal-back-btn"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft size={18} strokeWidth={1.8} />
          <span>Back</span>
        </button>

        <h2 className="screen-heading">
          Continue with Echo
        </h2>

        <p>No previous reflections found.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <button
        className="minimal-back-btn"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft size={18} strokeWidth={1.8} />
        <span>Back</span>
      </button>

      <h2 className="screen-heading">
        Continue with Echo
      </h2>

      <p>Last time you shared:</p>

      <div className="reflection-box">
        <p>{lastSession.journal}</p>
      </div>

      <p>How have things been since then?</p>

      <textarea
        value={newThought}
        onChange={(e) => setNewThought(e.target.value)}
        placeholder="Continue writing..."
      />

      <button
        className="checkin-btn"
        onClick={handleContinue}
      >
        Save Reflection
      </button>
    </div>
  );
}

export default ContinueConversation;
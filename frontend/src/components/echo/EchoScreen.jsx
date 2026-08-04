import ReflectionScreen from "../ReflectionScreen";
import { useState } from "react";
function EchoScreen({ mood }) {
    const [journalText, setJournalText] = useState("");
    const [showReflection, setShowReflection] = useState(false);
    if (showReflection) {
  return (
    <ReflectionScreen
      mood={mood}
      journal={journalText}
    />
  );
}
  return (
    <div className="card">

      <h2>🌸 Echo</h2>

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
    onClick={() => setShowReflection(true)}
>
    Share with Echo
</button>

    </div>
  );
}

export default EchoScreen;
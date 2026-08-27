import { ArrowLeft } from "lucide-react";
import { getJourney } from "../../utils/memoryStorage";

function JourneyScreen({ onBack }) {
  const journey = getJourney();

  const moodEmojis = {
    Happy: "😊",
    Calm: "😌",
    Okay: "😐",
    Sad: "😔",
    Anxious: "😰",
  };

  return (
    <div className="card journey-screen">
      <button
        className="minimal-back-btn"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft size={18} strokeWidth={1.8} />
        <span>Back</span>
      </button>

      <h2 className="screen-heading">
        Your Journey
      </h2>

      <p className="journey-subtitle">
        A quiet look back at how you've been feeling.
      </p>

      {journey.length === 0 ? (
        <div className="empty-state">
          <p>
            Your journey will begin with your first reflection.
          </p>
        </div>
      ) : (
        <div className="journey-list">
          {journey.map((entry, index) => (
            <div
              className="journey-entry"
              key={`${entry.date}-${index}`}
            >
              <div className="journey-header">
                <div className="journey-mood">
                  <span>
                    {moodEmojis[entry.mood] || "•"}
                  </span>

                  <strong>{entry.mood}</strong>
                </div>

                <small>{entry.date}</small>
              </div>

              {entry.journal && (
                <p className="journey-journal">
                  “{entry.journal}”
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JourneyScreen;
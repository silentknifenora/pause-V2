import { ArrowLeft, Bookmark } from "lucide-react";
import { getMemories } from "../../utils/gratitudeStorage";

function MomentsScreen({ onBack }) {
  const memories = getMemories();

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

      <h2 className="screen-title">
        <Bookmark size={21} strokeWidth={1.8} />
        Moments to Keep
      </h2>

      <p className="screen-subtitle">
        Revisit the moments that mattered.
      </p>

      {memories.length === 0 ? (
        <div className="empty-state">
          <p>No moments saved yet.</p>
        </div>
      ) : (
        <div className="moments-list">
          {memories.map((item, index) => (
            <div
              key={`${item.date}-${index}`}
              className="memory-card"
            >
              <p>“{item.text}”</p>
              <small>{item.date}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MomentsScreen;
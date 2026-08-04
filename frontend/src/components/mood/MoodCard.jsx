function MoodCard({ emoji, title, selected, onClick }) {
  return (
    <div
      className={`mood-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="mood-left">
        <span className="emoji">{emoji}</span>

        <div className="mood-text">
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  );
}

export default MoodCard;
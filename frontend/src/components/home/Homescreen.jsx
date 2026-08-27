import Header from "../common/Header";
import InfoCard from "../common/InfoCard";
import {
  MessageCircle,
  Bookmark,
  Route,
} from "lucide-react";

function HomeScreen({
  onStart,
  onContinue,
  onMoments,
  onJourney,
  onBreathing,
}) {
  return (
    <>
      <div className="card">
        <Header />

        <button
          className="checkin-btn"
          onClick={onStart}
        >
          Start Today's Check-In
        </button>
      </div>

      <InfoCard
        icon={<MessageCircle size={18} strokeWidth={1.8} />}
        title="Continue with Echo"
        subtitle="Resume where you left off."
        onClick={onContinue}
      />

      <InfoCard
        icon={<Bookmark size={18} strokeWidth={1.8} />}
        title="Moments to Keep"
        subtitle="Revisit the moments that mattered."
        onClick={onMoments}
      />

      <InfoCard
        icon={<Route size={18} strokeWidth={1.8} />}
        title="Your Journey"
        subtitle="Look back on your emotional journey."
        onClick={onJourney}
      />

      <div
  className="breathing-home-card"
  onClick={onBreathing}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      onBreathing();
    }
  }}
>
  <div className="breathing-mini-visual">
    <div className="breathing-mini-circle" />
  </div>

  <div className="breathing-home-content">
    <span className="breathing-label">TAKE A PAUSE</span>

    <h3>Breathing Pause</h3>

    <p>Take one quiet minute to reset.</p>
  </div>

  <span className="breathing-arrow">→</span>
</div>
    </>
  );
}

export default HomeScreen;
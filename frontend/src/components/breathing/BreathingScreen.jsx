import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

function BreathingScreen({ onBack }) {
  const [phase, setPhase] = useState("Inhale");
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (complete) return;

    const countdown = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          clearInterval(countdown);
          setComplete(true);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [complete]);

  useEffect(() => {
    if (complete) return;

    const duration = phase === "Inhale" ? 4000 : 6000;

    const phaseTimer = setTimeout(() => {
      setPhase((current) =>
        current === "Inhale" ? "Exhale" : "Inhale"
      );
    }, duration);

    return () => clearTimeout(phaseTimer);
  }, [phase, complete]);

  if (complete) {
    return (
      <div className="card breathing-screen">
        <h2>Pause complete</h2>

        <p>
          Take that slower pace with you.
        </p>

        <button
          className="checkin-btn"
          onClick={onBack}
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="card breathing-screen">
      <button
        className="minimal-back-btn"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft size={18} strokeWidth={1.8} />
        <span>Back</span>
      </button>

      <h2>Breathing Pause</h2>

      <p>
        Follow the circle and let your breathing slow down.
      </p>

      <div
        className={`breathing-circle ${
          phase === "Inhale" ? "inhale" : "exhale"
        }`}
      >
        <span>{phase}</span>
      </div>

      <div className="breathing-time">
        0:{String(secondsLeft).padStart(2, "0")}
      </div>

      <p className="breathing-note">
        No need to get it perfect. Just follow along.
      </p>
    </div>
  );
}

export default BreathingScreen;
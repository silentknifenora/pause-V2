import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
} from "lucide-react";

import { getMemories } from "../../utils/gratitudeStorage";

function MomentsScreen({ onBack }) {
  const memories = getMemories();

  const [revealedMemory, setRevealedMemory] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  // Works with both OLD memories and NEW memories
  const memoriesForDate = useMemo(() => {
  if (!selectedDate) return [];

  return memories.filter((item) => {
    // First check the saved dateKey
    if (item.dateKey === selectedDate) {
      return true;
    }

    // Fallback for older memories or timezone-mismatched memories
    const oldDate = new Date(item.date);

    if (isNaN(oldDate.getTime())) {
      return false;
    }

    const year = oldDate.getFullYear();

    const month = String(
      oldDate.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      oldDate.getDate()
    ).padStart(2, "0");

    const localDateKey =
      `${year}-${month}-${day}`;

    return localDateKey === selectedDate;
  });
}, [memories, selectedDate]);

  function revealRandomMemory() {
    if (memories.length === 0) return;

    let randomIndex = Math.floor(
      Math.random() * memories.length
    );

    // Try not to show the same memory twice in a row
    if (
      memories.length > 1 &&
      revealedMemory === memories[randomIndex]
    ) {
      randomIndex =
        (randomIndex + 1) % memories.length;
    }

    setRevealedMemory(memories[randomIndex]);
  }

  return (
    <div className="card moments-screen">

      <button
        className="minimal-back-btn"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft
          size={18}
          strokeWidth={1.8}
        />
        <span>Back</span>
      </button>

      <h2 className="screen-heading">
        Moments to Keep
      </h2>

      <p className="screen-subtitle">
        Little moments worth holding on to.
      </p>

      {memories.length === 0 ? (
        <div className="empty-state">
          <p>
            Your jar is waiting for its first moment.
          </p>
        </div>
      ) : (
        <>

          {/* MEMORY JAR */}

          <div
  className={`memory-jar ${revealedMemory ? "jar-active" : ""}`}
  onClick={revealRandomMemory}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    revealRandomMemory();
  }
}}
>
  <div className="jar-lid" />

  <div className="jar-body">

    <div className="jar-note note-one" />

    {memories.length >= 3 && (
      <div className="jar-note note-two" />
    )}

    {memories.length >= 5 && (
      <div className="jar-note note-three" />
    )}

    {memories.length >= 8 && (
      <div className="jar-note note-four" />
    )}

    {memories.length >= 12 && (
      <div className="jar-note note-five" />
    )}

    {revealedMemory && (
      <div className="floating-note" />
    )}
  </div>
</div>

<div className="jar-instruction">
  <strong>
    {revealedMemory
      ? "Tap again for another moment"
      : "Tap the jar to reveal a moment"}
  </strong>

  <span>
    {memories.length}{" "}
    {memories.length === 1 ? "moment" : "moments"} saved
  </span>
</div>


          {revealedMemory && (
            <div className="revealed-memory">

              <span className="reveal-label">
                A moment from your jar
              </span>

              <p>
                “{revealedMemory.text}”
              </p>

              <small>
                {revealedMemory.date}
              </small>


            </div>
          )}

          {/* DATE BROWSER */}

          <div className="date-browser">

            <div className="date-browser-title">

              <CalendarDays
                size={19}
                strokeWidth={1.8}
              />

              <div>
                <h3>Browse by date</h3>

                <p>
                  Revisit a specific day.
                </p>
              </div>

            </div>

            <input
              className="memory-date-input"
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(e.target.value)
              }
            />

            {selectedDate && (
              <div className="date-results">

                {memoriesForDate.length === 0 ? (
                  <p>
                    No saved moments on this date.
                  </p>
                ) : (
                  memoriesForDate.map(
                    (item, index) => (
                      <div
                        key={`${item.date}-${index}`}
                        className="date-memory"
                      >
                        <p>
                          “{item.text}”
                        </p>
                      </div>
                    )
                  )
                )}

              </div>
            )}

          </div>

        </>
      )}

    </div>
  );
}

export default MomentsScreen;
import { getGratitudeJar } from "../../utils/gratitudeStorage";

function GratitudeJar() {
  const entries = getGratitudeJar();

  return (
    <div className="card">

      <h2>🫙 Gratitude Jar</h2>

      {entries.length === 0 ? (
        <p>Your jar is waiting for its first memory.</p>
      ) : (
        entries.map((item, index) => (
          <div key={index} className="reflection-box">
            <strong>{item.date}</strong>

            <p>{item.text}</p>
          </div>
        ))
      )}

    </div>
  );
}

export default GratitudeJar;
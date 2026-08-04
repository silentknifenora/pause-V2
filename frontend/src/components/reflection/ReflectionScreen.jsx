function ReflectionScreen({ mood, journal }) {
  return (
    <div className="card">

      <h2>🌸 Echo</h2>

      <p>
        Thank you for trusting me with your thoughts today.
      </p>

      <div className="reflection-box">

        <h3>Your Mood</h3>
        <p>{mood}</p>

        <h3>What You Shared</h3>

        <p>{journal}</p>

      </div>

      <div className="echo-response">

        <h3>Echo</h3>

        <p>
          Sometimes simply showing up for yourself is enough.
          Thank you for taking this moment.
        </p>

      </div>

      <button className="checkin-btn">
        Continue
      </button>

    </div>
  );
}

export default ReflectionScreen;
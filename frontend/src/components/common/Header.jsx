import { getLastSession } from "../../utils/memoryStorage";

function Header() {
  const lastSession = getLastSession();

  return (
    <>
      <h1>PAUSE</h1>

      {lastSession ? (
        <>
          <h2>Welcome back</h2>

          <p
            style={{
              marginBottom: "28px",
              color: "#70766F",
            }}
          >
            Take a moment before the world asks for your attention.
          </p>

          <div className="reflection-box">
            <h3>Last Reflection</h3>

            <p>
              {lastSession.journal
                ? `"${lastSession.journal}"`
                : "Ready for today's check-in?"}
            </p>
          </div>
        </>
      ) : (
        <>
          <h2>Good Morning</h2>

          <p
            style={{
              marginBottom: "28px",
              color: "#70766F",
            }}
          >
            Take a moment before the world asks for your attention.
          </p>
        </>
      )}
    </>
  );
}

export default Header;
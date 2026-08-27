export function saveNewSession(mood, journal) {
  const session = {
    mood,
    journal,
    date: new Date().toLocaleDateString(),
  };

  localStorage.setItem(
    "lastSession",
    JSON.stringify(session)
  );

  const history =
    JSON.parse(localStorage.getItem("journey")) || [];

  history.unshift(session);

  localStorage.setItem(
    "journey",
    JSON.stringify(history)
  );
}

export function updateLastSession(mood, journal) {
  const updatedSession = {
    mood,
    journal,
    date: new Date().toLocaleDateString(),
  };

  localStorage.setItem(
    "lastSession",
    JSON.stringify(updatedSession)
  );
}

export function getLastSession() {
  return JSON.parse(
    localStorage.getItem("lastSession")
  );
}

export function getJourney() {
  return (
    JSON.parse(localStorage.getItem("journey")) || []
  );
}
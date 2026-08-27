function getLocalDateKey(date) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function saveMemory(memory) {
  const existing =
    JSON.parse(localStorage.getItem("gratitudeJar")) || [];

  const now = new Date();

  existing.push({
    text: memory,
    date: now.toLocaleDateString(),
    dateKey: getLocalDateKey(now),
  });

  localStorage.setItem(
    "gratitudeJar",
    JSON.stringify(existing)
  );
}

export function getMemories() {
  return (
    JSON.parse(localStorage.getItem("gratitudeJar")) || []
  );
}
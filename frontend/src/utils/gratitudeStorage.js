export function saveMemory(memory) {
  const existing =
    JSON.parse(localStorage.getItem("gratitudeJar")) || [];

  existing.push({
    text: memory,
    date: new Date().toLocaleDateString(),
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
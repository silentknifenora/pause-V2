export function saveGratitude(entry) {
  const existing =
    JSON.parse(localStorage.getItem("gratitudeJar")) || [];

  existing.push({
    text: entry,
    date: new Date().toLocaleDateString()
  });

  localStorage.setItem(
    "gratitudeJar",
    JSON.stringify(existing)
  );
}

export function getGratitudeJar() {
  return (
    JSON.parse(localStorage.getItem("gratitudeJar")) || []
  );
}

export function getData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeData(key) {
  localStorage.removeItem(key);
}

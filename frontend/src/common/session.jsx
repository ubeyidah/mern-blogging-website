export function setSession(value) {
  const key = "user";
  const now = new Date();
  const expirationDate = new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000); // 21 days from now

  const item = {
    value: value,
    expiresAt: expirationDate.toISOString(),
  };

  localStorage.setItem(key, JSON.stringify(item));
}

export function getSession(key = "user") {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (new Date(item.expiresAt) < now) {
    // Item has expired
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}
export function deleteSession(key = "user") {
  localStorage.removeItem(key);
}

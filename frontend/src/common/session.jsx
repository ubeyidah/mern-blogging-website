export function setSession(value) {
  const key = "user";
  const now = new Date();
  const expirationDate = new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000); // 21 days from now

  const item = {
    value: value,
    expiresAt: expirationDate.toISOString(),
  };

  sessionStorage.setItem(key, JSON.stringify(item));
}

export function getSession(key = "user") {
  const itemStr = sessionStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (new Date(item.expiresAt) < now) {
    // Item has expired
    sessionStorage.removeItem(key);
    return null;
  }

  return item.value;
}
export function deleteSession(key = "user") {
  sessionStorage.removeItem(key);
}

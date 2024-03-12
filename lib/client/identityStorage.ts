const key = 'identity';

export function getIdentity() {
  const identity = sessionStorage.getItem(key);

  if (!identity) {
    return {};
  }

  try {
    return JSON.parse(identity) as object;
  } catch {
    return {};
  }
}

export function setIdentity(identity: object) {
  sessionStorage.setItem(key, JSON.stringify(identity));
}

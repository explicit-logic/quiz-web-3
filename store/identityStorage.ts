const key = 'identity';

const isClient = typeof window !== 'undefined';

export function getIdentity() {
  if (!isClient) {
    return {};
  }

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
  if (isClient) {
    sessionStorage.setItem(key, JSON.stringify(identity));
  }
}

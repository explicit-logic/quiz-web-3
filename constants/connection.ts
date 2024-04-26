export const STATES = Object.freeze({
  OFFLINE: 0,
  ERROR: 1,
  LOADING: 2,
  ONLINE: 3,
} as const);

export const EVENTS = Object.freeze({
  CLOSE: 'CONNECTION:CLOSE',
  ERROR: 'CONNECTION:ERROR',
  LOADING: 'CONNECTION:LOADING',
  OPEN: 'CONNECTION:OPEN',
  MESSAGE: 'CONNECTION:MESSAGE',
} as const);

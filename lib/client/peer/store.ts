import { isClient } from '@/constants/isClient';
import type { DataConnection, Peer } from 'peerjs';

const receiverKey = 'receiver-id';
const clientKey = 'client-id';

let _receiver: DataConnection | undefined;
let _sender: Peer | undefined;

export function getClientId(): string | null {
  if (!isClient) {
    return null;
  }

  return sessionStorage.getItem(clientKey);
}

export function getReceiverId(): string | null {
  if (!isClient) {
    return null;
  }

  return sessionStorage.getItem(receiverKey);
}

export function setClientId(clientId: string) {
  if (isClient) {
    sessionStorage.setItem(clientKey, clientId);
  }
}

export function setReceiverId(receiverId: string) {
  if (isClient) {
    sessionStorage.setItem(receiverKey, receiverId);
  }
}

export function getReceiver() {
  return _receiver;
}

export function setReceiver(receiver: DataConnection | undefined) {
  _receiver = receiver;
}

export function getSender() {
  return _sender;
}

export function setSender(sender: Peer | undefined) {
  _sender = sender;
}

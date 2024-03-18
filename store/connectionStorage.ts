import { isClient } from '@/constants/isClient';
import { type DataConnection } from 'peerjs';

const receiverKey = 'receiver-id';
const senderKey = 'sender-id';

let _receiver: DataConnection | undefined;

export function getSenderId(): string | null {
  if (!isClient) {
    return null;
  }

  return sessionStorage.getItem(senderKey);
}

export function getReceiverId(): string | null {
  if (!isClient) {
    return null;
  }

  return sessionStorage.getItem(receiverKey);
}

export function setReceiverId(receiverId: string) {
  if (isClient) {
    sessionStorage.setItem(receiverKey, receiverId);
  }
}

export function setSenderId(senderId: string) {
  if (isClient) {
    sessionStorage.setItem(senderKey, senderId);
  }
}

export function getReceiver() {
  return _receiver;
}

export function setReceiver(receiver: DataConnection | undefined) {
  _receiver = receiver;
}

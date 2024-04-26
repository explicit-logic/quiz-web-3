import Peer, { type DataConnection, } from 'peerjs';

// Constants
import { EVENTS } from '@/constants/connection';
import { TYPES } from '@/constants/message';

// Lib
import { eventEmitter } from '@/lib/client/eventEmitter';

// Senders
import { sendConnect } from './senders/sendConnect';

// Store
import {
  getReceiver,
  setReceiver,
  setSender,
  getClientId,
  setClientId,
} from './store';

const TIMEOUT = 60_000;

let connected = false;

type Params = { locale: string, pathname: string, receiverId: string };

type Callbacks = {
  onClose?: () => void,
  onError?: (error: Error) => void,
  onOpen?: () => void,
  onMessage?: (message: Message) => void,
};

export async function connect({ locale, pathname, receiverId }: Params, callbacks?: Callbacks) {
  const {
    onClose = () => {},
    onError = () => {},
    onOpen = () => {},
    onMessage = () => {},
  } = callbacks ?? {};
  const cachedReceiver = getReceiver();
  if (cachedReceiver) throw new Error('Connection existed');

  eventEmitter.emit(EVENTS.LOADING);

  const cachedClientId = getClientId();

  const sender = new Peer();
  setSender(sender);

  const close = () => {
    reset();
    onClose();
    eventEmitter.emit(EVENTS.CLOSE);
  };
  const errorHandler = (error: Error) => {
    reset();
    onError(error);
    eventEmitter.emit(EVENTS.ERROR, error);
  };
  sender
    .on('close', close)
    .on('disconnected', close)
    .on('error', errorHandler);

  const senderId = await promiseWithTimeout<string>(TIMEOUT, (resolve) => sender.on('open', (id) => resolve(id)));

  console.log('Sender ID: ', senderId);

  const receiver: DataConnection = sender.connect(receiverId, {reliable: true});
  setReceiver(receiver);

  await promiseWithTimeout(TIMEOUT, (resolve) => receiver.on('open', () => resolve()));

  receiver
    .on('close', close)
    .on('error', errorHandler)
    .on('data', (data) => {
      const message = data as Message;

      if (message.type === TYPES.init) {
        const { clientId } = message.data;
        setClientId(clientId);
        connected = true;
      } else {
        onMessage(message);
        eventEmitter.emit(EVENTS.MESSAGE, message);
      }
    });

  await sendConnect({ clientId: cachedClientId ?? undefined, locale, pathname });

  await waitForConnect();

  onOpen();
  eventEmitter.emit(EVENTS.OPEN);

  return { receiver, sender };
}

function reset() {
  setSender(undefined);
  setReceiver(undefined);
}

/*
  Exception listeners

  Sender: close, disconnected, error

  Receiver: close, error
*/

function promiseWithTimeout<T = void>(timeout: number, callback: (resolve: (value: T) => void, reject: (reason?: any) => void) => void): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Promise timed out after ${timeout} ms`));
    }, timeout);

    callback(
      (value: T) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

function waitForConnect() {
  return new Promise(function (resolve, reject) {
    let i = 0;
    (function waitFor() {
      i++;
      if (connected) return resolve(connected);
      if (i > 1000) return reject();
      setTimeout(waitFor, 100);
    })();
  });
}



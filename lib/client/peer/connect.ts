import Peer, { type DataConnection } from 'peerjs';

// Senders
import { sendInit } from './senders/sendInit';

// Store
import { getReceiver, setReceiver, getSenderId, setSenderId } from './store';

type Params = { locale: string, receiverId: string };

export async function connect({ locale, receiverId }: Params) {
  const cachedReceiver = getReceiver();
  if (cachedReceiver) throw new Error('Connection existed');

  const cachedSenderId = getSenderId();

  // const sender = cachedSenderId ? new Peer(cachedSenderId) : new Peer();
  const sender = new Peer();

  const senderId = await (new Promise<string>((resolve, reject) => {
    sender
      .on('open', (id) => resolve(id))
      .on('error', (err) => {
        console.log(err);
        reject(err);
      });
  }));

  console.log('Sender ID: ', senderId);
  if (!cachedSenderId) {
    setSenderId(senderId);
  }

  await sendInit({ locale });

  const receiver: DataConnection = sender.connect(receiverId, {reliable: true});
  setReceiver(receiver);

  await (new Promise<void>((resolve, reject) => {
    receiver
      .on('open', resolve)
      .on('close', () => {
        console.log('Connection closed: ', receiverId);
        setReceiver(undefined);
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      });
  }));

  return receiver;
}



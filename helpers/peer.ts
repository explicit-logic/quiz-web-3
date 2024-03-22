import Peer, { type DataConnection } from 'peerjs';

// Store
import { getSenderId, setSenderId } from '@/lib/client/peer/store';

let peer: Peer | undefined;
const connectionMap: Map<string, DataConnection> = new Map<string, DataConnection>();

export interface Data {
  type: string;
  message: string;
}

export const PeerConnection = {
  getPeer: () => peer,
  startPeerSession: () => new Promise<string>((resolve, reject) => {
    if (peer?.id) {
      return resolve(peer.id);
    }
    try {
      const senderId = getSenderId();
      peer = senderId ? new Peer(senderId) : new Peer();
      peer.on('open', (id) => {
        console.log(`My ID: ${id}`);
        setSenderId(id);
        resolve(id);
      }).on('error', (err) => {
        console.log(err);
        reject(err);
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  }),
  closePeerSession: () => new Promise<void>((resolve, reject) => {
    try {
      if (peer) {
        peer.destroy();
        peer = undefined;
      }
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  }),
  connectPeer: (id: string) => new Promise<void>((resolve, reject) => {
    if (!peer) {
      reject(new Error('Peer doesn\'t start yet'));
      return;
    }
    if (connectionMap.has(id)) {
      reject(new Error('Connection existed'));
      return;
    }
    try {
      const conn = peer.connect(id, {reliable: true});
      if (!conn) {
        reject(new Error('Connection can\'t be established'));
      } else {
        conn.on('open', () => {
          console.log(`Connect to: ${id}`);
          connectionMap.set(id, conn);
          resolve();
        }).on('error', (err) => {
          console.log(err);
          reject(err);
        });
      }
    } catch (err) {
      reject(err);
    }
  }),
  onIncomingConnection: (callback: (conn: DataConnection) => void) => {
    peer?.on('connection', (conn) => {
      console.log(`Incoming connection: ${conn.peer}`);
      connectionMap.set(conn.peer, conn);
      callback(conn);
    });
  },
  onConnectionDisconnected: (id: string, callback: () => void) => {
    if (!peer) {
      throw new Error('Peer doesn\'t start yet');
    }
    if (!connectionMap.has(id)) {
      throw new Error('Connection didn\'t exist');
    }
    const conn = connectionMap.get(id);
    if (conn) {
      conn.on('close', () => {
        console.log(`Connection closed: ${id}`);
        connectionMap.delete(id);
        callback();
      });
    }
  },
  sendConnection: (id: string, data: Data): Promise<void> => new Promise((resolve, reject) => {
    if (!connectionMap.has(id)) {
      reject(new Error('Connection didn\'t exist'));
    }
    try {
      const conn = connectionMap.get(id);
      if (conn) {
        void conn.send(data);
      }
    } catch (err) {
      reject(err);
    }
    resolve();
  }),
  onConnectionReceiveData: (id: string, callback: (f: Data) => void) => {
    if (!peer) {
      throw new Error('Peer doesn\'t start yet');
    }
    if (!connectionMap.has(id)) {
      throw new Error('Connection didn\'t exist');
    }
    const conn = connectionMap.get(id);
    if (conn) {
      conn.on('data', (receivedData) => {
        console.log(`Receiving data from ${id}`);
        console.log(receivedData);
        const data = receivedData as Data;
        callback(data);
      });
    }
  }
};

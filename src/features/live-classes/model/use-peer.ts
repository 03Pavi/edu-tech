
import { useEffect, useState, useRef, useCallback } from 'react';
import Peer, { DataConnection } from 'peerjs';

export const usePeer = (role: 'teacher' | 'student', classId: string, userName?: string) => {
  const [peerId, setPeerId] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [connections, setConnections] = useState<DataConnection[]>([]);
  const [incomingMessage, setIncomingMessage] = useState<{ user: string, msg: string, time: string, type?: 'chat' | 'join' } | null>(null);

  const peerRef = useRef<Peer | null>(null);
  const connectionsRef = useRef<DataConnection[]>([]);

  const setupDataConnection = (conn: DataConnection) => {
    conn.on('open', () => {
      // If student, send join message immediately
      if (role === 'student') {
        conn.send({ type: 'join', user: userName || 'Student' });
      }

      connectionsRef.current = [...connectionsRef.current, conn];
      setConnections([...connectionsRef.current]);
    });

    conn.on('data', (data: any) => {
      if (data && data.type) {
        setIncomingMessage({
          user: data.user,
          msg: data.msg || (data.type === 'join' ? 'joined the class' : ''),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: data.type
        });

        // Teacher broadcasts to all other students
        if (role === 'teacher') {
          connectionsRef.current.forEach(c => {
            if (c.peer !== conn.peer) {
              c.send(data);
            }
          });
        }
      }
    });

    conn.on('close', () => {
      connectionsRef.current = connectionsRef.current.filter(c => c.peer !== conn.peer);
      setConnections([...connectionsRef.current]);
    });
  };

  useEffect(() => {
    const myId = role === 'teacher' ? `${classId}-teacher` : `${classId}-student-${Math.floor(Math.random() * 100000)}`;
    const peer = new Peer(myId);
    peerRef.current = peer;

    peer.on('open', (id) => {
      setPeerId(id);
      if (role === 'student') {
        const teacherPeerId = `${classId}-teacher`;

        // Setup Call
        const call = peer.call(teacherPeerId, new MediaStream());
        call.on('stream', (remote) => {
          setRemoteStream(remote);
        });

        // Setup Data Connection
        const conn = peer.connect(teacherPeerId);
        setupDataConnection(conn);
      }
    });

    peer.on('connection', (conn) => {
      setupDataConnection(conn);
    });

    if (role === 'teacher') {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((myStream) => {
        setStream(myStream);
        peer.on('call', (call) => {
          call.answer(myStream);
        });
      }).catch(err => console.error("Failed to get local stream", err));
    }

    return () => {
      peer.destroy();
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [role, classId]);

  const sendMessage = useCallback((msg: string, user: string) => {
    const data = { type: 'chat', user, msg };
    connectionsRef.current.forEach(conn => {
      if (conn.open) {
        conn.send(data);
      }
    });
    // Set local message for UI immediately if needed, but LiveStream handles this.
  }, []);

  return { peerId, stream, remoteStream, sendMessage, incomingMessage, connections };
};

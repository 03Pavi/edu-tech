
import { useEffect, useState, useRef } from 'react';
import Peer from 'peerjs';

export const usePeer = (role: 'teacher' | 'student', classId: string) => {
  const [peerId, setPeerId] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerRef = useRef<Peer | null>(null);

  useEffect(() => {
    const myId = role === 'teacher' ? `${classId}-teacher` : `${classId}-student-${Math.floor(Math.random() * 10000)}`;
    const peer = new Peer(myId);
    peerRef.current = peer;

    peer.on('open', (id) => {
      setPeerId(id);
      if (role === 'student') {
        const teacherPeerId = `${classId}-teacher`;
        const call = peer.call(teacherPeerId, new MediaStream());
        call.on('stream', (remote) => {
          setRemoteStream(remote);
        });
      }
    });

    if (role === 'teacher') {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((myStream) => {
        setStream(myStream);
        // Listen for calls from students
        peer.on('call', (call) => {
          call.answer(myStream); // Send teacher's stream to student
        });
      });
    }

    return () => {
      peer.destroy();
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [role, classId]);

  return { peerId, stream, remoteStream };
};

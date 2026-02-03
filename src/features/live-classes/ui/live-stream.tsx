
import React, { useEffect, useRef } from 'react';
import { Box, Typography, Stack, Avatar, Paper, TextField, IconButton } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import styles from './live-classes.module.scss';
import { usePeer } from '../model/use-peer';

interface LiveStreamProps {
  role: 'teacher' | 'student';
  classId: string;
}

export const LiveStream: React.FC<LiveStreamProps> = ({ role, classId }) => {
  const { stream, remoteStream } = usePeer(role, classId);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = role === 'teacher' ? stream : remoteStream;
    }
  }, [stream, remoteStream, role]);

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ height: '70vh' }}>
      {/* Video Area */}
      <Box sx={{ flex: 1, position: 'relative', bgcolor: '#000', borderRadius: '16px', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={role === 'teacher'}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box className={styles.liveBadge}>LIVE</Box>
        <Box className={styles.teacherOverlay}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ border: '2px solid white' }}>T</Avatar>
            <Box>
              <Typography sx={{ color: 'white', fontWeight: 800 }}>Prof. Rajesh Kumar</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>Mathematics Expert</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* Chat Area */}
      <Paper className={styles.chatContainer}>
        <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid #F1F5F9', fontWeight: 800 }}>
          Live Chat
        </Typography>
        <Box className={styles.chatMessages}>
          {[
            { user: 'Amit', msg: 'Sir, can you explain the theorem again?' },
            { user: 'Priya', msg: 'The audio is clear now.' },
            { user: 'Suresh', msg: 'When will the next class be?' },
          ].map((chat, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography variant="caption" fontWeight="800" color="primary">{chat.user}</Typography>
              <Typography variant="body2">{chat.msg}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ p: 2, borderTop: '1px solid #F1F5F9' }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Type a message..."
            InputProps={{
              endAdornment: (
                <IconButton color="primary">
                  <SendRoundedIcon />
                </IconButton>
              )
            }}
          />
        </Box>
      </Paper>
    </Stack>
  );
};

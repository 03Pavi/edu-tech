import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Stack, Avatar, Paper, TextField, IconButton, Button, Tab, Tabs } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import styles from './live-classes.module.scss';
import { usePeer } from '../model/use-peer';

interface LiveStreamProps {
  role: 'teacher' | 'student';
  classId: string;
}

export const LiveStream: React.FC<LiveStreamProps> = ({ role, classId }) => {
  const { stream, remoteStream } = usePeer(role, classId);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = role === 'teacher' ? stream : remoteStream;
    }
  }, [stream, remoteStream, role]);

  const handleToggleRecord = () => {
    setIsRecording(!isRecording);
  };

  return (
    <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ height: { lg: '75vh', xs: 'auto' } }}>
      {/* Video Area */}
      <Box sx={{ flex: 1, position: 'relative', bgcolor: '#000', borderRadius: '16px', overflow: 'hidden', minHeight: '400px' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={role === 'teacher'} // Teacher mutes self playback to avoid echo
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box className={styles.liveBadge}>LIVE</Box>

        {/* Recording Indicator */}
        {isRecording && (
          <Box sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: 'rgba(0,0,0,0.6)',
            color: '#EF4444',
            px: 1.5,
            py: 0.5,
            borderRadius: '8px',
            fontWeight: 700
          }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#EF4444', animation: 'pulse 1.5s infinite' }} />
            REC
          </Box>
        )}

        {/* Teacher Controls Overlay */}
        {role === 'teacher' && (
          <Box sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 2,
            backgroundColor: 'rgba(0,0,0,0.6)',
            p: 1,
            borderRadius: '12px'
          }}>
            <Button
              variant="contained"
              color={isRecording ? 'error' : 'inherit'}
              startIcon={isRecording ? <StopCircleRoundedIcon /> : <RadioButtonCheckedRoundedIcon sx={{ color: '#EF4444' }} />}
              onClick={handleToggleRecord}
              sx={{ whiteSpace: 'nowrap' }}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
          </Box>
        )}

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

      {/* Side Panel (Chat & Notes) */}
      <Paper className={styles.chatContainer} sx={{ width: { lg: '350px', xs: '100%' }, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="fullWidth">
            <Tab icon={<ChatBubbleRoundedIcon fontSize="small" />} label="Chat" sx={{ textTransform: 'none', fontWeight: 700 }} />
            <Tab icon={<DescriptionRoundedIcon fontSize="small" />} label="Class Notes" sx={{ textTransform: 'none', fontWeight: 700 }} />
          </Tabs>
        </Box>

        {/* Chat Tab */}
        <Box role="tabpanel" hidden={activeTab !== 0} sx={{ flex: 1, display: activeTab === 0 ? 'flex' : 'none', flexDirection: 'column', height: '100%' }}>
          <Box className={styles.chatMessages} sx={{ flex: 1, overflowY: 'auto' }}>
            {[
              { user: 'Amit', msg: 'Sir, can you explain the theorem again?' },
              { user: 'Priya', msg: 'The audio is clear now.' },
              { user: 'Suresh', msg: 'When will the next class be?' },
              { user: 'Rahul', msg: 'Please check the notes tab sir.' },
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
        </Box>

        {/* Notes Tab */}
        <Box role="tabpanel" hidden={activeTab !== 1} sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
            Resources for this class
          </Typography>
          <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', display: 'flex', alignItems: 'center', gap: 2 }}>
              <DescriptionRoundedIcon color="primary" />
              <Box>
                <Typography variant="body2" fontWeight="700">Lecture Slides.pdf</Typography>
                <Typography variant="caption" color="text.secondary">2.5 MB</Typography>
              </Box>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', display: 'flex', alignItems: 'center', gap: 2 }}>
              <DescriptionRoundedIcon color="primary" />
              <Box>
                <Typography variant="body2" fontWeight="700">Formula Sheet.pdf</Typography>
                <Typography variant="caption" color="text.secondary">500 KB</Typography>
              </Box>
            </Paper>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
};

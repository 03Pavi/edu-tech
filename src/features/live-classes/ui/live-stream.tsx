import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Stack, Avatar, Paper, TextField, IconButton, Button, Tab, Tabs } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import styles from './live-classes.module.scss';
import { usePeer } from '../model/use-peer';
import { useAppSelector } from '@/store/hooks';

interface LiveStreamProps {
  role: 'teacher' | 'student';
  classId: string;
}

export const LiveStream: React.FC<LiveStreamProps> = ({ role, classId }) => {
  const user = useAppSelector((state) => state.user);
  const { stream, remoteStream, sendMessage, incomingMessage, connections } = usePeer(role, classId, user.name);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [message, setMessage] = useState('');
  const [hasJoined, setHasJoined] = useState(role === 'teacher');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (incomingMessage) {
      setMessages((prev) => [...prev, incomingMessage]);
    }
  }, [incomingMessage]);

  useEffect(() => {
    if (videoRef.current && hasJoined) {
      videoRef.current.srcObject = role === 'teacher' ? stream : remoteStream;
    }
  }, [stream, remoteStream, role, hasJoined]);

  const handleToggleRecord = () => {
    setIsRecording(!isRecording);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      user: user.name || 'Anonymous',
      msg: message,
      time,
      type: 'chat'
    };

    sendMessage(message, user.name || 'Anonymous');
    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
  };

  return (
    <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ height: { lg: '75vh', xs: 'auto' } }}>
      {/* Video Area */}
      <Box sx={{ flex: 1, position: 'relative', bgcolor: '#000', borderRadius: '16px', overflow: 'hidden', minHeight: '400px' }}>
        {!hasJoined ? (
          <Box sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0,0,0,0.8)',
            zIndex: 10,
            textAlign: 'center',
            p: 4
          }}>
            <Typography variant="h5" color="white" fontWeight="800" sx={{ mb: 2 }}>Ready to join the class?</Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrowRoundedIcon />}
              onClick={() => setHasJoined(true)}
              sx={{ bgcolor: '#1CB068', px: 4, py: 1.5, borderRadius: '12px', fontWeight: 900 }}
            >
              Join Room
            </Button>
          </Box>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={role === 'teacher'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}

        <Box className={styles.liveBadge}>LIVE</Box>

        {/* Recording Controls at Right Top */}
        <Box sx={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 1 }}>
          {isRecording && (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'rgba(239, 68, 68, 0.9)',
              color: 'white',
              px: 1.5,
              py: 0.5,
              borderRadius: '8px',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
            }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'white', animation: 'blink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              REC
            </Box>
          )}

          {role === 'teacher' && hasJoined && (
            <Button
              variant="contained"
              size="small"
              color={isRecording ? 'error' : 'inherit'}
              startIcon={isRecording ? <StopCircleRoundedIcon /> : <RadioButtonCheckedRoundedIcon sx={{ color: isRecording ? 'white' : '#EF4444' }} />}
              onClick={handleToggleRecord}
              sx={{
                bgcolor: isRecording ? '#EF4444' : 'rgba(255,255,255,0.9)',
                color: isRecording ? 'white' : '#000',
                fontWeight: 800,
                borderRadius: '8px',
                '&:hover': { bgcolor: isRecording ? '#DC2626' : 'white' }
              }}
            >
              {isRecording ? 'Stop' : 'Start Recording'}
            </Button>
          )}
        </Box>

        <Box className={styles.teacherOverlay}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ border: '2px solid white', bgcolor: '#1CB068' }}>R</Avatar>
            <Box>
              <Typography sx={{ color: 'white', fontWeight: 800 }}>Prof. Rajesh Kumar</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Mathematics Expert • {connections.length + 1} Viewing
              </Typography>
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
          <Box className={styles.chatMessages} sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
            {messages.map((chat, i) => (
              <Box key={i} sx={{
                mb: 2,
                alignSelf: chat.type === 'join' ? 'center' : (chat.user === user.name ? 'flex-end' : 'flex-start'),
                width: chat.type === 'join' ? '100%' : 'auto',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {chat.type === 'join' ? (
                  <Typography variant="caption" sx={{ textAlign: 'center', color: 'text.secondary', bgcolor: '#F1F5F9', py: 0.5, px: 2, borderRadius: '20px', alignSelf: 'center', fontWeight: 600 }}>
                    {chat.user === user.name ? 'You' : chat.user} joined the class
                  </Typography>
                ) : (
                  <>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5, alignSelf: chat.user === user.name ? 'flex-end' : 'flex-start' }}>
                      <Typography variant="caption" fontWeight="900" color={chat.user === user.name ? 'secondary' : 'primary'}>
                        {chat.user === user.name ? 'You' : chat.user}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '10px' }}>
                        {chat.time}
                      </Typography>
                    </Stack>
                    <Box sx={{
                      bgcolor: chat.user === user.name ? 'rgba(28, 176, 104, 0.1)' : '#F1F5F9',
                      p: 1.5,
                      borderRadius: '12px',
                      borderTopLeftRadius: chat.user === user.name ? '12px' : '2px',
                      borderTopRightRadius: chat.user === user.name ? '2px' : '12px',
                      maxWidth: '280px',
                      alignSelf: chat.user === user.name ? 'flex-end' : 'flex-start'
                    }}>
                      <Typography variant="body2" sx={{ lineHeight: 1.4 }}>{chat.msg}</Typography>
                    </Box>
                  </>
                )}
              </Box>
            ))}
          </Box>
          <Box sx={{ p: 2, borderTop: '1px solid #F1F5F9' }}>
            <TextField
              fullWidth
              size="small"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  bgcolor: '#F8FAFC'
                }
              }}
              InputProps={{
                endAdornment: (
                  <IconButton color="primary" onClick={handleSendMessage} disabled={!message.trim()}>
                    <SendRoundedIcon />
                  </IconButton>
                )
              }}
            />
          </Box>
        </Box>

        {/* Notes Tab */}
        <Box role="tabpanel" hidden={activeTab !== 1} sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, fontWeight: 700 }}>
            Session Resources
          </Typography>
          <Stack spacing={2}>
            {[
              { name: 'Lecture Slides.pdf', size: '2.5 MB', type: 'Slides' },
              { name: 'Formula Sheet.pdf', size: '500 KB', type: 'Reference' },
              { name: 'Assignment-01.pdf', size: '1.2 MB', type: 'Homework' }
            ].map((note, i) => (
              <Paper key={i} variant="outlined" sx={{
                p: 2,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                transition: 'all 0.2s',
                '&:hover': { bgcolor: '#F8FAFC', borderColor: '#1CB068' },
                cursor: 'pointer'
              }}>
                <Box sx={{ bgcolor: 'rgba(28, 176, 104, 0.1)', p: 1, borderRadius: '8px' }}>
                  <DescriptionRoundedIcon sx={{ color: '#1CB068' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight="800">{note.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{note.type} • {note.size}</Typography>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
};

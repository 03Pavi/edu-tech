import React from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import styles from './notes.module.scss';

interface Note {
  id: number;
  title: string;
  course: string;
  date: string;
  size: string;
  type: 'notes' | 'dpp';
}

interface NotesListProps {
  type: 'notes' | 'dpp';
}

export const NotesList: React.FC<NotesListProps> = ({ type }) => {
  const mockNotes: Note[] = [
    { id: 1, title: 'Calculus Fundamentals', course: 'SSC CGL 2024', date: '2 days ago', size: '2.4 MB', type: 'notes' },
    { id: 2, title: 'Indian History Timeline', course: 'RRB NTPC', date: '5 days ago', size: '1.1 MB', type: 'notes' },
    { id: 3, title: 'English Grammar Rules', course: 'IBPS PO', date: '1 week ago', size: '850 KB', type: 'notes' },
    { id: 4, title: 'Current Affairs - Jan', course: 'All Exams', date: '2 weeks ago', size: '3.2 MB', type: 'notes' },
    { id: 5, title: 'DPP: Algebra Set 1', course: 'SSC CGL 2024', date: 'Yesterday', size: '500 KB', type: 'dpp' },
    { id: 6, title: 'DPP: History Quiz', course: 'RRB NTPC', date: '3 days ago', size: '300 KB', type: 'dpp' },
    { id: 7, title: 'DPP: Logical Reasoning', course: 'Banking', date: 'Today', size: '450 KB', type: 'dpp' },
  ];

  const filteredNotes = mockNotes.filter(note => note.type === type);

  if (filteredNotes.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
        <Typography>No {type === 'dpp' ? 'Daily Practice Problems' : 'Class Notes'} available yet.</Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.notesGrid}>
      {filteredNotes.map((note) => (
        <Paper key={note.id} className={styles.noteCard} sx={{ p: 3, borderRadius: '16px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box className={styles.iconBox}>
              {type === 'dpp' ? <AssignmentIcon /> : <DescriptionRoundedIcon />}
            </Box>
            <Chip
              label={type === 'dpp' ? 'DPP' : 'PDF'}
              size="small"
              sx={{
                bgcolor: type === 'dpp' ? 'rgba(245, 158, 11, 0.1)' : '#F1F5F9',
                fontWeight: 600,
                color: type === 'dpp' ? '#F59E0B' : '#64748B'
              }}
            />
          </Box>

          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, lineHeight: 1.3 }}>
            {note.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {note.course} • {note.date}
          </Typography>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<DownloadRoundedIcon />}
            sx={{
              borderRadius: '10px',
              textTransform: 'none',
              borderColor: '#E2E8F0',
              color: '#0F172A',
              fontWeight: 600,
              '&:hover': { borderColor: '#1CB068', bgcolor: 'rgba(28, 176, 104, 0.05)' }
            }}
          >
            Download ({note.size})
          </Button>
        </Paper>
      ))}
    </Box>
  );
};

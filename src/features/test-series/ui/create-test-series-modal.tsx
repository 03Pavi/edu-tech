import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
  Typography,
  IconButton,
  MenuItem,
  Divider,
} from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createTestSeries } from '@/store/test-series/test-series.actions';

export const CreateTestSeriesModal: React.FC<{ open: boolean, onClose: () => void }> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.courses);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    durationInMinutes: 60,
    courseId: '',
  });

  const [questions, setQuestions] = useState<any[]>([
    { text: '', options: ['', '', '', ''], correctAnswer: '' }
  ]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    if (!formData.title || questions.some(q => !q.text || q.options.some((o: string) => !o) || !q.correctAnswer)) {
      alert("Please fill all fields and at least one question with all its details.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(createTestSeries({
        ...formData,
        courseId: formData.courseId ? parseInt(formData.courseId) : undefined,
        questions: questions
      })).unwrap();
      onClose();
      setFormData({ title: '', description: '', durationInMinutes: 60, courseId: '' });
      setQuestions([{ text: '', options: ['', '', '', ''], correctAnswer: '' }]);
    } catch (error) {
      console.error("Failed to create test series:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ '& .MuiDialog-paper': { borderRadius: '24px' } }}>
      <DialogTitle sx={{ fontWeight: 900, fontSize: '1.5rem' }}>Create Mock Test Series</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Stack direction="row" spacing={2}>
            <TextField
              sx={{ flex: 2 }}
              label="Test Title"
              placeholder="e.g. SSC CGL Full Mock Test 01"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              sx={{ flex: 1 }}
              label="Duration (Min)"
              type="number"
              value={formData.durationInMinutes}
              onChange={(e) => setFormData({ ...formData, durationInMinutes: parseInt(e.target.value) })}
            />
          </Stack>

          <TextField
            select
            fullWidth
            label="Associated Course (Optional)"
            value={formData.courseId}
            onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
          >
            <MenuItem value="">None</MenuItem>
            {courses.map((course: any) => (
              <MenuItem key={course.id} value={course.id.toString()}>
                {course.title}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            multiline
            rows={2}
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight="800">Questions ({questions.length})</Typography>

          {questions.map((q, qIndex) => (
            <Box key={qIndex} sx={{ p: 2, border: '1px solid #E2E8F0', borderRadius: '16px', position: 'relative' }}>
              <IconButton
                size="small"
                onClick={() => handleRemoveQuestion(qIndex)}
                sx={{ position: 'absolute', top: 8, right: 8, color: '#EF4444' }}
              >
                <DeleteOutlineRoundedIcon />
              </IconButton>

              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label={`Question ${qIndex + 1}`}
                  multiline
                  value={q.text}
                  onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                />

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  {q.options.map((option: string, oIndex: number) => (
                    <TextField
                      key={oIndex}
                      label={`Option ${String.fromCharCode(65 + oIndex)}`}
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    />
                  ))}
                </Box>

                <TextField
                  select
                  fullWidth
                  label="Correct Answer"
                  value={q.correctAnswer}
                  onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                >
                  {q.options.map((option: string, oIndex: number) => (
                    <MenuItem key={oIndex} value={option} disabled={!option}>
                      Option {String.fromCharCode(65 + oIndex)} {option ? `: ${option}` : ''}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Box>
          ))}

          <Button
            startIcon={<AddRoundedIcon />}
            onClick={handleAddQuestion}
            sx={{ alignSelf: 'flex-start', color: '#1CB068', fontWeight: 700 }}
          >
            Add Question
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} sx={{ color: '#64748B' }}>Cancel</Button>
        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
          sx={{ bgcolor: '#1CB068', borderRadius: '12px', px: 4, py: 1, fontWeight: 900 }}
        >
          {loading ? 'Creating...' : 'Create Test Series'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

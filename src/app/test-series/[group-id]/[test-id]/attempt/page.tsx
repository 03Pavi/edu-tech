'use client';

import React, { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Typography,
  Stack,
  Button,
  Box,
  Paper,
  CircularProgress,
  Container,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import {
  mockTests,
  QuestionPanel,
  QuestionPalette,
  Timer,
  SubmitDialog,
  UserAnswers,
  TestResult,
} from '@/features/test-series';
import { PageContainer } from '@/shared/ui/page-container';
import styles from './attempt.module.scss';

export default function TestAttemptPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params['test-id'] as string;
  const groupId = params['group-id'] as string;

  const test = mockTests.find((t) => t.id === testId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const handleSelectOption = (optionIndex: number) => {
    if (!test) return;
    const questionId = test.questions[currentQuestionIndex].id;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateResults = useCallback(() => {
    if (!test) return;
    let correct = 0;
    let attempted = Object.keys(answers).length;

    test.questions.forEach((q) => {
      if (answers[q.id] === q.correctOptionIndex) {
        correct++;
      }
    });

    const totalQuestions = test.questions.length;
    const incorrect = attempted - correct;
    const score = correct;

    setResult({
      totalQuestions,
      attempted,
      correct,
      incorrect,
      score,
    });
  }, [answers, test]);

  const handleSubmit = () => {
    calculateResults();
    setIsSubmitDialogOpen(false);
  };

  const handleTimeUp = () => {
    calculateResults();
  };

  const nextQuestion = () => {
    if (test && currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (!test) {
    return (
      <PageContainer>
        <Container maxWidth="xl" sx={{ py: 10 }}>
          <Typography variant="h5">Test not found</Typography>
          <Button onClick={() => router.push(`/test-series/${groupId}`)}>Back to Tests</Button>
        </Container>
      </PageContainer>
    );
  }

  if (result) {
    const percentage = Math.round((result.score / result.totalQuestions) * 100);

    return (
      <PageContainer>
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
          <Paper elevation={0} className={styles.resultPaper}>
            <Typography variant="h3" className={styles.resultTitle} gutterBottom>
              Session Summary
            </Typography>
            <Typography variant="h6" className={styles.resultSubtitle}>
              Excellent effort on completing the {test.title}.
            </Typography>

            <Box className={styles.progressWrapper}>
              <CircularProgress
                variant="determinate"
                value={percentage}
                size={180}
                thickness={4}
                sx={{ color: percentage > 40 ? '#1CB068' : '#f59e0b', borderRadius: '50%' }}
              />
              <Box className={styles.progressLabelWrapper}>
                <Typography variant="h3" className={styles.accuracyValue}>
                  {percentage}%
                </Typography>
                <Typography variant="overline" className={styles.accuracyLabel}>
                  Accuracy
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3
              }}
            >
              {[
                { label: 'Total Questions', value: result.totalQuestions, icon: <AssignmentRoundedIcon />, color: '#1CB068' },
                { label: 'Attempted', value: result.attempted, icon: <HelpRoundedIcon />, color: '#00A3FF' },
                { label: 'Correct Answers', value: result.correct, icon: <CheckCircleRoundedIcon />, color: '#10B981' },
                { label: 'Incorrect Answers', value: result.incorrect, icon: <CancelRoundedIcon />, color: '#f43f5e' },
              ].map((stat, i) => (
                <Box key={i} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' } }}>
                  <Paper variant="outlined" className={styles.statCard}>
                    <Box sx={{ color: stat.color, mb: 1.5 }}>{stat.icon}</Box>
                    <Typography variant="h4" fontWeight="900" sx={{ mb: 0.5 }}>{stat.value}</Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight="700">{stat.label}</Typography>
                  </Paper>
                </Box>
              ))}
            </Box>

            <Box className={styles.performanceBanner}>
              <Typography variant="h5" className={styles.performanceTitle}>
                Your Performance Score:
              </Typography>
              <Typography variant="h4" className={styles.performanceValue}>
                {result.score} / {result.totalQuestions}
              </Typography>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 8 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => router.push(`/test-series/${groupId}`)}
                startIcon={<ArrowBackRoundedIcon />}
                sx={{ px: 4, py: 1.5, borderRadius: 2, borderWidth: 2, fontWeight: 700 }}
              >
                Try Another Test
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push('/test-series')}
                sx={{ px: 6, py: 1.5, borderRadius: 2, fontWeight: 800, bgcolor: '#1CB068', '&:hover': { bgcolor: '#16a34a' } }}
              >
                Back to Dashboard
              </Button>
            </Stack>
          </Paper>
        </Container>
      </PageContainer>
    );
  }

  const currentQuestion = test.questions[currentQuestionIndex];
  const attemptedCount = Object.keys(answers).length;

  return (
    <PageContainer>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: 4,
            alignItems: 'flex-start'
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Paper elevation={0} className={styles.examHeader}>
              <Box className={styles.examTitleWrapper}>
                <Box className={styles.examIconBox}>
                  <AssignmentRoundedIcon />
                </Box>
                <Typography variant="h6" className={styles.examTitle}>{test.title}</Typography>
              </Box>
              <Box className={styles.timerWrapper}>
                <Timer initialMinutes={test.durationMinutes} onTimeUp={handleTimeUp} />
              </Box>
            </Paper>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, mt: 4 }}>
              <Stack spacing={3} sx={{ flex: 1, width: '100%' }}>
                <QuestionPanel
                  question={currentQuestion}
                  questionNumber={currentQuestionIndex + 1}
                  selectedOption={answers[currentQuestion.id] ?? null}
                  onSelectOption={handleSelectOption}
                />

                <Paper elevation={0} className={styles.navigationFooter}>
                  <Button
                    variant="outlined"
                    disabled={currentQuestionIndex === 0}
                    onClick={prevQuestion}
                    size="small"
                    className={styles.navBtn}
                    sx={{ borderWidth: 2 }}
                  >
                    Previous
                  </Button>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {currentQuestionIndex === test.questions.length - 1 ? (
                      <Button
                        variant="contained"
                        disabled={attemptedCount === 0}
                        onClick={() => setIsSubmitDialogOpen(true)}
                        size="small"
                        className={`${styles.navBtn} ${styles.navBtnContained}`}
                      >
                        Finish
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={nextQuestion}
                        size="small"
                        className={`${styles.navBtn} ${styles.navBtnContained}`}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </Paper>
              </Stack>

              <Box sx={{ width: { xs: '100%', lg: '350px' }, flexShrink: 0, order: { xs: -1, lg: 1 } }}>
                <QuestionPalette
                  totalQuestions={test.questions.length}
                  currentQuestionIndex={currentQuestionIndex}
                  answeredQuestions={Object.keys(answers).map(id => test.questions.findIndex(q => q.id === id).toString())}
                  onQuestionClick={setCurrentQuestionIndex}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      <SubmitDialog
        open={isSubmitDialogOpen}
        onClose={() => setIsSubmitDialogOpen(false)}
        onConfirm={handleSubmit}
        attemptedCount={attemptedCount}
        totalCount={test.questions.length}
      />
    </PageContainer>
  );
}

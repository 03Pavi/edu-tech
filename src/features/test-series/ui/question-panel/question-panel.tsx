'use client';

import React from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Paper, Stack } from '@mui/material';
import { Question } from '../../model/test-types';
import styles from './question-panel.module.scss';

interface QuestionPanelProps {
  question: Question;
  selectedOption: number | null;
  onSelectOption: (optionIndex: number) => void;
  questionNumber: number;
}

export const QuestionPanel: React.FC<QuestionPanelProps> = ({
  question,
  selectedOption,
  onSelectOption,
  questionNumber,
}) => {
  return (
    <Paper className={styles.panel} elevation={0}>
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="overline"
            className={styles.questionLabel}
          >
            Question {questionNumber}
          </Typography>
          <Typography variant="h6" className={styles.questionText}>
            {question.text}
          </Typography>
        </Box>

        <RadioGroup
          value={selectedOption !== null ? selectedOption : ''}
          onChange={(e) => onSelectOption(parseInt(e.target.value))}
        >
          <Stack spacing={1.5}>
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              return (
                <Paper
                  key={index}
                  variant="outlined"
                  onClick={() => onSelectOption(index)}
                  className={`${styles.optionItem} ${isSelected ? styles.optionItemSelected : ''}`}
                >
                  <FormControlLabel
                    value={index}
                    control={<Radio size="small" sx={{ mr: 1, color: isSelected ? '#1CB068' : undefined }} />}
                    label={
                      <Typography className={`${styles.optionText} ${isSelected ? styles.optionTextSelected : ''}`}>
                        {option}
                      </Typography>
                    }
                    className={styles.optionLabel}
                  />
                </Paper>
              );
            })}
          </Stack>
        </RadioGroup>
      </Stack>
    </Paper>
  );
};

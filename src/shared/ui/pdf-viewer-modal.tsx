'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  Stack,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

interface PdfViewerModalProps {
  open: boolean;
  title: string;
  pdfUrl: string;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  open,
  title,
  pdfUrl,
  onClose,
}) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (open) {
      setLoading(true);
    }
  }, [open, pdfUrl]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      PaperProps={{
        sx: {
          bgcolor: '#0F172A',
          color: 'white',
          overflow: 'hidden',
          m: 0,
          borderRadius: 0,
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 2,
          px: { xs: 2, md: 4 },
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          bgcolor: '#1E293B',
          borderBottom: '1px solid #334155',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1, minWidth: 0, mr: 3 }}>
          <PictureAsPdfIcon sx={{ color: '#1CB068', fontSize: 32, flexShrink: 0 }} />
          <Typography
            variant="h6"
            fontWeight="800"
            noWrap
            color="white"
            sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
          >
            {title || 'SSC CGL Question Paper Preview'}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ flexShrink: 0 }}>
          <Button
            component="a"
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="medium"
            variant="outlined"
            startIcon={<OpenInNewIcon fontSize="small" />}
            sx={{
              color: '#94A3B8',
              borderColor: '#475569',
              textTransform: 'none',
              fontWeight: 700,
              px: 2,
              py: 0.8,
              borderRadius: 2,
              '&:hover': { borderColor: '#1CB068', color: '#1CB068', bgcolor: 'rgba(28, 176, 104, 0.08)' },
            }}
          >
            Open Original
          </Button>

          <Button
            component="a"
            href={pdfUrl}
            download
            size="medium"
            variant="contained"
            startIcon={<DownloadIcon fontSize="small" />}
            sx={{
              bgcolor: '#1CB068',
              color: 'white',
              textTransform: 'none',
              fontWeight: 800,
              px: 2.5,
              py: 0.8,
              borderRadius: 2,
              '&:hover': { bgcolor: '#16a34a' },
            }}
          >
            Download
          </Button>

          <IconButton
            onClick={onClose}
            sx={{
              color: '#94A3B8',
              ml: 1,
              p: 1,
              '&:hover': { color: 'white', bgcolor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <CloseIcon sx={{ fontSize: 26 }} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 0, flexGrow: 1, position: 'relative', bgcolor: '#0F172A' }}>
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              bgcolor: '#0F172A',
              zIndex: 1,
            }}
          >
            <CircularProgress sx={{ color: '#1CB068' }} size={54} />
            <Typography variant="h6" color="#94A3B8" fontWeight={700}>
              Loading PDF Document...
            </Typography>
          </Box>
        )}

        {pdfUrl ? (
          <iframe
            src={`${pdfUrl}#toolbar=1`}
            width="100%"
            height="100%"
            style={{ border: 'none', width: '100%', height: '100%' }}
            onLoad={() => setLoading(false)}
            title={title}
          />
        ) : (
          <Box sx={{ p: 5, textAlign: 'center' }}>
            <Typography color="error">No PDF URL specified.</Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

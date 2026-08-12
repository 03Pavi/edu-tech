'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Typography,
  Stack,
  Box,
  Breadcrumbs,
  Link as MuiLink,
  Button,
  Container,
  Paper,
  CircularProgress,
  Chip,
  Card,
  CardContent,
  TextField,
  InputAdornment,
} from '@mui/material';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

import { PageContainer } from '@/shared/ui/page-container';
import { PdfViewerModal } from '@/shared/ui/pdf-viewer-modal';
import { mockGroups, PyqShiftPaper } from '@/features/test-series';
import { useAppDispatch } from '@/store/hooks';
import { fetchSscCglPyqsThunk } from '@/store/slices/pyq-slice';
import styles from './group-tests.module.scss';

export default function TestsInGroupPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const groupId = params['group-id'] as string;

  const group = mockGroups.find((g) => g.id === groupId);

  const [loading, setLoading] = useState(true);
  const [pyqTitle, setPyqTitle] = useState('SSC CGL Previous Year Question Papers');
  const [papers, setPapers] = useState<PyqShiftPaper[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // PDF Preview State
  const [pdfModalOpen, setPdfModalOpen] = useState<boolean>(false);
  const [activePdfUrl, setActivePdfUrl] = useState<string>('');
  const [activePdfTitle, setActivePdfTitle] = useState<string>('');

  useEffect(() => {
    if (groupId === 'ssc') {
      setLoading(true);
      dispatch(fetchSscCglPyqsThunk())
        .unwrap()
        .then((res: any) => {
          setPyqTitle(res.title);
          setPapers(res.papers);
        })
        .finally(() => setLoading(false));
    }
  }, [groupId, dispatch]);

  const handleOpenPdfPreview = (url: string, title: string) => {
    setActivePdfUrl(url);
    setActivePdfTitle(title);
    setPdfModalOpen(true);
  };

  if (!group) {
    return (
      <PageContainer>
        <Container maxWidth="xl" sx={{ py: 10 }}>
          <Stack alignItems="center" spacing={3}>
            <Typography variant="h4" fontWeight="800">
              Category Not Found
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push('/test-series')}
              startIcon={<ArrowBackRoundedIcon />}
              sx={{ bgcolor: '#1CB068', '&:hover': { bgcolor: '#16a34a' } }}
            >
              Back to Categories
            </Button>
          </Stack>
        </Container>
      </PageContainer>
    );
  }

  if (group.status === 'pending') {
    return (
      <PageContainer>
        <Container maxWidth="xl" className={styles.pageWrapper}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            className={styles.breadcrumb}
          >
            <MuiLink component={Link} underline="hover" color="inherit" href="/">
              Home
            </MuiLink>
            <MuiLink component={Link} underline="hover" color="inherit" href="/test-series">
              Test Series
            </MuiLink>
            <Typography color="text.primary" fontWeight="700">
              {group.title}
            </Typography>
          </Breadcrumbs>

          <Paper elevation={0} sx={{ p: { xs: 4, md: 8 }, textAlign: 'center', borderRadius: 4, bgcolor: '#F8FAFC', border: '1px dashed #CBD5E1', mt: 4 }}>
            <HourglassEmptyRoundedIcon sx={{ fontSize: 64, color: '#D97706', mb: 2 }} />
            <Typography variant="h4" fontWeight="800" gutterBottom>
              {group.title} - Coming Soon
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto', mb: 4 }}>
              We are actively scraping and organizing previous year question papers for {group.title}. Currently, only SSC CGL PYQ is available live!
            </Typography>
            <Button
              component={Link}
              href="/test-series/ssc"
              variant="contained"
              sx={{ bgcolor: '#1CB068', '&:hover': { bgcolor: '#16a34a' }, borderRadius: 2, px: 4, py: 1.5, fontWeight: 700 }}
            >
              Explore Live SSC CGL PYQ Papers
            </Button>
          </Paper>
        </Container>
      </PageContainer>
    );
  }

  const filteredPapers = papers.filter((paper) => {
    const q = searchTerm.toLowerCase();
    return (
      paper.date?.toLowerCase().includes(q) ||
      paper.shift?.toLowerCase().includes(q) ||
      paper.sectionHeading?.toLowerCase().includes(q)
    );
  });

  return (
    <PageContainer>
      <Container maxWidth="xl" className={styles.pageWrapper}>
        <Stack spacing={{ xs: 3, md: 5 }}>
          <Box>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              className={styles.breadcrumb}
            >
              <MuiLink component={Link} underline="hover" color="inherit" href="/">
                Home
              </MuiLink>
              <MuiLink component={Link} underline="hover" color="inherit" href="/test-series">
                Test Series
              </MuiLink>
              <Typography color="text.primary" fontWeight="700">
                {group.title}
              </Typography>
            </Breadcrumbs>

            <Box className={styles.headerRow}>
              <Box>
                <Typography
                  variant="h3"
                  component="h1"
                  className={styles.groupTitle}
                  gutterBottom
                >
                  {pyqTitle}
                </Typography>
                <Typography variant="body1" className={styles.groupDescription}>
                  Shift-wise extracted papers with in-app PDF preview options.
                </Typography>
              </Box>

              <Box className={styles.badge}>
                {loading ? 'Loading Papers...' : `${papers.length} Shift Papers Available`}
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Search by Date, Shift, or Year (e.g. 2025, Shift 1)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flexGrow: 1, maxWidth: 500, bgcolor: 'white', borderRadius: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10, gap: 2 }}>
              <CircularProgress sx={{ color: '#1CB068' }} size={48} />
              <Typography variant="h6" color="text.secondary">
                Fetching live SSC CGL shift papers from server...
              </Typography>
            </Box>
          ) : filteredPapers.length > 0 ? (
            <Box className={styles.testGrid}>
              {filteredPapers.map((paper, idx) => (
                <Card
                  key={idx}
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    border: '1px solid #E2E8F0',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: '#1CB068',
                      boxShadow: '0 10px 25px rgba(28,176,104,0.1)',
                      transform: 'translateY(-3px)',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {paper.sectionHeading && (
                      <Chip
                        label={paper.sectionHeading}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(28, 176, 104, 0.1)',
                          color: '#1CB068',
                          fontWeight: 700,
                          fontSize: '0.725rem',
                          mb: 2,
                          maxWidth: '100%',
                        }}
                      />
                    )}

                    <Stack spacing={1.5} sx={{ mb: 3 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <CalendarTodayRoundedIcon sx={{ fontSize: 18, color: '#64748B' }} />
                        <Typography variant="subtitle1" fontWeight="800" color="#0F172A">
                          {paper.date || 'SSC CGL Tier 1'}
                        </Typography>
                      </Stack>

                      <Stack direction="row" alignItems="center" spacing={1}>
                        <AccessTimeRoundedIcon sx={{ fontSize: 18, color: '#64748B' }} />
                        <Typography variant="body2" fontWeight="600" color="#475569">
                          {paper.shift || 'Shift Paper'}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, fontWeight: 600 }}>
                      Paper Previews:
                    </Typography>

                    <Stack spacing={1.5}>
                      {paper.links && paper.links.length > 0 ? (
                        paper.links.map((link, linkIdx) => {
                          const isHindi = link.url?.toLowerCase().includes('hindi') || link.title?.toLowerCase().includes('hindi');
                          const langLabel = isHindi ? 'Preview Hindi PDF' : 'Preview English PDF';
                          const paperTitle = `${paper.date || ''} ${paper.shift || ''} (${isHindi ? 'Hindi' : 'English'})`;

                          return (
                            <Button
                              key={linkIdx}
                              onClick={() => handleOpenPdfPreview(link.url, paperTitle)}
                              variant="outlined"
                              size="small"
                              startIcon={<PictureAsPdfRoundedIcon sx={{ color: isHindi ? '#E11D48' : '#2563EB' }} />}
                              endIcon={<VisibilityRoundedIcon />}
                              sx={{
                                justifyContent: 'space-between',
                                borderColor: '#E2E8F0',
                                color: '#0F172A',
                                fontWeight: 700,
                                textTransform: 'none',
                                py: 1,
                                px: 2,
                                borderRadius: 2,
                                '&:hover': {
                                  borderColor: isHindi ? '#E11D48' : '#2563EB',
                                  bgcolor: isHindi ? 'rgba(225, 29, 72, 0.04)' : 'rgba(37, 99, 235, 0.04)',
                                },
                              }}
                            >
                              {langLabel}
                            </Button>
                          );
                        })
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          No direct PDF link attached
                        </Typography>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Paper className={styles.emptyState} elevation={0}>
              <Typography variant="h6" color="text.secondary" fontWeight="600">
                No matching shift papers found for "{searchTerm}".
              </Typography>
            </Paper>
          )}
        </Stack>
      </Container>

      {/* In-App PDF Viewer Modal */}
      <PdfViewerModal
        open={pdfModalOpen}
        title={activePdfTitle}
        pdfUrl={activePdfUrl}
        onClose={() => setPdfModalOpen(false)}
      />
    </PageContainer>
  );
}

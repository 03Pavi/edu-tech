'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Typography,
  Button,
  Stack,
  Box,
  Container,
  Paper,
  Chip,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Skeleton,
  Breadcrumbs,
  Link as MuiLink,

} from '@mui/material';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import FolderSpecialRoundedIcon from '@mui/icons-material/FolderSpecialRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { PageContainer } from '@/shared/ui/page-container';
import { PdfViewerModal } from '@/shared/ui/pdf-viewer-modal';
import { PyqShiftPaper, PyqExamCategory } from '@/features/test-series';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchExamsThunk,
  fetchPapersThunk,
  setSelectedExamSlug,
  setSelectedYearTag,
  setExpandedYear,
  setSearchTerm,
} from '@/store/slices/pyq-slice';

interface YearGroup {
  year: string;
  sections: Array<{
    heading: string;
    papers: PyqShiftPaper[];
  }>;
  totalPapers: number;
}

export default function ExamPyqPage() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = params['slug'];
  const slug = (Array.isArray(rawSlug) ? rawSlug[0] : rawSlug) || 'ssc-cgl';

  const dispatch = useAppDispatch();
  const {
    exams,
    sections,
    papers,
    loadingExams,
    loadingPapers,
    expandedYear,
    selectedYearTag,
    searchTerm,
  } = useAppSelector((state) => state.pyq);


  const [pdfModalOpen, setPdfModalOpen] = useState<boolean>(false);
  const [activePdfUrl, setActivePdfUrl] = useState<string>('');
  const [activePdfTitle, setActivePdfTitle] = useState<string>('');

  useEffect(() => {
    dispatch(fetchExamsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (slug) {
      dispatch(setSelectedExamSlug(slug));
      dispatch(fetchPapersThunk(slug));
    }
  }, [dispatch, slug]);

  const activeExam = exams.find((e: PyqExamCategory) => e.slug === slug) || {
    name: slug.toUpperCase().replace('-', ' '),
    slug,
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019],
  };

  // Group papers into Year Groups
  const yearGroups = useMemo<YearGroup[]>(() => {
    const groupsMap: Record<string, Record<string, PyqShiftPaper[]>> = {};

    const addPaperToGroup = (paper: PyqShiftPaper, defaultHeading: string) => {
      const paperText = (paper.title || paper.date || '').toLowerCase();
      let year = 'Other Archives';
      const yearMatch = paperText.match(/20\d{2}/);
      if (yearMatch) {
        year = yearMatch[0];
      }

      if (!groupsMap[year]) {
        groupsMap[year] = {};
      }
      const heading = paper.sectionHeading || defaultHeading;
      if (!groupsMap[year][heading]) {
        groupsMap[year][heading] = [];
      }
      groupsMap[year][heading].push(paper);
    };

    if (sections && sections.length > 0) {
      sections.forEach((sec: any) => {
        if (sec.tables) {
          sec.tables.forEach((tbl: any) => {
            if (tbl.rows) {
              tbl.rows.forEach((row: any) => addPaperToGroup(row, sec.heading));
            }
          });
        }
      });
    } else if (papers && papers.length > 0) {
      papers.forEach((p: PyqShiftPaper) => addPaperToGroup(p, 'General Papers'));
    }

    const sortedYears = Object.keys(groupsMap).sort((a, b) => {
      if (a === 'Other Archives') return 1;
      if (b === 'Other Archives') return -1;
      return Number(b) - Number(a);
    });

    return sortedYears.map((year) => {
      const headingMap = groupsMap[year];
      const secArray = Object.keys(headingMap).map((heading) => ({
        heading,
        papers: headingMap[heading],
      }));

      const totalPapers = secArray.reduce((acc, s) => acc + s.papers.length, 0);

      return {
        year,
        sections: secArray,
        totalPapers,
      };
    });
  }, [sections, papers]);

  useEffect(() => {
    if (yearGroups.length > 0 && !expandedYear) {
      dispatch(setExpandedYear(yearGroups[0].year));
    }
  }, [yearGroups, expandedYear, dispatch]);

  const yearTags = useMemo(() => {
    const set = new Set<string>();
    if (activeExam.years && Array.isArray(activeExam.years)) {
      activeExam.years.forEach((y: number) => {
        if (y <= 2025) set.add(String(y));
      });
    }
    yearGroups.forEach((g) => {
      if (g.year !== 'Other Archives') set.add(g.year);
    });
    const sorted = Array.from(set).sort((a, b) => Number(b) - Number(a));
    return ['All', ...sorted];
  }, [activeExam, yearGroups]);

  const handleAccordionToggle = (year: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    dispatch(setExpandedYear(isExpanded ? year : null));
  };

  const handleOpenPdfPreview = (url: string, title: string) => {
    setActivePdfUrl(url);
    setActivePdfTitle(title);
    setPdfModalOpen(true);
  };

  const filteredYearGroups = yearGroups
    .map((group) => {
      const matchesTag = selectedYearTag === 'All' || group.year === selectedYearTag;
      if (!matchesTag) return null;

      if (!searchTerm.trim()) return group;

      const term = searchTerm.toLowerCase();
      const matchingSections = group.sections
        .map((sec) => {
          const matchingPapers = sec.papers.filter(
            (p) =>
              (p.title && p.title.toLowerCase().includes(term)) ||
              (p.date && p.date.toLowerCase().includes(term)) ||
              (p.shift && p.shift.toLowerCase().includes(term))
          );
          if (matchingPapers.length === 0) return null;
          return { ...sec, papers: matchingPapers };
        })
        .filter(Boolean) as YearGroup['sections'];

      if (matchingSections.length === 0) return null;

      const totalPapers = matchingSections.reduce((acc, s) => acc + s.papers.length, 0);

      return {
        ...group,
        sections: matchingSections,
        totalPapers,
      };
    })
    .filter(Boolean) as YearGroup[];

  const examDisplayName = activeExam.name || slug.toUpperCase().replace('-', ' ');

  return (
    <PageContainer>
      <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', pb: 12 }}>
        {/* Header Bar */}
        <Box sx={{ bgcolor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', py: 4 }}>
          <Container maxWidth="xl">
            <Stack spacing={2}>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <MuiLink component={Link} href="/" color="inherit" underline="hover">
                  Home
                </MuiLink>
                <MuiLink component={Link} href="/test-series" color="inherit" underline="hover">
                  Previous Year Papers
                </MuiLink>
                <Typography color="text.primary" fontWeight={700}>
                  {examDisplayName}
                </Typography>
              </Breadcrumbs>

              <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', md: 'center' }}
                spacing={2}
              >
                <Box>
                  <Typography variant="h4" fontWeight={900} color="#0F172A">
                    {examDisplayName} Previous Year Papers
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ mt: 0.5 }}>
                    Practice official shift-wise question papers with English & Hindi PDF downloads.
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  startIcon={<ArrowBackRoundedIcon />}
                  onClick={() => router.push('/')}
                  sx={{
                    borderColor: '#CBD5E1',
                    color: '#475569',
                    borderRadius: 2.5,
                    textTransform: 'none',
                    fontWeight: 700,
                  }}
                >
                  All Exams
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ pt: 4 }}>
          {/* Year Filter Chips */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              mb: 4,
              borderRadius: 4,
              bgcolor: '#FFFFFF',
              border: '1px solid #E2E8F0',
            }}
          >
            <Stack spacing={2}>
              <Typography variant="subtitle2" fontWeight={800} color="#0F172A" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterListRoundedIcon sx={{ color: '#1CB068', fontSize: 20 }} />
                Select {examDisplayName} Year:
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                {yearTags.map((tag) => {
                  const isSelected = selectedYearTag === tag;
                  const label = tag === 'All' ? 'All Years' : `${examDisplayName} ${tag}`;
                  return (
                    <Chip
                      key={tag}
                      label={label}
                      clickable
                      onClick={() => dispatch(setSelectedYearTag(tag))}
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        px: 1,
                        py: 2.2,
                        borderRadius: 3,
                        bgcolor: isSelected ? '#1CB068' : '#F1F5F9',
                        color: isSelected ? '#FFFFFF' : '#475569',
                        border: isSelected ? 'none' : '1px solid #E2E8F0',
                        '&:hover': {
                          bgcolor: isSelected ? '#16a34a' : '#E2E8F0',
                        },
                      }}
                    />
                  );
                })}
              </Box>
            </Stack>
          </Paper>



          {/* Loading Skeleton */}
          {loadingPapers && (
            <Stack spacing={3}>
              <Skeleton variant="rounded" height={80} sx={{ borderRadius: 4 }} />
              <Skeleton variant="rounded" height={240} sx={{ borderRadius: 4 }} />
              <Skeleton variant="rounded" height={240} sx={{ borderRadius: 4 }} />
            </Stack>
          )}

          {/* Content: Year Groups Accordions */}
          {!loadingPapers && filteredYearGroups.length > 0 && (
            <Stack spacing={3}>
              {filteredYearGroups.map((group) => {
                const isExpanded = expandedYear === group.year;
                const yearLabel = group.year === 'Other Archives' ? group.year : `${examDisplayName} ${group.year} Papers`;

                return (
                  <Accordion
                    key={group.year}
                    expanded={isExpanded}
                    onChange={handleAccordionToggle(group.year)}
                    elevation={0}
                    sx={{
                      borderRadius: '16px !important',
                      border: isExpanded ? '2px solid #1CB068' : '1px solid #E2E8F0',
                      bgcolor: '#FFFFFF',
                      overflow: 'hidden',
                      '&:before': { display: 'none' },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: '#1CB068', fontSize: 28 }} />}
                      sx={{
                        px: 3,
                        py: 1.5,
                        bgcolor: isExpanded ? '#F0FDF4' : '#FFFFFF',
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%" pr={2}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <DateRangeRoundedIcon sx={{ color: '#1CB068', fontSize: 26 }} />
                          <Typography variant="h6" fontWeight={800} color="#0F172A">
                            {yearLabel}
                          </Typography>
                        </Stack>

                        <Chip
                          label={`${group.totalPapers} Shift Papers`}
                          size="small"
                          sx={{
                            bgcolor: '#1CB068',
                            color: '#FFFFFF',
                            fontWeight: 800,
                            borderRadius: 2,
                          }}
                        />
                      </Stack>
                    </AccordionSummary>

                    <AccordionDetails sx={{ p: 3, bgcolor: '#FFFFFF' }}>
                      <Stack spacing={4}>
                        {group.sections.map((sec, secIdx) => (
                          <Box key={secIdx}>
                            {/* Tier / Section Heading */}
                            <Box
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 1,
                                bgcolor: '#ECFDF5',
                                color: '#065F46',
                                px: 2,
                                py: 0.8,
                                borderRadius: 2,
                                mb: 3,
                                border: '1px solid #A7F3D0',
                              }}
                            >
                              <FolderSpecialRoundedIcon sx={{ fontSize: 18, color: '#1CB068' }} />
                              <Typography variant="subtitle2" fontWeight={800}>
                                {sec.heading} ({sec.papers.length} Shifts)
                              </Typography>
                            </Box>

                            {/* Paper Cards Grid */}
                            <Grid container spacing={2.5}>
                              {sec.papers.map((paper, paperIdx) => (
                                <Grid item xs={12} sm={6} md={4} key={paper.id || paperIdx}>
                                  <Paper
                                    elevation={0}
                                    sx={{
                                      p: 2.5,
                                      borderRadius: 4,
                                      border: '1px solid #E2E8F0',
                                      bgcolor: '#F8FAFC',
                                      height: '100%',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justify: 'space-between',
                                      transition: 'all 0.2s ease',
                                      '&:hover': {
                                        borderColor: '#1CB068',
                                        boxShadow: '0 10px 25px rgba(28,176,104,0.1)',
                                        bgcolor: '#FFFFFF',
                                        transform: 'translateY(-2px)',
                                      },
                                    }}
                                  >
                                    <Stack spacing={2}>
                                      <Stack spacing={0.5}>
                                        <Typography
                                          variant="subtitle1"
                                          fontWeight={800}
                                          color="#0F172A"
                                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                        >
                                          <CalendarTodayRoundedIcon sx={{ fontSize: 16, color: '#64748B' }} />
                                          {paper.date || paper.title}
                                        </Typography>

                                        {paper.shift && (
                                          <Typography
                                            variant="caption"
                                            fontWeight={600}
                                            color="#64748B"
                                            sx={{ display: 'flex', alignItems: 'center', gap: 0.8, pl: 3 }}
                                          >
                                            <AccessTimeRoundedIcon sx={{ fontSize: 14 }} />
                                            {paper.shift}
                                          </Typography>
                                        )}
                                      </Stack>

                                      {/* Download / Preview Buttons */}
                                      <Stack spacing={1} sx={{ pt: 1 }}>
                                        <Button
                                          fullWidth
                                          variant="outlined"
                                          size="small"
                                          startIcon={<PictureAsPdfRoundedIcon sx={{ color: '#2563EB' }} />}
                                          endIcon={<VisibilityRoundedIcon sx={{ color: '#64748B', fontSize: 16 }} />}
                                          onClick={() => {
                                            const pdfUrl = paper.englishPdf || paper.links?.[0]?.url || '#';
                                            const pdfTitle = `${paper.title || paper.date} (English)`;
                                            handleOpenPdfPreview(pdfUrl, pdfTitle);
                                          }}
                                          sx={{
                                            justifyContent: 'space-between',
                                            borderColor: '#E2E8F0',
                                            bgcolor: '#FFFFFF',
                                            color: '#1E293B',
                                            fontWeight: 700,
                                            borderRadius: 2.5,
                                            py: 0.8,
                                            fontSize: '0.8rem',
                                            textTransform: 'none',
                                            '&:hover': {
                                              borderColor: '#2563EB',
                                              bgcolor: '#EFF6FF',
                                            },
                                          }}
                                        >
                                          Preview English PDF
                                        </Button>

                                        <Button
                                          fullWidth
                                          variant="outlined"
                                          size="small"
                                          startIcon={<PictureAsPdfRoundedIcon sx={{ color: '#DC2626' }} />}
                                          endIcon={<VisibilityRoundedIcon sx={{ color: '#64748B', fontSize: 16 }} />}
                                          onClick={() => {
                                            const pdfUrl = paper.hindiPdf || paper.links?.[1]?.url || paper.links?.[0]?.url || '#';
                                            const pdfTitle = `${paper.title || paper.date} (Hindi)`;
                                            handleOpenPdfPreview(pdfUrl, pdfTitle);
                                          }}
                                          sx={{
                                            justifyContent: 'space-between',
                                            borderColor: '#E2E8F0',
                                            bgcolor: '#FFFFFF',
                                            color: '#1E293B',
                                            fontWeight: 700,
                                            borderRadius: 2.5,
                                            py: 0.8,
                                            fontSize: '0.8rem',
                                            textTransform: 'none',
                                            '&:hover': {
                                              borderColor: '#DC2626',
                                              bgcolor: '#FEF2F2',
                                            },
                                          }}
                                        >
                                          Preview Hindi PDF
                                        </Button>
                                      </Stack>
                                    </Stack>
                                  </Paper>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        ))}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Stack>
          )}

          {/* Empty State */}
          {!loadingPapers && filteredYearGroups.length === 0 && (
            <Paper elevation={0} sx={{ p: 8, textAlign: 'center', borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <Typography variant="h6" fontWeight={800} color="#0F172A">
                No papers found for {examDisplayName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try selecting a different year or clearing your search query.
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(setSelectedYearTag('All'));
                  setSearchTerm('');
                }}
                sx={{ mt: 3, bgcolor: '#1CB068', fontWeight: 800, borderRadius: 2.5 }}
              >
                Reset Filters
              </Button>
            </Paper>
          )}
        </Container>
      </Box>

      {/* PDF Viewer Modal */}
      <PdfViewerModal
        open={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        pdfUrl={activePdfUrl}
        title={activePdfTitle}
      />
    </PageContainer>
  );
}

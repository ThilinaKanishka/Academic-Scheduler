// Home.jsx
import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  Grow,
  Zoom,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";
import {
  School as SchoolIcon,
  Computer as ComputerIcon,
  Business as BusinessIcon,
  Engineering as EngineeringIcon,
  People as PeopleIcon,
  EmojiEvents as EmojiEventsIcon,
  Timeline as TimelineIcon,
  Grading as GradingIcon,
  ArrowForward as ArrowForwardIcon,
  LibraryBooks as LibraryIcon,
  Science as ScienceIcon,
  Public as GlobalIcon,
  Star as StarIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        overflowX: "hidden",
      }}
    >
      {/* Hero Section with Parallax Effect */}
      <Box
        sx={{
          position: "relative",
          background: `linear-gradient(145deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 70%, ${theme.palette.secondary.main} 100%)`,
          overflow: "hidden",
          color: theme.palette.primary.contrastText,
          py: 15,
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 25%)",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in timeout={800}>
                <Box>
                  <Chip
                    label="EST. 1892"
                    color="secondary"
                    sx={{
                      mb: 3,
                      px: 2,
                      py: 1,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  />
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      fontWeight: 900,
                      mb: 3,
                      fontSize: isMobile ? "2.8rem" : "4rem",
                      lineHeight: 1.2,
                      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    Shape Your Future at{" "}
                    <Box
                      component="span"
                      sx={{
                        color: "secondary.main",
                        position: "relative",
                        "&:after": {
                          content: '""',
                          position: "absolute",
                          bottom: 8,
                          left: 0,
                          right: 0,
                          height: "12px",
                          backgroundColor: `${theme.palette.secondary.light}80`,
                          zIndex: -1,
                        },
                      }}
                    >
                      Prestige University
                    </Box>
                  </Typography>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      mb: 4,
                      opacity: 0.9,
                      fontWeight: 300,
                      maxWidth: "90%",
                    }}
                  >
                    Where innovation meets tradition. Join a legacy of
                    excellence with our world-class programs and research
                    opportunities.
                  </Typography>
                  <Box
                    sx={{ display: "flex", gap: 3, mt: 5, flexWrap: "wrap" }}
                  >
                    <Zoom in style={{ transitionDelay: "300ms" }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          px: 5,
                          py: 1.5,
                          borderRadius: "50px",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          boxShadow: `0 4px 20px ${theme.palette.secondary.light}40`,
                          "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow: `0 6px 24px ${theme.palette.secondary.light}60`,
                          },
                        }}
                      >
                        Apply Now
                      </Button>
                    </Zoom>
                    <Zoom in style={{ transitionDelay: "500ms" }}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="large"
                        sx={{
                          px: 5,
                          py: 1.5,
                          borderRadius: "50px",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          borderWidth: 2,
                          "&:hover": {
                            borderWidth: 2,
                            backgroundColor: `${theme.palette.secondary.main}10`,
                            transform: "translateY(-3px)",
                          },
                        }}
                      >
                        Virtual Tour
                      </Button>
                    </Zoom>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 6,
                      gap: 2,
                    }}
                  >
                    <Avatar
                      alt="Student"
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      sx={{
                        width: 48,
                        height: 48,
                        border: `3px solid ${theme.palette.secondary.main}`,
                      }}
                    />
                    <Avatar
                      alt="Professor"
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      sx={{
                        width: 48,
                        height: 48,
                        border: `3px solid ${theme.palette.secondary.main}`,
                        ml: -2,
                      }}
                    />
                    <Avatar
                      alt="Researcher"
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      sx={{
                        width: 48,
                        height: 48,
                        border: `3px solid ${theme.palette.secondary.main}`,
                        ml: -2,
                      }}
                    />
                    <Box sx={{ ml: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Join 25,000+ students
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            sx={{
                              color: theme.palette.secondary.main,
                              fontSize: "1rem",
                            }}
                          />
                        ))}
                        <Typography
                          variant="caption"
                          sx={{ ml: 1, fontWeight: 500 }}
                        >
                          4.9/5 (2,483 reviews)
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            {!isMobile && (
              <Grid item xs={12} md={6}>
                <Slide direction="left" in timeout={1000}>
                  <Box
                    sx={{
                      position: "relative",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: `0 25px 50px -12px ${theme.palette.primary.dark}80`,
                      transform: "perspective(1000px) rotateY(-5deg)",
                      "&:hover": {
                        "& img": {
                          transform: "scale(1.05)",
                        },
                        "&:after": {
                          opacity: 0.3,
                        },
                      },
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}30, ${theme.palette.secondary.main}30)`,
                        transition: "opacity 0.3s ease",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80"
                      alt="University campus"
                      sx={{
                        width: "100%",
                        height: "auto",
                        transition:
                          "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                        display: "block",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 4,
                        background: `linear-gradient(to top, ${theme.palette.primary.dark} 0%, transparent 100%)`,
                        color: "white",
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Our Main Campus
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        200 acres of innovative learning spaces
                      </Typography>
                    </Box>
                  </Box>
                </Slide>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section with Animated Numbers */}
      <Box
        sx={{
          py: 10,
          backgroundColor: theme.palette.background.paper,
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            top: -50,
            left: 0,
            right: 0,
            height: 100,
            background: `linear-gradient(to bottom right, ${theme.palette.background.paper} 49%, transparent 50%)`,
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} justifyContent="center">
            {[
              {
                value: "150+",
                label: "Academic Programs",
                icon: <LibraryIcon fontSize="large" />,
                description: "From arts to quantum computing",
              },
              {
                value: "12:1",
                label: "Student-Faculty Ratio",
                icon: <PeopleIcon fontSize="large" />,
                description: "Personalized attention",
              },
              {
                value: "95%",
                label: "Graduation Rate",
                icon: <CheckIcon fontSize="large" />,
                description: "Highest in the region",
              },
              {
                value: "#5",
                label: "National Ranking",
                icon: <EmojiEventsIcon fontSize="large" />,
                description: "Top-tier institution",
              },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={stat.label}>
                <Grow in timeout={(index + 1) * 500}>
                  <Card
                    sx={{
                      height: "100%",
                      textAlign: "center",
                      p: 4,
                      borderRadius: "16px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      border: "1px solid rgba(0,0,0,0.05)",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: `0 15px 60px ${theme.palette.primary.light}30`,
                        backgroundColor: theme.palette.primary.light,
                        "& .MuiTypography-root": {
                          color: theme.palette.primary.contrastText,
                        },
                        "& .MuiSvgIcon-root": {
                          color: theme.palette.secondary.main,
                          animation: `${floatAnimation} 3s ease infinite`,
                        },
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "inline-flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mb: 3,
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          backgroundColor: `${theme.palette.primary.main}10`,
                          color: theme.palette.primary.main,
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Typography
                        variant="h3"
                        component="div"
                        sx={{
                          fontWeight: 800,
                          color: theme.palette.text.primary,
                          mb: 1,
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: "inherit",
                        }}
                      >
                        {stat.label}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "inherit",
                          opacity: 0.8,
                        }}
                      >
                        {stat.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Programs with Tabs */}
      <Box
        sx={{
          py: 12,
          backgroundColor: theme.palette.background.default,
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "radial-gradient(circle at 75% 50%, rgba(0,0,0,0.02) 0%, transparent 20%)",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip
              label="ACADEMIC EXCELLENCE"
              color="secondary"
              sx={{
                mb: 2,
                px: 2,
                py: 1,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            />
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                color: theme.palette.text.primary,
              }}
            >
              Transformative Learning Experiences
            </Typography>
            <Divider
              sx={{
                width: 100,
                height: 4,
                backgroundColor: theme.palette.secondary.main,
                margin: "0 auto",
                mb: 3,
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                maxWidth: 700,
                mx: "auto",
                color: theme.palette.text.secondary,
                fontSize: "1.1rem",
              }}
            >
              Discover programs designed to prepare you for the challenges of
              tomorrow
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                name: "Computer Science",
                description:
                  "Innovate at the intersection of technology and society with our cutting-edge CS program featuring AI, cybersecurity, and quantum computing tracks.",
                icon: <ComputerIcon fontSize="large" />,
                color: theme.palette.info.main,
                highlights: [
                  "AI Research Lab",
                  "Industry Partnerships",
                  "Hackathon Series",
                ],
              },
              {
                name: "Business Administration",
                description:
                  "Develop leadership and strategic thinking skills through our AACSB-accredited program with global immersion opportunities.",
                icon: <BusinessIcon fontSize="large" />,
                color: theme.palette.success.main,
                highlights: [
                  "Case Competitions",
                  "Executive Mentors",
                  "Startup Incubator",
                ],
              },
              {
                name: "Biomedical Engineering",
                description:
                  "Merge engineering principles with medical sciences to develop innovative healthcare solutions in our state-of-the-art facilities.",
                icon: <ScienceIcon fontSize="large" />,
                color: theme.palette.warning.main,
                highlights: [
                  "Medical Device Lab",
                  "Clinical Rotations",
                  "Research Grants",
                ],
              },
            ].map((program, index) => (
              <Grid item xs={12} md={4} key={program.name}>
                <Fade in timeout={(index + 1) * 500}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: "16px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      border: "1px solid rgba(0,0,0,0.05)",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: `0 15px 60px ${program.color}20`,
                        "& .program-icon-container": {
                          backgroundColor: `${program.color}20`,
                          transform: "scale(1.1)",
                        },
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 4,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mb: 4,
                          "& .program-icon-container": {
                            transition: "all 0.4s ease",
                            width: 80,
                            height: 80,
                            borderRadius: "16px",
                            backgroundColor: `${program.color}10`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: program.color,
                          },
                        }}
                      >
                        <div className="program-icon-container">
                          {program.icon}
                        </div>
                      </Box>
                      <Typography
                        variant="h4"
                        component="h3"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          textAlign: "center",
                          color: theme.palette.text.primary,
                        }}
                      >
                        {program.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          textAlign: "center",
                          mb: 3,
                          flexGrow: 1,
                        }}
                      >
                        {program.description}
                      </Typography>
                      <Box sx={{ mb: 3 }}>
                        {program.highlights.map((highlight, i) => (
                          <Box
                            key={i}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                              pl: 2,
                            }}
                          >
                            <CheckIcon
                              sx={{
                                color: program.color,
                                fontSize: "1rem",
                                mr: 1,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: theme.palette.text.secondary }}
                            >
                              {highlight}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                      <Box sx={{ textAlign: "center", mt: "auto" }}>
                        <Button
                          variant="contained"
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            borderRadius: "50px",
                            px: 4,
                            py: 1.5,
                            fontWeight: 700,
                            backgroundColor: program.color,
                            "&:hover": {
                              backgroundColor: program.color,
                              transform: "translateY(-2px)",
                              boxShadow: `0 4px 12px ${program.color}60`,
                            },
                          }}
                        >
                          Explore Program
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Global Opportunities Section */}
      <Box
        sx={{
          py: 10,
          backgroundColor: theme.palette.background.paper,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: `0 25px 50px -12px ${theme.palette.primary.light}30`,
                  height: 400,
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}30, ${theme.palette.secondary.main}30)`,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 4,
                    background: `linear-gradient(to top, ${theme.palette.primary.dark} 0%, transparent 100%)`,
                    color: "white",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Study Abroad Program
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Barcelona, Spain - Summer 2023
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Chip
                  label="GLOBAL NETWORK"
                  color="secondary"
                  sx={{
                    mb: 3,
                    px: 2,
                    py: 1,
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                />
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    color: theme.palette.text.primary,
                  }}
                >
                  Expand Your Horizons
                </Typography>
                <Divider
                  sx={{
                    width: 80,
                    height: 4,
                    backgroundColor: theme.palette.secondary.main,
                    mb: 3,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: theme.palette.text.secondary,
                    fontSize: "1.1rem",
                    lineHeight: 1.7,
                  }}
                >
                  With partnerships in 40+ countries, our global programs offer
                  unparalleled opportunities for cultural immersion and academic
                  growth. Gain international perspective while earning credits
                  toward your degree.
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
                  {[
                    "Exchange Programs",
                    "Research Abroad",
                    "Global Internships",
                    "Language Immersion",
                  ].map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      icon={<GlobalIcon sx={{ fontSize: "1rem" }} />}
                      sx={{
                        borderRadius: "8px",
                        backgroundColor: `${theme.palette.secondary.main}10`,
                        color: theme.palette.text.primary,
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    borderRadius: "50px",
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    fontSize: "1rem",
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                      backgroundColor: `${theme.palette.primary.main}10`,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Explore Global Opportunities
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action with Animated Gradient */}
      <Box
        sx={{
          py: 15,
          background: `linear-gradient(-45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
          backgroundSize: "400% 400%",
          animation: `${gradientBackground} 12s ease infinite`,
          color: theme.palette.primary.contrastText,
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.1) 0%, transparent 30%)",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 900,
              mb: 3,
              fontSize: isMobile ? "2.5rem" : "3.5rem",
            }}
          >
            Ready to Transform Your Future?
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 5,
              opacity: 0.9,
              fontWeight: 300,
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Applications for Fall 2023 are now open. Join our community of
            innovators and leaders.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 6,
                py: 2,
                borderRadius: "50px",
                fontWeight: 800,
                fontSize: "1.1rem",
                boxShadow: `0 8px 24px ${theme.palette.secondary.dark}60`,
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: `0 12px 28px ${theme.palette.secondary.dark}80`,
                },
              }}
            >
              Apply Now
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              sx={{
                px: 6,
                py: 2,
                borderRadius: "50px",
                fontWeight: 700,
                fontSize: "1.1rem",
                borderWidth: 3,
                "&:hover": {
                  borderWidth: 3,
                  backgroundColor: `${theme.palette.secondary.main}20`,
                  transform: "translateY(-3px)",
                },
              }}
            >
              Request Info
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 6,
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Priority deadline: March 1, 2023
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              •
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Financial aid available
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              •
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Rolling admissions
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;

import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Slide,
  useScrollTrigger,
  Fade,
  Box,
  Badge,
  keyframes,
  styled,
} from "@mui/material";
import {
  Home as HomeIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  MenuBook as MenuBookIcon,
  MeetingRoom as MeetingRoomIcon,
  Schedule as ScheduleIcon,
  Notifications as NotificationsIcon,
  Login as LoginIcon,
  HowToReg as RegisterIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import {
  indigo,
  teal,
  amber,
  deepOrange,
  pink,
  yellow,
} from "@mui/material/colors";

// Animation keyframes
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-3px) rotate(5deg);
  }
  75% {
    transform: translateY(-3px) rotate(-5deg);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

// Custom Academic Icon Component
const AcademicIcon = ({ animate }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      animation: animate ? `${float} 3s ease-in-out infinite` : "none",
      transformOrigin: "center",
    }}
  >
    <path
      d="M22 10v6M2 10l10-5 10 5-10 5z"
      style={{
        animation: animate ? `${bounce} 4s ease-in-out infinite` : "none",
      }}
    />
    <path
      d="M6 12v5c3 3 9 3 12 0v-5"
      style={{
        animation: animate ? `${bounce} 4s ease-in-out infinite 0.5s` : "none",
      }}
    />
  </svg>
);

// Styled Components
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
  background: `linear-gradient(135deg, ${indigo[800]} 0%, ${teal[700]} 100%)`,
  padding: theme.spacing(1, 3),
  minHeight: "64px", // Fixed height for consistency
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1, 2),
    minHeight: "56px",
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 0.5),
  color: "white",
  transition: "all 0.3s ease",
  borderRadius: "20px",
  padding: theme.spacing(1, 2),
  "&:hover": {
    transform: "translateY(-2px)",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    boxShadow: `0 4px 8px rgba(0,0,0,0.2)`,
  },
}));

const BrandBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    "& .icon-container": {
      transform: "rotate(10deg)",
      boxShadow: `0 4px 12px ${yellow[800]}`,
    },
  },
}));

// Spacer component to prevent content overlap
export const ToolbarSpacer = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
  // Additional safety margin
  marginBottom: theme.spacing(2),
}));

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [role, setRole] = useState(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const [iconHovered, setIconHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      setRole(null);
    }
  }, [token, navigate]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    handleMenuClose();
  };

  return (
    <>
      <Slide appear={false} direction="down" in={!scrolled}>
        <AppBar
          position="fixed" // Changed to fixed
          elevation={scrolled ? 4 : 0}
          sx={{
            transition: "all 0.3s ease",
            backdropFilter: scrolled ? "blur(10px)" : "none",
            backgroundColor: scrolled
              ? "rgba(13, 17, 28, 0.95)"
              : "transparent",
            boxShadow: scrolled ? "0 4px 18px rgba(0,0,0,0.1)" : "none",
          }}
        >
          <StyledToolbar>
            <BrandBox
              onClick={() => navigate("/")}
              onMouseEnter={() => setIconHovered(true)}
              onMouseLeave={() => setIconHovered(false)}
            >
              <Box
                className="icon-container"
                sx={{
                  backgroundColor: yellow[700],
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
                }}
              >
                <AcademicIcon animate={iconHovered} />
              </Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  background: "linear-gradient(to right, #ffffff, #e0f7fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  position: "relative",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    bottom: "-2px",
                    left: 0,
                    background: "linear-gradient(to right, #ffffff, #e0f7fa)",
                    transform: "scaleX(0)",
                    transformOrigin: "right",
                    transition: "transform 0.3s ease",
                  },
                  "&:hover:after": {
                    transform: "scaleX(1)",
                    transformOrigin: "left",
                  },
                }}
              >
                Academic Scheduler
              </Typography>
            </BrandBox>

            <Box
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              {(role === "admin" || role === "lecturer") && (
                <>
                  <NavButton startIcon={<HomeIcon />} component={Link} to="/">
                    Home
                  </NavButton>
                  <NavButton
                    startIcon={<SchoolIcon />}
                    component={Link}
                    to="/courses"
                  >
                    Courses
                  </NavButton>
                  <NavButton
                    startIcon={<PeopleIcon />}
                    component={Link}
                    to="/faculty"
                  >
                    Faculty
                  </NavButton>
                  <NavButton
                    startIcon={<MenuBookIcon />}
                    component={Link}
                    to="/modules"
                  >
                    Modules
                  </NavButton>
                  <NavButton
                    startIcon={<MeetingRoomIcon />}
                    component={Link}
                    to="/classrooms"
                  >
                    Rooms
                  </NavButton>
                  <NavButton
                    startIcon={<ScheduleIcon />}
                    component={Link}
                    to="/schedules"
                  >
                    Create
                  </NavButton>
                  <NavButton
                    startIcon={<ScheduleIcon />}
                    component={Link}
                    to="/timetables"
                  >
                    View
                  </NavButton>
                </>
              )}

              {role === "user" && (
                <>
                  <NavButton
                    startIcon={<ScheduleIcon />}
                    component={Link}
                    to="/timetables"
                  >
                    Timetables
                  </NavButton>
                  <NavButton
                    startIcon={
                      <Badge badgeContent={notificationCount} color="error">
                        <NotificationsIcon />
                      </Badge>
                    }
                    component={Link}
                    to="/notifications"
                  >
                    Notifications
                  </NavButton>
                </>
              )}

              {!token ? (
                <>
                  <Fade in={true} timeout={800}>
                    <NavButton
                      startIcon={<LoginIcon />}
                      component={Link}
                      to="/login"
                      sx={{
                        backgroundColor: pink[600],
                        "&:hover": {
                          backgroundColor: pink[700],
                          animation: `${bounce} 1s ease`,
                        },
                      }}
                    >
                      Login
                    </NavButton>
                  </Fade>
                  <Fade in={true} timeout={1000}>
                    <NavButton
                      startIcon={<RegisterIcon />}
                      component={Link}
                      to="/register"
                      sx={{
                        backgroundColor: amber[600],
                        "&:hover": {
                          backgroundColor: amber[700],
                          animation: `${bounce} 1s ease`,
                        },
                      }}
                    >
                      Register
                    </NavButton>
                  </Fade>
                </>
              ) : (
                <>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    color="inherit"
                    sx={{
                      ml: 2,
                      "&:hover": {
                        transform: "scale(1.1)",
                        transition: "transform 0.3s ease",
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: deepOrange[500],
                        width: 36,
                        height: 36,
                        transition: "all 0.3s ease",
                        border: `2px solid ${yellow[200]}`,
                        "&:hover": {
                          transform: "scale(1.1)",
                          boxShadow: `0 0 0 3px ${yellow[100]}`,
                        },
                      }}
                    >
                      <AccountCircleIcon />
                    </Avatar>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      elevation: 4,
                      sx: {
                        mt: 1.5,
                        minWidth: 180,
                        borderRadius: "12px",
                        overflow: "visible",
                        background: `linear-gradient(135deg, ${indigo[50]} 0%, ${teal[50]} 100%)`,
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate("/profile");
                        handleMenuClose();
                      }}
                      sx={{
                        "&:hover": {
                          backgroundColor: indigo[100],
                        },
                      }}
                    >
                      <AccountCircleIcon sx={{ mr: 1.5, color: indigo[600] }} />
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      sx={{
                        "&:hover": {
                          backgroundColor: pink[50],
                        },
                      }}
                    >
                      <LogoutIcon sx={{ mr: 1.5, color: pink[600] }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </StyledToolbar>
        </AppBar>
      </Slide>
      <ToolbarSpacer />{" "}
      {/* This creates the necessary space below the navbar */}
    </>
  );
};

export default Navbar;

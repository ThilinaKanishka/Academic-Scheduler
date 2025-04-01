import { useEffect, useState } from "react";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../api/courseApi";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Paper,
  Slide,
  Grow,
  Fade,
  Divider,
  Tooltip,
  Snackbar,
  Alert,
  Avatar,
  Chip,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Zoom,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Search,
  School,
  Cancel,
  Save,
  Description,
  Category,
  CheckCircle,
  Warning,
  Info,
} from "@mui/icons-material";
import { useTheme, alpha } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  transition: theme.transitions.create(["transform", "box-shadow"], {
    duration: theme.transitions.duration.standard,
  }),
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.common.white,
  fontWeight: 600,
  letterSpacing: 0.5,
  padding: "10px 24px",
  transition: theme.transitions.create(["transform", "box-shadow"], {
    duration: theme.transitions.duration.standard,
  }),
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
  },
}));

const AnimatedTitle = styled(motion.div)({
  display: "inline-block",
});

const Courses = () => {
  const theme = useTheme();
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [editPopup, setEditPopup] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error loading courses:", error);
      showSnackbar("Failed to load courses", "error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAddCourse = async () => {
    if (!name) {
      showSnackbar("Course name is required", "warning");
      return;
    }
    try {
      await addCourse({ name, description });
      setName("");
      setDescription("");
      fetchCourses();
      showSnackbar("Course added successfully", "success");
    } catch (error) {
      console.error("Failed to add course:", error);
      showSnackbar("Failed to add course", "error");
    }
  };

  const handleUpdateCourse = async () => {
    if (!name) {
      showSnackbar("Course name is required", "warning");
      return;
    }
    try {
      await updateCourse(editingId, { name, description });
      setEditingId(null);
      setName("");
      setDescription("");
      fetchCourses();
      showSnackbar("Course updated successfully", "success");
    } catch (error) {
      console.error("Failed to update course:", error);
      showSnackbar("Failed to update course", "error");
    }
  };

  const confirmDelete = (course) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCourse = async () => {
    try {
      await deleteCourse(courseToDelete._id);
      fetchCourses();
      showSnackbar("Course deleted successfully", "success");
    } catch (error) {
      console.error("Failed to delete course:", error);
      showSnackbar("Failed to delete course", "error");
    } finally {
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  const handleEditClick = (course) => {
    setEditingId(course._id);
    setName(course.name);
    setDescription(course.description);
    setEditPopup(true);
    setTimeout(() => setEditPopup(false), 1500);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setDescription("");
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants for title
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Animation for each letter
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const titleText = "Course Management";
  const letters = titleText.split("");

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        mx: "auto",
        p: { xs: 2, md: 4 },
        bgcolor: "background.default",
      }}
    >
      {/* Header Section with Animated Title */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
          gap: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
            }}
          >
            <School sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <AnimatedTitle
              initial="hidden"
              animate="visible"
              variants={titleVariants}
            >
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  style={{
                    display: "inline-block",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    lineHeight: 1.2,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </AnimatedTitle>
            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", mt: 0.5 }}
            >
              Manage your educational courses
            </Typography>
          </Box>
        </Box>

        <Chip
          label={`${courses.length} ${
            courses.length === 1 ? "Course" : "Courses"
          }`}
          color="primary"
          variant="outlined"
          sx={{
            px: 2,
            py: 1.5,
            fontSize: "1rem",
            borderWidth: 2,
            "& .MuiChip-label": { fontWeight: 600 },
          }}
        />
      </Box>

      {/* Edit Popup Animation */}
      <AnimatePresence>
        {editPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              pointerEvents: "none",
            }}
          >
            <Paper
              elevation={6}
              sx={{
                p: 2,
                bgcolor: "primary.main",
                color: "white",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Edit sx={{ fontSize: 24 }} />
              <Typography variant="h6">Editing Course</Typography>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rest of your component remains the same */}
      {/* Search and Add Course Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          bgcolor: alpha(theme.palette.primary.light, 0.05),
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          backdropFilter: "blur(8px)",
        }}
      >
        {/* ... existing search and form code ... */}
      </Paper>

      {/* Course List Section */}
      <Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            mb: 3,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {searchTerm ? "Search Results" : "All Courses"}
          <Chip
            label={`${filteredCourses.length} items`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress size={60} thickness={4} />
          </Box>
        ) : filteredCourses.length === 0 ? (
          <Paper
            sx={{
              p: 4,
              textAlign: "center",
              bgcolor: "background.paper",
              borderRadius: 3,
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Info color="disabled" sx={{ fontSize: 60 }} />
            </Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {searchTerm
                ? "No matching courses found"
                : "No courses available"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {searchTerm
                ? "Try a different search term"
                : "Add your first course to get started"}
            </Typography>
          </Paper>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {filteredCourses.map((course, index) => (
              <Grow in={true} timeout={(index % 3) * 300} key={course._id}>
                <Box>
                  <StyledCard>
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          gap: 2,
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                          }}
                        >
                          {course.name.charAt(0)}
                        </Avatar>
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{ fontWeight: 600 }}
                        >
                          {course.name}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {course.description || "No description provided"}
                      </Typography>
                    </CardContent>
                    <Divider sx={{ my: 0 }} />
                    <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                      <Tooltip title="Edit course" arrow>
                        <IconButton
                          onClick={() => handleEditClick(course)}
                          color="primary"
                          aria-label="edit"
                          sx={{
                            "&:hover": {
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                            },
                          }}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete course" arrow>
                        <IconButton
                          onClick={() => confirmDelete(course)}
                          color="error"
                          aria-label="delete"
                          sx={{
                            "&:hover": {
                              bgcolor: alpha(theme.palette.error.main, 0.1),
                            },
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </StyledCard>
                </Box>
              </Grow>
            ))}
          </Box>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Warning color="error" sx={{ fontSize: 40 }} />
            <Typography>
              Are you sure you want to delete the course "{courseToDelete?.name}
              "?
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            This action cannot be undone. All data associated with this course
            will be permanently removed.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteCourse}
            variant="contained"
            color="error"
            startIcon={<Delete />}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
          iconMapping={{
            success: <CheckCircle fontSize="inherit" />,
            error: <Warning fontSize="inherit" />,
            warning: <Warning fontSize="inherit" />,
            info: <Info fontSize="inherit" />,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Courses;

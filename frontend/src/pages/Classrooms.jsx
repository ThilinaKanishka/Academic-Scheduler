import { useState, useEffect } from "react";
import {
  getClassrooms,
  addClassroom,
  updateClassroom,
  deleteClassroom,
} from "../api/classroomApi";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
  CircularProgress,
  Slide,
  Fade,
  Zoom,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
  ListItemIcon,
  Tabs,
  Tab,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  MeetingRoom as RoomIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Videocam as ProjectorIcon,
  MenuBook as LectureIcon,
  Science as LabIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const CLASSROOM_TYPES = [
  { value: "Lecture Hall", label: "Lecture Hall", icon: <LectureIcon /> },
  { value: "Lab", label: "Lab", icon: <LabIcon /> },
];

const INITIAL_CLASSROOM_STATE = {
  roomNumber: "",
  capacity: "",
  classroomType: "Lecture Hall",
  hasProjector: false,
};

const ColorButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
  color: "white",
  padding: "8px 24px",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 5px 8px 3px rgba(0, 0, 0, .15)",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
    transition: "background-color 0.3s ease",
  },
}));

const SearchContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  borderRadius: "12px",
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(to right, #2a2a3a, #2a2a4a)"
      : "linear-gradient(to right, #f6f7ff, #f9f9ff)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
}));

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode palette
          primary: {
            main: "#3f51b5",
          },
          secondary: {
            main: "#f50057",
          },
          background: {
            default: "#f8f9fa",
            paper: "#ffffff",
          },
          text: {
            primary: "#212529",
            secondary: "#495057",
          },
        }
      : {
          // Dark mode palette
          primary: {
            main: "#7986cb",
          },
          secondary: {
            main: "#ff4081",
          },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
          text: {
            primary: "#e1e1e1",
            secondary: "#a8a8a8",
          },
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: "background-color 0.3s ease",
        },
      },
    },
  },
});

export default function Classrooms() {
  const [mode, setMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedMode = localStorage.getItem("themeMode");
    return savedMode ? savedMode : "light";
  });

  const theme = createTheme(getDesignTokens(mode));

  const [classrooms, setClassrooms] = useState([]);
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const [formData, setFormData] = useState(INITIAL_CLASSROOM_STATE);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [classroomToDelete, setClassroomToDelete] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [classroomToEdit, setClassroomToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchClassrooms();
    // Save theme preference to localStorage
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    filterClassrooms();
  }, [classrooms, searchTerm, filterType]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const fetchClassrooms = async () => {
    try {
      setIsLoading(true);
      const data = await getClassrooms();
      setClassrooms(data);
    } catch (err) {
      showError("Failed to fetch classrooms");
    } finally {
      setIsLoading(false);
    }
  };

  const filterClassrooms = () => {
    let result = [...classrooms];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (classroom) =>
          classroom.roomNumber
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          classroom.capacity.toString().includes(searchTerm)
      );
    }

    // Apply type filter
    if (filterType !== "All") {
      result = result.filter(
        (classroom) => classroom.classroomType === filterType
      );
    }

    setFilteredClassrooms(result);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (event, newValue) => {
    setActiveTab(newValue);
    setFilterType(newValue === 0 ? "All" : CLASSROOM_TYPES[newValue - 1].value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.roomNumber.trim() || !formData.capacity) {
      showError("Room number and capacity are required");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      if (editingId) {
        await updateClassroom(editingId, formData);
        showSuccess("Classroom updated successfully");
        setEditDialogOpen(false);
      } else {
        await addClassroom(formData);
        showSuccess("Classroom added successfully");
      }
      resetForm();
      await fetchClassrooms();
    } catch (error) {
      showError(error.message || "Failed to save classroom");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_CLASSROOM_STATE);
    setEditingId(null);
    setClassroomToEdit(null);
  };

  const handleEditClick = (classroom) => {
    setClassroomToEdit(classroom);
    setEditingId(classroom._id);
    setFormData({
      roomNumber: classroom.roomNumber,
      capacity: classroom.capacity,
      classroomType: classroom.classroomType,
      hasProjector: classroom.hasProjector,
    });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (classroom) => {
    setClassroomToDelete(classroom);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!classroomToDelete) return;

    try {
      setIsLoading(true);
      await deleteClassroom(classroomToDelete._id);
      setClassrooms(classrooms.filter((c) => c._id !== classroomToDelete._id));
      showSuccess("Classroom deleted successfully");
    } catch (error) {
      showError("Failed to delete classroom");
    } finally {
      setIsLoading(false);
      setDeleteDialogOpen(false);
      setClassroomToDelete(null);
    }
  };

  const showError = (message) => {
    setError(message);
    setOpenSnackbar(true);
  };

  const showSuccess = (message) => {
    setSuccess(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Dark Mode Toggle Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton onClick={toggleColorMode} color="inherit" sx={{ ml: 1 }}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>

        <Zoom in={true} style={{ transitionDelay: "100ms" }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: "primary.main",
              textAlign: "center",
              mb: 6,
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              position: "relative",
              display: "inline-block",
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                height: "3px",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
              },
              "&::before": {
                width: "100%",
                borderRadius: "3px",
              },
              "&::after": {
                width: "70%",
                bottom: "-15px",
                opacity: 0.7,
              },
            }}
          >
            Classroom Management
            <SchoolIcon
              sx={{
                ml: 2,
                fontSize: "inherit",
                verticalAlign: "middle",
                color: theme.palette.secondary.main,
                filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.2))",
              }}
            />
          </Typography>
        </Zoom>

        <Fade in={true} timeout={500}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              mb: 6,
              borderRadius: 3,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(to bottom right, #2a2a3a, #2a2a4a)"
                  : "linear-gradient(to bottom right, #f9f9ff, #f0f4ff)",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: "text.secondary",
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AddIcon color="primary" />
              Add New Classroom
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ "& .MuiTextField-root": { mb: 2 } }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Room Number"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <RoomIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Capacity"
                    name="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PeopleIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Classroom Type</InputLabel>
                    <Select
                      name="classroomType"
                      value={formData.classroomType}
                      onChange={handleInputChange}
                      label="Classroom Type"
                    >
                      {CLASSROOM_TYPES.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ListItemIcon>{type.icon}</ListItemIcon>
                            {type.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="hasProjector"
                        checked={formData.hasProjector}
                        onChange={handleInputChange}
                        color="primary"
                        icon={<ProjectorIcon />}
                        checkedIcon={<ProjectorIcon color="primary" />}
                      />
                    }
                    label="Equipped with projector"
                    sx={{ mt: 1 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 2, pt: 1 }}>
                    <ColorButton
                      type="submit"
                      disabled={isLoading}
                      startIcon={
                        isLoading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <AddIcon />
                        )
                      }
                      variant="contained"
                    >
                      {isLoading ? "Processing..." : "Add Classroom"}
                    </ColorButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Fade>

        {/* Search and Filter Section */}
        <Fade in={true} timeout={800}>
          <SearchContainer elevation={3}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Search by Room Number or Capacity"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
                  <Tabs
                    value={activeTab}
                    onChange={handleFilterChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="classroom type filter"
                  >
                    <Tab
                      label="All"
                      icon={<FilterIcon />}
                      iconPosition="start"
                    />
                    {CLASSROOM_TYPES.map((type, index) => (
                      <Tab
                        key={type.value}
                        label={type.label}
                        icon={type.icon}
                        iconPosition="start"
                      />
                    ))}
                  </Tabs>
                </Paper>
              </Grid>
            </Grid>
          </SearchContainer>
        </Fade>

        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper elevation={4} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <Box
              sx={{
                p: 3,
                backgroundColor: (theme) => theme.palette.primary.main,
                color: "white",
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <RoomIcon /> Classroom List
                <Chip
                  label={`${filteredClassrooms.length} ${
                    filteredClassrooms.length === 1 ? "item" : "items"
                  }`}
                  size="small"
                  sx={{
                    ml: 2,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                  }}
                />
              </Typography>
            </Box>

            {isLoading && !classrooms.length ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 200,
                }}
              >
                <CircularProgress color="primary" />
              </Box>
            ) : filteredClassrooms.length === 0 ? (
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                <Typography variant="h6">
                  {searchTerm || filterType !== "All"
                    ? "No matching classrooms found"
                    : "No classrooms found"}
                </Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "action.hover" }}>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Room
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Capacity
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Type
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Projector
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle1" fontWeight="bold">
                          Actions
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredClassrooms.map((classroom) => (
                      <StyledTableRow key={classroom._id}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <RoomIcon color="action" />
                            <Typography>{classroom.roomNumber}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <PeopleIcon color="action" />
                            <Typography>{classroom.capacity}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            {classroom.classroomType === "Lecture Hall" ? (
                              <LectureIcon color="primary" />
                            ) : (
                              <LabIcon color="secondary" />
                            )}
                            <Typography>{classroom.classroomType}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <ProjectorIcon
                              color={
                                classroom.hasProjector ? "primary" : "disabled"
                              }
                            />
                            <Typography>
                              {classroom.hasProjector ? "Yes" : "No"}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => handleEditClick(classroom)}
                            color="primary"
                            aria-label="edit"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteClick(classroom)}
                            color="error"
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Slide>

        {/* Edit Classroom Dialog */}
        <Dialog
          open={editDialogOpen}
          onClose={() => {
            setEditDialogOpen(false);
            resetForm();
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EditIcon color="primary" />
              <Typography variant="h6">Edit Classroom</Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 2, "& .MuiTextField-root": { mb: 2 } }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Room Number"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <RoomIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Capacity"
                    name="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PeopleIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Classroom Type</InputLabel>
                    <Select
                      name="classroomType"
                      value={formData.classroomType}
                      onChange={handleInputChange}
                      label="Classroom Type"
                    >
                      {CLASSROOM_TYPES.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ListItemIcon>{type.icon}</ListItemIcon>
                            {type.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="hasProjector"
                        checked={formData.hasProjector}
                        onChange={handleInputChange}
                        color="primary"
                        icon={<ProjectorIcon />}
                        checkedIcon={<ProjectorIcon color="primary" />}
                      />
                    }
                    label="Equipped with projector"
                    sx={{ mt: 1 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setEditDialogOpen(false);
                resetForm();
              }}
              color="secondary"
            >
              Cancel
            </Button>
            <ColorButton
              onClick={handleSubmit}
              disabled={isLoading}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <EditIcon />
                )
              }
              variant="contained"
            >
              {isLoading ? "Updating..." : "Update Classroom"}
            </ColorButton>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Classroom Confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete classroom{" "}
              <strong>{classroomToDelete?.roomNumber}</strong>? This action
              cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              autoFocus
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Box
            sx={{
              p: 2,
              borderRadius: 1,
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: error ? "error.main" : "success.main",
              boxShadow: 3,
            }}
          >
            {error ? <ErrorIcon /> : <CheckCircleIcon />}
            <Typography>{error || success}</Typography>
          </Box>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

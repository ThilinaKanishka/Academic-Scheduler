import { useEffect, useState } from "react";
import {
  getFaculty,
  addFaculty,
  updateFaculty,
  deleteFaculty,
} from "../api/facultyApi";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Grid,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Slide,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  School,
  Email,
  Work,
  Business,
  Check,
  Close,
  Warning,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
}));

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [newFaculty, setNewFaculty] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
  });
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    facultyId: null,
    facultyName: "",
  });
  const theme = useTheme();

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const data = await getFaculty();
      setFaculty(data);
    } catch (error) {
      console.error("Error loading faculty:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFaculty({ ...newFaculty, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFaculty) {
        await updateFaculty(editingFaculty._id, newFaculty);
      } else {
        await addFaculty(newFaculty);
      }
      setNewFaculty({ name: "", email: "", department: "", designation: "" });
      setEditingFaculty(null);
      setOpenDialog(false);
      fetchFaculty();
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  const handleEdit = (facultyMember) => {
    setEditingFaculty(facultyMember);
    setNewFaculty({
      name: facultyMember.name,
      email: facultyMember.email,
      department: facultyMember.department,
      designation: facultyMember.designation,
    });
    setOpenDialog(true);
  };

  const handleDeleteClick = (facultyId, facultyName) => {
    setDeleteDialog({
      open: true,
      facultyId,
      facultyName,
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteFaculty(deleteDialog.facultyId);
      fetchFaculty();
      setDeleteDialog({
        open: false,
        facultyId: null,
        facultyName: "",
      });
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({
      open: false,
      facultyId: null,
      facultyName: "",
    });
  };

  const handleOpenDialog = () => {
    setEditingFaculty(null);
    setNewFaculty({
      name: "",
      email: "",
      department: "",
      designation: "",
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{ bgcolor: theme.palette.warning.main, color: "white" }}
        >
          <Box display="flex" alignItems="center">
            <Warning sx={{ mr: 1 }} />
            Confirm Deletion
          </Box>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Typography variant="body1">
            Are you sure you want to delete{" "}
            <strong>{deleteDialog.facultyName}</strong>? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleDeleteCancel}
            color="primary"
            variant="outlined"
            startIcon={<Close />}
            sx={{ borderRadius: 50 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            startIcon={<Delete />}
            sx={{ borderRadius: 50 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              textAlign: "center",
              textShadow: `2px 2px 4px ${theme.palette.primary.light}20`,
            }}
          >
            Faculty Management
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center", color: "text.secondary" }}
          >
            Manage your institution's faculty members with ease
          </Typography>
        </Box>
      </Slide>

      <Fade in={true} timeout={800}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenDialog}
            sx={{
              borderRadius: 50,
              px: 4,
              py: 1.5,
              boxShadow: theme.shadows[4],
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: theme.shadows[8],
              },
              transition: "all 0.3s ease",
            }}
          >
            Add Faculty
          </Button>
        </Box>
      </Fade>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{ bgcolor: theme.palette.primary.main, color: "white" }}
        >
          <Box display="flex" alignItems="center">
            <School sx={{ mr: 1 }} />
            {editingFaculty ? "Edit Faculty Member" : "Add New Faculty Member"}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={newFaculty.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ color: "action.active", mr: 1 }}>
                        <Work />
                      </Box>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={newFaculty.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ color: "action.active", mr: 1 }}>
                        <Email />
                      </Box>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  name="department"
                  value={newFaculty.department}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ color: "action.active", mr: 1 }}>
                        <Business />
                      </Box>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  name="designation"
                  value={newFaculty.designation}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ color: "action.active", mr: 1 }}>
                        <Work />
                      </Box>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleCloseDialog}
            color="secondary"
            variant="outlined"
            startIcon={<Close />}
            sx={{ borderRadius: 50 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            startIcon={<Check />}
            sx={{ borderRadius: 50 }}
          >
            {editingFaculty ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <Fade in={true} timeout={1000}>
        <StyledPaper elevation={3}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
            <Box display="flex" alignItems="center">
              <School color="primary" sx={{ mr: 1 }} />
              Faculty Members
            </Box>
          </Typography>

          {faculty.length === 0 ? (
            <Box
              sx={{
                py: 8,
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              <Typography variant="h6">No faculty members found</Typography>
              <Typography>Click "Add Faculty" to get started</Typography>
            </Box>
          ) : (
            <List sx={{ width: "100%" }}>
              {faculty.map((member, index) => (
                <Box key={member._id}>
                  <ListItem
                    sx={{
                      py: 2,
                      "&:hover": {
                        bgcolor: "action.hover",
                        transform: "scale(1.01)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          width: 56,
                          height: 56,
                        }}
                      >
                        {member.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" component="div">
                          {member.name}
                          <Typography
                            component="span"
                            variant="body2"
                            color="primary"
                            sx={{ ml: 1 }}
                          >
                            ({member.designation})
                          </Typography>
                        </Typography>
                      }
                      secondary={
                        <>
                          <Box display="flex" alignItems="center" mt={0.5}>
                            <Business
                              fontSize="small"
                              sx={{ mr: 1, color: "text.secondary" }}
                            />
                            <Typography variant="body2" component="span">
                              {member.department}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <Email
                              fontSize="small"
                              sx={{ mr: 1, color: "text.secondary" }}
                            />
                            <Typography variant="body2" component="span">
                              {member.email}
                            </Typography>
                          </Box>
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEdit(member)}
                        sx={{
                          color: theme.palette.warning.main,
                          "&:hover": {
                            bgcolor: `${theme.palette.warning.main}10`,
                          },
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() =>
                          handleDeleteClick(member._id, member.name)
                        }
                        sx={{
                          color: theme.palette.error.main,
                          "&:hover": {
                            bgcolor: `${theme.palette.error.main}10`,
                          },
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < faculty.length - 1 && <Divider variant="inset" />}
                </Box>
              ))}
            </List>
          )}
        </StyledPaper>
      </Fade>
    </Container>
  );
};

export default Faculty;

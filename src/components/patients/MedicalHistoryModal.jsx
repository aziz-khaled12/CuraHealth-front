import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Stack,
  Paper,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Close as CloseIcon,
  MedicalInformation as MedicalInformationIcon,
  LocalHospital as LocalHospitalIcon,
  Assignment as AssignmentIcon,
  Medication as MedicationIcon,
  Image as ImageIcon,
  Timeline as TimelineIcon,
  MonitorHeart as MonitorHeartIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`session-tabpanel-${index}`}
      aria-labelledby={`session-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export function MedicalHistoryModal({ session, onClose }) {
  const [tabValue, setTabValue] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  if (!session) return null;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFileSelect = (fileUrl) => {
    setSelectedFile(fileUrl);
    setViewerOpen(true);
  };

  const handleViewerClose = () => {
    setViewerOpen(false);
    setSelectedFile(null);
  };

  const getCategoryIcon = () => {
    switch (session.category) {
      case "Emergency":
        return <LocalHospitalIcon sx={{ color: "error.main" }} />;
      case "Normal":
        return <MedicalInformationIcon color="primary" />;
      default:
        return <AssignmentIcon color="action" />;
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "1200px",
    maxHeight: "90vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 3,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <>
      <Modal open={!!session} onClose={onClose}>
        <Paper sx={modalStyle} elevation={24}>
          {/* Header */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              borderBottom: 1,
              borderColor: "divider",
              bgcolor: "background.default",
            }}
          >
            <Avatar sx={{ mr: 2, bgcolor: "primary.light" }}>
              {getCategoryIcon()}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" component="h2" gutterBottom={false}>
                {session.category} Consultation
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {session.startedAt}
              </Typography>
            </Box>
            <IconButton onClick={onClose} size="large">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <Tab
              icon={<TimelineIcon />}
              label="Overview"
              iconPosition="start"
            />
            <Tab
              icon={<MonitorHeartIcon />}
              label="Vitals"
              iconPosition="start"
            />
            <Tab
              icon={<MedicationIcon />}
              label="Prescriptions"
              iconPosition="start"
            />
            <Tab
              icon={<DescriptionIcon />}
              label="Documents"
              iconPosition="start"
            />
          </Tabs>

          {/* Content */}
          <Box sx={{ flexGrow: 1, overflow: "auto", bgcolor: "grey.50" }}>
            {/* Overview Tab */}
            <TabPanel value={tabValue} index={0}>
              <Stack spacing={3}>
                <Card elevation={2}>
                  <CardHeader
                    title="Consultation Cause"
                    titleTypographyProps={{ variant: "h6" }}
                  />
                  <Divider />
                  <CardContent>
                    <Stack spacing={1}>
                      {session.consultationCause.map((cause, index) => (
                        <Typography key={index} variant="body1">
                          {index + 1}. {cause}
                        </Typography>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>

                <Card elevation={2}>
                  <CardHeader
                    title="Diagnosis"
                    titleTypographyProps={{ variant: "h6" }}
                  />
                  <Divider />
                  <CardContent>
                    <Stack spacing={1}>
                      {session.diagnosis.map((diagnosis, index) => (
                        <Typography key={index} variant="body1">
                          {index + 1}. {diagnosis}
                        </Typography>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>

                <Card elevation={2}>
                  <CardHeader
                    title="Services Provided"
                    titleTypographyProps={{ variant: "h6" }}
                  />
                  <Divider />
                  <CardContent>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {session.services.map((service, index) => (
                        <Chip
                          key={index}
                          label={service}
                          color="primary"
                          variant="outlined"
                          sx={{ borderRadius: 2 }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Stack>
            </TabPanel>

            {/* Vitals Tab */}
            <TabPanel value={tabValue} index={1}>
              <Card elevation={2}>
                <CardHeader
                  title="Vital Signs"
                  titleTypographyProps={{ variant: "h6" }}
                />
                <Divider />
                <CardContent>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                      },
                      gap: 3,
                    }}
                  >
                    {session.vitals.map((vital, index) => (
                      <Paper
                        key={index}
                        elevation={1}
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Avatar sx={{ bgcolor: "primary.light" }}>
                          <MonitorHeartIcon />
                        </Avatar>
                        <Box>
                          <Typography color="text.secondary" variant="caption">
                            {vital.name}
                          </Typography>
                          <Typography variant="h6">{vital.value}</Typography>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>

            {/* Prescriptions Tab */}
            <TabPanel value={tabValue} index={2}>
              <Card elevation={2}>
                <CardHeader
                  title="Prescribed Medications"
                  titleTypographyProps={{ variant: "h6" }}
                />
                <Divider />
                <CardContent>
                  <Stack spacing={2}>
                    {session.medicaments.map((prescription, index) => (
                      <Paper
                        key={index}
                        elevation={1}
                        sx={{
                          p: 2,
                          display: "flex",
                          gap: 2,
                          borderLeft: 6,
                          borderColor: "primary.main",
                        }}
                      >
                        <Avatar sx={{ bgcolor: "primary.light" }}>
                          <MedicationIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            {prescription.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            gutterBottom
                          >
                            Dosage: {prescription.dosage}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {prescription.instructions}
                          </Typography>
                        </Box>
                      </Paper>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </TabPanel>

            {/* Documents Tab */}
            <TabPanel value={tabValue} index={3}>
              <Card elevation={2}>
                <CardHeader
                  title="Medical Documents"
                  titleTypographyProps={{ variant: "h6" }}
                />
                <Divider />
                <CardContent>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                      },
                      gap: 2,
                    }}
                  >
                    {session.files.map((file, index) => (
                      <Paper
                        key={index}
                        elevation={1}
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: 4,
                          },
                        }}
                        onClick={() => handleFileSelect(file.url)}
                      >
                        <Avatar sx={{ bgcolor: "primary.light" }}>
                          <ImageIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle1" noWrap>
                            {file.file.name}
                          </Typography>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>
          </Box>
        </Paper>
      </Modal>

      {viewerOpen && (
        <ViewerModal
          open={viewerOpen}
          file={selectedFile}
          onClose={handleViewerClose}
        />
      )}
    </>
  );
}

export default MedicalHistoryModal;
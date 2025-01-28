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
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MedicationIcon from "@mui/icons-material/Medication";
import ImageIcon from "@mui/icons-material/Image";
import ViewerModal from "../ViewerModal";
import { useSelector } from "react-redux";

// TabPanel component for tab content
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`session-tabpanel-${index}`}
      aria-labelledby={`session-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function MedicalHistoryModal({ session, onClose }) {
  const [tabValue, setTabValue] = React.useState(0);

  if (!session) return null;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "1000px",
    maxHeight: "90vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  const { services } = useSelector((state) => state.services);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
  };
  const handleFileSelect = (fileUrl) => {
    setSelectedFile(fileUrl);
    setOpen(true);
  };

  return (
    <>
      <Modal open={!!session} onClose={onClose}>
        <Box sx={modalStyle}>
          {/* Header */}
          <DialogTitle
            sx={{ m: 0, p: 2, display: "flex", alignItems: "center" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexGrow: 1,
              }}
            >
              {session.category === "Normal" ? (
                <MedicalInformationIcon />
              ) : session.category === "Emergency" ? (
                <LocalHospitalIcon />
              ) : (
                <AssignmentIcon />
              )}

              <Typography variant="h6">
                {session.category} - {session.startedAt}
              </Typography>
            </Box>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab label="Overview" />
              <Tab label="Vitals" />
              <Tab label="Prescriptions" />
              <Tab label="Documents" />
            </Tabs>
          </Box>

          {/* Content */}
          <DialogContent sx={{ flexGrow: 1, overflow: "auto" }}>
            {/* Overview Tab */}
            <TabPanel value={tabValue} index={0}>
              <Card className="!shadow-md">
                <CardHeader title="Consultation Cause" />
                <CardContent>
                  <Typography>{session.details.consultationCause}</Typography>
                  <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                    Diagnosis
                  </Typography>
                  <Typography>{session.details.diagnostic}</Typography>
                  <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                    Services Provided
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {session.details.services.map((service, index) => (
                      <Chip
                        key={index}
                        label={services[service - 1].name}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>

            {/* Vitals Tab */}
            <TabPanel value={tabValue} index={1}>
              <Card>
                <CardHeader title="Vital Signs" />
                <CardContent>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 2,
                    }}
                  >
                    {session.details.generalSigns.map((sign, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <MedicalInformationIcon
                          sx={{ color: "text.secondary" }}
                        />
                        <Typography
                          component="span"
                          sx={{ fontWeight: "medium" }}
                        >
                          {sign.name}:
                        </Typography>
                        <Typography component="span">{sign.value}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>

            {/* Prescriptions Tab */}
            <TabPanel value={tabValue} index={2}>
              <Card>
                <CardHeader title="Prescriptions" />
                <CardContent>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {session.details.ordonance.map((prescription, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          gap: 2,
                          p: 2,
                          border: 1,
                          borderColor: "divider",
                          borderRadius: 1,
                        }}
                      >
                        <MedicationIcon sx={{ color: "primary.main" }} />
                        <Box>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {prescription.name} - {prescription.dosage}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {prescription.instructions}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>

            {/* Documents Tab */}
            <TabPanel value={tabValue} index={3}>
              <Card>
                <CardHeader title="Imported Documents" />
                <CardContent>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 2,
                    }}
                  >
                    {session.details.files.map((file, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          p: 2,
                          border: 1,
                          borderColor: "divider",
                          borderRadius: 1,
                          cursor: "pointer",
                        }}
                        onClick={() => handleFileSelect(file.url)}
                      >
                        <ImageIcon sx={{ color: "primary.main" }} />
                        <Box>
                          <Typography sx={{ fontWeight: "medium" }}>
                            {file.file.name}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>
          </DialogContent>
        </Box>
      </Modal>
      {open && (
        <ViewerModal open={open} file={selectedFile} onClose={handleClose} />
      )}
    </>
  );
}

export default MedicalHistoryModal;

// Main Profile Component
import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import ProfileFooter from "./ProfileFooter";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock doctor data
  const [doctorData, setDoctorData] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@medicalpractice.com",
    phone: "+1 (555) 123-4567",
    specialization: "Cardiology",
    licenseNumber: "MD12345678",
    address: "123 Medical Center Blvd, New York, NY 10001",
    hospital: "Metropolitan Medical Center",
    experience: "15 years",
    education: "Harvard Medical School",
    bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology and heart failure management.",
    certifications: [
      "American Board of Internal Medicine",
      "American College of Cardiology",
      "Advanced Cardiac Life Support",
    ],
    languages: ["English", "Spanish", "French"],
    awards: [
      "Excellence in Cardiology Research 2022",
      "Outstanding Physician Award 2020",
    ],
  });

  const [activeTab, setActiveTab] = useState("profile");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box >
      <Paper sx={{ 
        overflow: "hidden", 
        boxShadow: 4
      }}>
        
        <ProfileHeader 
          doctorData={doctorData}
          isEditing={isEditing}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
          handleSave={handleSave}
        />

        <Box sx={{ px: 3 }}>
          
          <ProfileContent 
            activeTab={activeTab}
            doctorData={doctorData}
            isEditing={isEditing}
            handleChange={handleChange}
          />
        </Box>

        <ProfileFooter 
          isEditing={isEditing}
          handleCancel={handleCancel}
          handleSave={handleSave}
        />
      </Paper>
    </Box>
  );
}

export default Profile;
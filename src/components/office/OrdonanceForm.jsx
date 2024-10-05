import React, { useState } from "react";
import { TextField, Button, Stack, InputAdornment, List, ListItem, IconButton, ListItemText } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import DeleteIcon from '@mui/icons-material/Delete';

const OrdonanceForm = ({ formData, setFormData }) => {
  const [medName, setMedName] = useState("");
  const [dosage, setDosage] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleAddMed = () => {
    if (medName && dosage && instructions) {
      const newMed = { name: medName, dosage, instructions };
      setFormData({
        ...formData,
        ordonance: [...formData.ordonance, newMed],
      });
      setMedName("");
      setDosage("");
      setInstructions("");
    }
  };

  const handleDeleteMed = (index) => {
    const updatedOrdonance = formData.ordonance.filter((_, i) => i !== index);
    setFormData({ ...formData, ordonance: updatedOrdonance });
  };

  return (
    <>
      <TextField
        label="Medication Name"
        value={medName}
        onChange={(e) => setMedName(e.target.value)}
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <CiSearch className="text-2xl" />
              </InputAdornment>
            ),
          },
        }}
      />

      <Stack direction={"row"} gap={2}>
        <TextField
          label="Dosage"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <TextField
          label="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
      </Stack>

      <Button variant="contained" onClick={handleAddMed} sx={{ mt: 2 }}>
        Add Medication
      </Button>
      {formData.ordonance.length > 0 && (
  <List>
    {formData.ordonance.map((med, index) => (
      <ListItem
        key={index}
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMed(index)}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText primary={`${med.name} - ${med.dosage} - ${med.instructions}`} />
      </ListItem>
    ))}
  </List>
)}
    </>
  );
};

export default OrdonanceForm;

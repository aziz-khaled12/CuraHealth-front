import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  InputAdornment,
  List,
  ListItem,
  IconButton,
  ListItemText,
} from "@mui/material";
import { CiSearch } from "react-icons/ci";
import DeleteIcon from "@mui/icons-material/Delete";

const OrdonanceForm = ({ formData, setFormData }) => {
  const [medName, setMedName] = useState("");
  const [dosage, setDosage] = useState("");
  const [prosologie, setProsologie] = useState("");
  const [voie, setVoie] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleAddMed = () => {
    if (medName && dosage && instructions) {
      const newMed = { name: medName, dosage, instructions, prosologie, voie, unit, quantity };
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
      <Stack direction={"row"} gap={4}>
        <Stack direction={"column"} gap={2} width={"50%"}>
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
          <TextField
            label="Dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />

          <Stack direction={"row"} gap={2}>
            <TextField
              label="Prosologie"
              value={prosologie}
              onChange={(e) => setProsologie(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Voie"
              value={voie}
              onChange={(e) => setVoie(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
          </Stack>

          <Stack direction={"row"} gap={2}>
            <TextField
              label="Unite"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />

            <TextField
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
          </Stack>

          <TextField
            label="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button variant="contained" onClick={handleAddMed} sx={{ mt: 2 }}>
            Add Medication
          </Button>
        </Stack>

        {formData.ordonance.length > 0 && (
          <List sx={{ width: "50%" }}>
            {formData.ordonance.map((med, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteMed(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${med.name} ${med.dosage} - ${med.quantity} ${med.unit}`}
                  secondary={`${med.prosologie} - ${med.instructions}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Stack>
    </>
  );
};

export default OrdonanceForm;

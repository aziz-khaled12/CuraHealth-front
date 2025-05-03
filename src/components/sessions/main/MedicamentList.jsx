import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

const MedicamentList = ({ medicaments, onListChange, unites }) => {
  const [editingId, setEditingId] = useState(null);
  const [unite, setUnite] = useState(null);

  const handleUpdateMedicament = (DWAID, field, value) => {
    const updatedMedicaments = medicaments.map((med) =>
      med.DWAID === DWAID ? { ...med, [field]: value } : med
    );
    onListChange(updatedMedicaments);
  };

  useEffect(() => {
    console.log("Medicaments updated:", medicaments);
  }, [medicaments]);

  if (medicaments.length === 0) {
    return (
      <Paper
        elevation={0}
        className="p-4 mt-4 border border-gray-300 rounded-lg"
      >
        <Typography variant="body1" color="text.secondary" align="center">
          No medicaments selected. Please select medicaments from above.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} className="p-4 mt-4 border border-gray-300 rounded-lg">
      <Typography variant="h6" gutterBottom>
        Selected Medicaments
      </Typography>

      {medicaments.map((medicament) => (
        <Box
          key={medicament.DWAID}
          className="p-3 mb-3 border border-gray-200 rounded-lg"
          sx={{
            backgroundColor:
              editingId === medicament.DWAID
                ? "rgba(0, 0, 0, 0.04)"
                : "transparent",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography variant="subtitle1" fontWeight={500}>
              {medicament.NameDWA} ({medicament.unit.name || medicament.unit})
            </Typography>
            <Button
              startIcon={<Edit />}
              size="small"
              onClick={() =>
                setEditingId(
                  editingId === medicament.DWAID ? null : medicament.DWAID
                )
              }
              sx={{ textTransform: "none" }}
            >
              {editingId === medicament.DWAID ? "Done" : "Edit"}
            </Button>
          </Stack>

          {editingId === medicament.DWAID ? (
            <Stack spacing={2} className="mt-3">
              <TextField
                label="Instructions"
                multiline
                rows={2}
                fullWidth
                value={medicament.instructions || ""}
                onChange={(e) =>
                  handleUpdateMedicament(
                    medicament.DWAID,
                    "instructions",
                    e.target.value
                  )
                }
                placeholder="Enter instructions (e.g., Take after meals)"
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Posologie"
                  type="text"
                  value={medicament.posologie || ""}
                  onChange={(e) =>
                    handleUpdateMedicament(
                      medicament.DWAID,
                      "posologie",
                      e.target.value
                    )
                  }
                  sx={{ width: "30%" }}
                />

                <TextField
                  label="Voie"
                  type="text"
                  value={medicament.voie || ""}
                  onChange={(e) =>
                    handleUpdateMedicament(
                      medicament.DWAID,
                      "voie",
                      e.target.value
                    )
                  }
                  sx={{ width: "30%" }}
                />

                <TextField
                  label="Quantity"
                  type="number"
                  value={medicament.quantity}
                  onChange={(e) =>
                    handleUpdateMedicament(
                      medicament.DWAID,
                      "quantity",
                      parseInt(e.target.value, 10)
                    )
                  }
                  inputProps={{ min: 1 }}
                  sx={{ width: "30%" }}
                />

                <FormControl sx={{ width: "70%" }}>
                  <InputLabel>Unit</InputLabel>
                  <Select
                    value={medicament.unit || "pieces"}
                    label="Unit"
                    onChange={(e) =>
                      handleUpdateMedicament(
                        medicament.DWAID,
                        "unit",
                        e.target.value
                      )
                    }
                  >
                    {unites.map((unit) => (
                      <MenuItem key={unit.id} value={unit}>
                        {unit.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          ) : (
            <Box className="mt-1">
              {medicament.instructions && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  paragraph
                  className="mb-1"
                >
                  <strong>Instructions:</strong> {medicament.instructions}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                <strong>Quantity:</strong> {medicament.quantity || 1}{" "}
                {medicament.unit.name || medicament.unit || "pieces"}
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Paper>
  );
};

export default MedicamentList;

import { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";

const MedicamentList = ({ medicaments, onListChange }) => {
    const [editingId, setEditingId] = useState(null);
  
    const unitOptions = ["pieces", "bottles", "boxes", "tablets", "capsules", "mL"];
  
    const handleUpdateMedicament = (index, field, value) => {
      const updatedMedicaments = [...medicaments];
      updatedMedicaments[index] = {
        ...updatedMedicaments[index],
        [field]: value,
      };
      onListChange(updatedMedicaments);
    };
  
    if (medicaments.length === 0) {
      return (
        <Paper elevation={0} className="p-4 mt-4 border border-gray-300 rounded-lg">
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
        
        {medicaments.map((medicament, index) => (
          <Box 
            key={index} 
            className="p-3 mb-3 border border-gray-200 rounded-lg"
            sx={{
              backgroundColor: editingId === index ? 'rgba(0, 0, 0, 0.04)' : 'transparent'
            }}
          >
            <Stack 
              direction="row" 
              justifyContent="space-between" 
              alignItems="flex-start"
            >
              <Typography variant="subtitle1" fontWeight={500}>
                {medicament.name} ({medicament.dosage})
              </Typography>
              <Button 
                startIcon={<Edit />} 
                size="small" 
                onClick={() => setEditingId(editingId === index ? null : index)}
                sx={{ textTransform: 'none' }}
              >
                {editingId === index ? 'Done' : 'Edit'}
              </Button>
            </Stack>
            
            {editingId === index ? (
              <Stack spacing={2} className="mt-3">
                <TextField
                  label="Instructions"
                  multiline
                  rows={2}
                  fullWidth
                  value={medicament.instructions || ''}
                  onChange={(e) => handleUpdateMedicament(index, 'instructions', e.target.value)}
                  placeholder="Enter instructions (e.g., Take after meals)"
                />
                
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={medicament.quantity || 1}
                    onChange={(e) => handleUpdateMedicament(index, 'quantity', parseInt(e.target.value, 10) || 1)}
                    inputProps={{ min: 1 }}
                    sx={{ width: '30%' }}
                  />
                  
                  <FormControl sx={{ width: '70%' }}>
                    <InputLabel>Unit</InputLabel>
                    <Select
                      value={medicament.unit || 'pieces'}
                      label="Unit"
                      onChange={(e) => handleUpdateMedicament(index, 'unit', e.target.value)}
                    >
                      {unitOptions.map((unit) => (
                        <MenuItem key={unit} value={unit}>
                          {unit}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>
            ) : (
              <Box className="mt-1">
                {medicament.instructions && (
                  <Typography variant="body2" color="text.secondary" paragraph className="mb-1">
                    <strong>Instructions:</strong> {medicament.instructions}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  <strong>Quantity:</strong> {medicament.quantity || 1} {medicament.unit || 'pieces'}
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Paper>
    );
  };

export default MedicamentList;
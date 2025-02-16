import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
const MedicamentChipsSelect = ({
  data = [],
  title = "Medicaments",
  selectedMedicaments = [],
  onMedicamentsChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(false);

  const handleToggle = (chip) => {
    const updatedChips = selectedMedicaments.some((med) => med.name === chip.name)
      ? selectedMedicaments.filter((item) => item.name !== chip.name)
      : [...selectedMedicaments, chip];

    console.log("updatedChips", updatedChips);

    onMedicamentsChange(updatedChips);
  };

  const filteredData = data.filter((medicament) =>
    medicament.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedMedicamentsList = filteredData.filter((medicament) =>
    selectedMedicaments.some((med) => med.name === medicament.name)
  );

  const remainingMedicamentsList = filteredData.filter(
    (medicament) =>
      !selectedMedicaments.some((med) => med.name === medicament.name)
  );

  // Helper function to render chip label with name and dosage
  const renderChipLabel = (medicament) => {
    return `${medicament.name} (${medicament.dosage})`;
  };

  return (
    <Box className="w-full bg-white border border-[#B4B4B4] p-4 rounded-lg">
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 500, cursor: "pointer" }}
            onClick={() => setSelected((prev) => !prev)}
          >
            {title}
          </Typography>

          {selected ? (
            <TextField
              variant="outlined"
              placeholder="Search medicament"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                },
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                    position="end"
                  >
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
            />
          ) : null}
        </Stack>
        <Button variant="outlined" sx={{ textTransform: "none" }}>
          Modify
        </Button>
      </Stack>

      <Stack
        direction={"row"}
        gap={2}
        flexWrap={"wrap"}
        mt={selected || selectedMedicaments.length > 0 ? 1 : 0}
      >
        {!selected && selectedMedicaments.length > 0
          ? selectedMedicaments.map((medicament, index) => {
              return (
                <React.Fragment key={index}>
                  <Typography variant="body2">
                    {renderChipLabel(medicament)}
                  </Typography>
                  {index < selectedMedicaments.length - 1 && (
                    <Divider
                      sx={{ borderColor: "#000" }}
                      flexItem
                      orientation="vertical"
                    />
                  )}
                </React.Fragment>
              );
            })
          : null}
      </Stack>

      {selected && (
        <Stack direction={"row"} gap={1} flexWrap={"wrap"} mt={2}>
          {/* Render selected medicaments first */}
          {selectedMedicamentsList.map((medicament, index) => (
            <Chip
              key={index}
              label={renderChipLabel(medicament)}
              onClick={() => handleToggle(medicament)}
              onDelete={() => handleToggle(medicament)}
              deleteIcon={<Close sx={{ width: "0.75em", height: "0.75em" }} />}
              color="primary"
              variant="filled"
              sx={{ cursor: "pointer", borderRadius: "8px" }}
            />
          ))}
          {/* Render remaining medicaments */}
          {remainingMedicamentsList.map((medicament, index) => (
            <Chip
              key={index}
              label={renderChipLabel(medicament)}
              onClick={() => handleToggle(medicament)}
              color="default"
              variant="outlined"
              sx={{ cursor: "pointer", borderRadius: "8px" }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default MedicamentChipsSelect;

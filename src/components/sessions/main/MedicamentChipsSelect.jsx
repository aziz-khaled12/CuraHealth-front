import { Add, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const MedicamentChipsSelect = ({
  data = [],
  title = "Medicaments",
  selectedMedicaments = [],
  onMedicamentsChange,
  unites = [],
  onAddNewMedicament, // New prop for handling the API call
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showAll, setShowAll] = useState(false);

  console.log(data);

  const handleToggle = (chip) => {
    const updatedChips = selectedMedicaments.some(
      (med) => med.DWAID === chip.DWAID
    )
      ? selectedMedicaments.filter((item) => item.DWAID !== chip.DWAID)
      : [
          ...selectedMedicaments,
          {
            ...chip,
            instructions: chip.GeneralInstraction?.Instraction || "",
            quantity: chip.GeneralInstraction?.Quantity || 1,
            unit: chip.GeneralInstraction?.Unite?.NameUnite || unites[0] || "",
            posologie: chip.GeneralInstraction?.Pososition || "",
            voie: chip.GeneralInstraction?.LeVoie || "",
          },
        ];

    onMedicamentsChange(updatedChips);
  };

  const handleCreateNewMedicament = async () => {
    if (!searchQuery.trim() || !onAddNewMedicament) return;

    setIsCreating(true);
    try {
      // Call the API to create new medicament
      const newMedicament = await onAddNewMedicament(searchQuery.trim());

      // Create a properly formatted medicament object
      const formattedMedicament = {
        DWAID: newMedicament.id || newMedicament.DWAID,
        NameDWA:
          newMedicament.name || newMedicament.NameDWA || searchQuery.trim(),
        GeneralInstraction: {
          Instraction: "",
          Quantity: 1,
          Unite: { NameUnite: unites[0] || "" },
          Pososition: "",
          LeVoie: "",
        },
      };

      // Automatically select the newly created medicament
      handleToggle(formattedMedicament);

      // Clear search query
      setSearchQuery("");
    } catch (error) {
      console.error("Error creating new medicament:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsCreating(false);
    }
  };

  const filteredData = data.filter((medicament) =>
    medicament.NameDWA.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedMedicamentsList = filteredData.filter((medicament) =>
    selectedMedicaments.some((med) => med.DWAID === medicament.DWAID)
  );

  const remainingMedicamentsList = filteredData.filter(
    (medicament) =>
      !selectedMedicaments.some((med) => med.DWAID === medicament.DWAID)
  );

  // Pagination logic
  const displayLimit = 25;
  const shouldLimitDisplay = !showAll && !searchQuery.trim();
  const displayedRemaining = shouldLimitDisplay
    ? remainingMedicamentsList.slice(0, displayLimit)
    : remainingMedicamentsList;

  const hasMoreToShow = remainingMedicamentsList.length > displayLimit;
  const showSeeMoreButton = shouldLimitDisplay && hasMoreToShow;
  const showSeeLessButton = showAll && !searchQuery.trim() && hasMoreToShow;

  // Check if search query doesn't match any existing medicament
  const hasExactMatch = filteredData.some(
    (medicament) =>
      medicament.NameDWA.toLowerCase() === searchQuery.toLowerCase()
  );

  const showCreateOption =
    searchQuery.trim() && !hasExactMatch && onAddNewMedicament;

  // Helper function to render chip label with name
  const renderChipLabel = (medicament) => {
    return `${medicament.NameDWA}`;
  };

  return (
    <Box className="w-full bg-white border border-[#B4B4B4] p-4 rounded-lg">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap={2}>
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
       
      </Stack>

      <Stack
        direction="row"
        gap={2}
        flexWrap="wrap"
        mt={selected || selectedMedicaments.length > 0 ? 1 : 0}
      >
        {!selected && selectedMedicaments.length > 0
          ? selectedMedicaments.map((medicament, index) => {
              return (
                <React.Fragment key={medicament.DWAID}>
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
        <Stack direction="column" gap={2} mt={2}>
          {/* Show create new medicament option */}
          {showCreateOption && (
            <Stack direction="row" gap={1} alignItems="center">
              <Chip
                label={`Add "${searchQuery}"`}
                onClick={handleCreateNewMedicament}
                disabled={isCreating}
                icon={
                  isCreating ? (
                    <CircularProgress size={16} />
                  ) : (
                    <Add sx={{ width: "0.75em", height: "0.75em" }} />
                  )
                }
                color="success"
                variant="outlined"
                sx={{
                  cursor: "pointer",
                  borderRadius: "8px",
                  borderStyle: "dashed",
                  "&:hover": {
                    backgroundColor: "success.light",
                    color: "white",
                  },
                }}
              />
              <Typography variant="caption" color="text.secondary">
                Create new medicament
              </Typography>
            </Stack>
          )}

          {/* Existing medicaments */}
          <Stack direction="row" gap={1} flexWrap="wrap">
            {/* Render selected medicaments first */}
            {selectedMedicamentsList.map((medicament) => (
              <Chip
                key={medicament.DWAID}
                label={renderChipLabel(medicament)}
                onClick={() => handleToggle(medicament)}
                onDelete={() => handleToggle(medicament)}
                deleteIcon={
                  <Close sx={{ width: "0.75em", height: "0.75em" }} />
                }
                color="primary"
                variant="filled"
                sx={{ cursor: "pointer", borderRadius: "8px" }}
              />
            ))}
            {/* Render remaining medicaments */}
            {displayedRemaining.map((medicament) => (
              <Chip
                key={medicament.DWAID}
                label={renderChipLabel(medicament)}
                onClick={() => handleToggle(medicament)}
                color="default"
                variant="outlined"
                sx={{ cursor: "pointer", borderRadius: "8px" }}
              />
            ))}
            <Button
              variant="text"
              size="small"
              onClick={() => setShowAll(!showAll)}
              sx={{
                textTransform: "none",
              }}
            >
              {showAll
                ? "See Less"
                : `See More (${
                    remainingMedicamentsList.length - displayLimit
                  } more)`}
            </Button>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default MedicamentChipsSelect;

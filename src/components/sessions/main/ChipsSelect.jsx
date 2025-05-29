import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSessionAttribute } from "../../../redux/sessionSlice";
import { addNewAppointmentData } from "../../../redux/appointmentDataSlice";
import {
  Chip,
  Box,
  TextField,
  InputAdornment,
  Stack,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Close, Add } from "@mui/icons-material";
import { FaSearch } from "react-icons/fa";

const ChipsSelect = ({ name = "", data = [], title = "", id, type }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showAll, setShowAll] = useState(false);

  console.log(data);

  const dispatch = useDispatch();

  // Select the relevant category (e.g., diagnoses, medicaments) and find the session by ID
  const categoryData = useSelector((state) => state.sessions[name]) || [];
  const sessionData = categoryData.find((session) => session.sessionId === id);

  const selectedChips = sessionData ? sessionData.data : [];

  const handleToggle = (chip) => {
    const isSelected = selectedChips.some((item) => item.id === chip.id);
    const updatedChips = isSelected
      ? selectedChips.filter((item) => item.id !== chip.id) // Unselect
      : [...selectedChips, chip]; // Select

    dispatch(
      updateSessionAttribute({
        sessionId: id,
        category: name,
        newData: updatedChips,
      })
    );
  };

  const handleCreateNewItem = async () => {
    if (!searchQuery.trim() || !type) return;

    setIsCreating(true);
    try {
      const newItem = await dispatch(
        addNewAppointmentData({
          type: type,
          data: searchQuery.trim(),
        })
      );

      console.log("New item created:", newItem);

      // Check if the new item was created successfully and has the expected structure
      if (newItem.payload && newItem.payload.data && newItem.payload.data[0]) {
        handleToggle(newItem.payload.data[0]);
      } else {
        console.error("Unexpected structure in newly created item:", newItem);
      }

      setSearchQuery("");
    } catch (error) {
      console.error("Error creating new item:", error);
    } finally {
      setIsCreating(false);
    }
  };

  // Flatten the data array and filter with null/undefined checks
  const flattenedData = data.flat(); // This will flatten any nested arrays

  const filteredData = flattenedData.filter((chip) => {
    // Check if chip exists and has a name property
    if (!chip || typeof chip.name !== "string") {
      console.warn("Invalid chip data found:", chip);
      return false;
    }
    return chip.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const selectedChipsList = filteredData.filter((chip) =>
    selectedChips.some((selected) => selected && selected.id === chip.id)
  );

  const remainingChipsList = filteredData.filter(
    (chip) =>
      !selectedChips.some((selected) => selected && selected.id === chip.id)
  );

  const displayLimit = 25;
  const shouldLimitDisplay = !showAll && !searchQuery.trim();
  const displayedRemaining = shouldLimitDisplay
    ? remainingChipsList.slice(0, displayLimit)
    : remainingChipsList;

  const hasMoreToShow = remainingChipsList.length > displayLimit;
  const showSeeMoreButton = shouldLimitDisplay && hasMoreToShow;
  const showSeeLessButton = showAll && !searchQuery.trim() && hasMoreToShow;

  const hasExactMatch = filteredData.some(
    (item) =>
      item && item.name && item.name.toLowerCase() === searchQuery.toLowerCase()
  );

  const showCreateOption =
    searchQuery.trim() && !hasExactMatch && type && type !== "Services";

  return (
    <Box className="w-full bg-white border border-[#B4B4B4] p-4 rounded-lg">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 500, cursor: "pointer" }}
            onClick={() => setSelected(!selected)}
          >
            {title}
          </Typography>

          {selected && (
            <TextField
              variant="outlined"
              placeholder="Search"
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
          )}
        </Stack>
       
      </Stack>

      <Stack
        direction="row"
        gap={2}
        flexWrap="wrap"
        mt={selected || selectedChips.length > 0 ? 1 : 0}
      >
        {!selected && selectedChips.length > 0
          ? selectedChips
              .filter((chip) => chip && chip.name) // Add safety check here too
              .map((chip, index) => (
                <React.Fragment key={chip.id}>
                  <Typography variant="body2">{chip.name}</Typography>
                  {index <
                    selectedChips.filter((c) => c && c.name).length - 1 && (
                    <Divider
                      sx={{ borderColor: "#000" }}
                      flexItem
                      orientation="vertical"
                    />
                  )}
                </React.Fragment>
              ))
          : null}
      </Stack>

      {selected && (
        <Stack direction="column" gap={2} mt={2}>
          {/* Show create new item option */}
          {showCreateOption && (
            <Stack direction="row" gap={1} alignItems="center">
              <Chip
                label={`Add "${searchQuery}"`}
                onClick={handleCreateNewItem}
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
                Create new {title.toLowerCase().slice(0, -1)}
              </Typography>
            </Stack>
          )}

          {/* Existing items */}
          <Stack direction="row" gap={1} flexWrap="wrap">
            {/* Render selected chips first */}
            {selectedChipsList.map((chip) => (
              <Chip
                key={chip.id}
                label={chip.name}
                onClick={() => handleToggle(chip)}
                onDelete={() => handleToggle(chip)}
                deleteIcon={
                  <Close sx={{ width: "0.75em", height: "0.75em" }} />
                }
                color="primary"
                variant="filled"
                sx={{ cursor: "pointer", borderRadius: "8px" }}
              />
            ))}
            {/* Render remaining chips */}
            {displayedRemaining.map((chip) => (
              <Chip
                key={chip.id}
                label={chip.name}
                onClick={() => handleToggle(chip)}
                color="default"
                variant="outlined"
                sx={{ cursor: "pointer", borderRadius: "8px" }}
              />
            ))}

            {(showSeeMoreButton || showSeeLessButton) && (
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
                      remainingChipsList.length - displayLimit
                    } more)`}
              </Button>
            )}
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default ChipsSelect;

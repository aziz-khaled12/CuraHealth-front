import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSessionAttribute } from "../../../redux/sessionSlice";
import {
  Chip,
  Box,
  TextField,
  InputAdornment,
  Stack,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { FaSearch } from "react-icons/fa";

const ChipsSelect = ({ name = "", data = [], title = "", id }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(false);

  console.log(data)

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

  const filteredData = data.filter((chip) =>
    chip.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChipsList = filteredData.filter((chip) =>
    selectedChips.some((selected) => selected.id === chip.id)
  );

  const remainingChipsList = filteredData.filter(
    (chip) => !selectedChips.some((selected) => selected.id === chip.id)
  );

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
        <Button variant="outlined" sx={{ textTransform: "none" }}>
          Modify
        </Button>
      </Stack>

      <Stack
        direction="row"
        gap={2}
        flexWrap="wrap"
        mt={selected || selectedChips.length > 0 ? 1 : 0}
      >
        {!selected && selectedChips.length > 0
          ? selectedChips.map((chip, index) => (
              <React.Fragment key={chip.id}>
                <Typography variant="body2">{chip.name}</Typography>
                {index < selectedChips.length - 1 && (
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
        <Stack direction="row" gap={1} flexWrap="wrap" mt={2}>
          {selectedChipsList.map((chip) => (
            <Chip
              key={chip.id}
              label={chip.name}
              onClick={() => handleToggle(chip)}
              onDelete={() => handleToggle(chip)}
              deleteIcon={<Close sx={{ width: "0.75em", height: "0.75em" }} />}
              color="primary"
              variant="filled"
              sx={{ cursor: "pointer", borderRadius: "8px" }}
            />
          ))}
          {remainingChipsList.map((chip) => (
            <Chip
              key={chip.id}
              label={chip.name}
              onClick={() => handleToggle(chip)}
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

export default ChipsSelect;

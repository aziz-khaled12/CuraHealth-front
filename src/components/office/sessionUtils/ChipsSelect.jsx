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
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FaSearch } from "react-icons/fa";

const ChipsSelect = forwardRef(({
  name = "",
  data = [],
  title = "",
  initialValue = [],
}, ref) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(false);
  const [selectedChips, setSelectedChips] = useState(initialValue);


  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    getValue: () => selectedChips,
    setValue: (value) => setSelectedChips(value),
  }));

  const handleToggle = (chip) => {
    const updatedChips = selectedChips.includes(chip)
      ? selectedChips.filter((item) => item !== chip)
      : [...selectedChips, chip];

    setSelectedChips(updatedChips);
  };

  const filteredData = data.filter((chip) =>
    chip.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChipsList = filteredData.filter((chip) =>
    selectedChips.includes(chip)
  );

  const remainingChipsList = filteredData.filter(
    (chip) => !selectedChips.includes(chip)
  );

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
            onClick={() => setSelected((prevSelected) => !prevSelected)}
          >
            {title}
          </Typography>

          {selected ? (
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
        mt={selected || selectedChips.length > 0 ? 1 : 0}
      >
        {!selected && selectedChips.length > 0
          ? selectedChips.map((chip, index) => {
              return (
                <React.Fragment key={index}>
                  <Typography variant="body2">{chip}</Typography>
                  {index < selectedChips.length - 1 && (
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
          {/* Render selected chips first */}
          {selectedChipsList.map((chip, index) => (
            <Chip
              key={index}
              label={chip}
              onClick={() => handleToggle(chip)}
              onDelete={() => handleToggle(chip)}
              deleteIcon={<Close sx={{ width: "0.75em", height: "0.75em" }} />}
              color="primary"
              variant="filled"
              sx={{ cursor: "pointer", borderRadius: "8px" }}
            />
          ))}
          {/* Render remaining chips */}
          {remainingChipsList.map((chip, index) => (
            <Chip
              key={index}
              label={chip}
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
});

ChipsSelect.displayName = 'ChipsSelect';

export default ChipsSelect;

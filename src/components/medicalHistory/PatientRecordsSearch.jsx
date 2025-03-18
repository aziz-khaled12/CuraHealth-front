import {
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaSearch, FaSortNumericDown, FaTable } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

const PatientRecordsSearch = ({
  selected,
  setSelected,
  setSearch,
  filters,
  setFilters,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setFilters(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchQuery);
  };

  useEffect(() => {
    if (searchQuery === "") {
      setSearch("");
    }
  }, [searchQuery])

  return (
    <div className="w-full gap-2 flex items-center">
      <div className="flex-[12]">
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="search"
            variant="outlined"
            placeholder="Search"
            size="small"
            sx={{
              background: "white",
              borderRadius: "8px",

              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                fontSize: "0.9rem",
              },
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                  position="start"
                >
                  <FaSearch className="text-primary"/>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </div>
      <div className="flex-[2]">
        <FormControl variant="outlined" fullWidth className="w-fit">
          <Select
            value={filters}
            size="small"
            onChange={handleChange}
            sx={{
              borderRadius: "8px",
              fontSize: "0.9rem",
            }}
            placeholder="Sort By"
            startAdornment={
              <FaSortNumericDown className="mr-2 text-xl text-gray-500" />
            }
            className="bg-white shadow-md rounded-xl"
          >
            <MenuItem value={0} disabled sx={{ display: "none" }}>
              Sort
            </MenuItem>
            <div className="px-4 py-2 font-semibold text-[0.9rem] ">
              Sort By
            </div>
            <Divider orientation="horizontal" flexItem></Divider>
            <MenuItem sx={{ fontSize: "0.9rem" }} value="name">
              Name
            </MenuItem>
            <MenuItem sx={{ fontSize: "0.9rem" }} value="date">
              Date
            </MenuItem>
            <MenuItem sx={{ fontSize: "0.9rem" }} value="price">
              Price
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="flex gap-2 flex-[1]">
        <IconButton
          onClick={() => setSelected("card")}
          sx={{ borderRadius: "8px" }}
          className={`!rounded-lg !text-[1rem] ${
            selected === "card" ? "!bg-primary !text-white" : ""
          }`}
        >
          <IoDocumentTextOutline />
        </IconButton>
        <IconButton
          sx={{ borderRadius: "8px" }}
          onClick={() => setSelected("table")}
          className={`!rounded-lg !text-[1rem] ${
            selected === "table" ? "!bg-primary !text-white" : ""
          }`}
        >
          <FaTable />
        </IconButton>
      </div>
    </div>
  );
};

export default PatientRecordsSearch;

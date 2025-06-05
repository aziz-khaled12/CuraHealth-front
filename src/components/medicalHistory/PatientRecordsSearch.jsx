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
import { FaSearch, FaTable } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

const PatientRecordsSearch = ({
  selected,
  setSelected,
  setSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

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

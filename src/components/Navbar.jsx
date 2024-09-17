import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { CiSearch } from "react-icons/ci";
import AvatarWithList from "./AvatarWithList";

const Navbar = () => {
  const [selectedSearch, setSelectedSearch] = useState("all");
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const handleChange = (event) => {
    setSelectedSearch(event.target.value);
  };

  return (
    <nav className="flex items-center justify-between w-full p-4">
      <div className="flex gap-5 max-h-[45px]">
        <div className="border border-solid border-[#DCDFE3] rounded-md">
          <FormControl sx={{ p: 0, width: 166, m: 0 }}>
            <Select
              value={selectedSearch}
              sx={{
                maxHeight: "40px",
                fontSize: "14px",
                borderRadius: "6px 0px 0px 6px",
              }}
              onChange={handleChange}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"phoneNum"}>Phone Number</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 0, width: 260, p: 0 }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              placeholder="Search"
              sx={{
                maxHeight: "40px",
                fontSize: "14px",
                borderRadius: "0 6px 6px 0",
              }}
              startAdornment={
                <InputAdornment position="start">
                  <CiSearch className="text-2xl" />
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
            />
          </FormControl>
        </div>
        <Button
          variant="contained"
          className="!bg-primary !text-primaryText"
          sx={{ maxHeight: "40px", textTransform: "none", width: "100px" }}
        >
          Search
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <AvatarWithList settings={settings} />
        <div className="leading-4">
          <div className="text-md font-medium text-darkText ">Ahmed Twati</div>
          <div className="text-sm font-medium text-lightText ">Doctor</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

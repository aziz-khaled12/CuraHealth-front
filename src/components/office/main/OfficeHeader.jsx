import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import {
  TextField,
  InputAdornment,
  Typography,
  Badge,
  IconButton,
  Tooltip,
} from "@mui/material";
import { format } from "date-fns";

const OfficeHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <Typography variant="h4" className="font-semibold mb-2">
          Welcome Dr. Khaled
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {format(new Date(), "EEEE, MMMM d, yyyy")}
        </Typography>
      </div>

      <div className="flex items-center gap-4">
        <TextField
          size="small"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: "100%", sm: "250px" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />

        <Tooltip title="Notifications">
          <IconButton>
            <Badge badgeContent={3} color="error">
              <FaBell />
            </Badge>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default OfficeHeader;
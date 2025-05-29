import React from "react";
import {
  Typography
} from "@mui/material";
import { format } from "date-fns";

const OfficeHeader = () => {
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
    </div>
  );
};

export default OfficeHeader;
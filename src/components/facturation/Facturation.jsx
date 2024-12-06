import React, { useEffect, useState } from "react";
import FacturationModal from "./FacturationModal";
import { Box, Button } from "@mui/material";
import Header from "../Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MdAdd } from "react-icons/md";
import { useSelector } from "react-redux";

const Facturation = () => {
  const [open, setOpen] = useState(false);

  const factures = useSelector(state => state.factures.factures)

  useEffect(() => {
    console.log(factures)
  }, [factures])

  const columns = [
    {
      field: "id",
      headerName: "#",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Service Name",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
  ];

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className={`w-full transition-all duration-100 ease-in-out`}>
      {open && (
        <FacturationModal open={open} setOpen={setOpen} cellData={null} />
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Header
          title={"Facturation"}
          subTitle={"Manage your Bills and Functionalities"}
        />

        <Button
          startIcon={<MdAdd />}
          onClick={handleOpen}
          variant="contained"
          sx={{ textTransform: "none" }}
          className="!bg-primary"
        >
          New Facture
        </Button>
      </Box>

      <Box sx={{ height: "69vh" }}>
        <DataGrid
          rows={factures}
          slots={{ toolbar: GridToolbar }}
          columns={columns}
          autoPageSize
          sx={{
            width: "100%",
            "@media (max-width: 600px)": {
              "& .MuiDataGrid-root": {
                fontSize: "0.8rem",
              },
            },
          }}
        />
      </Box>
    </div>
  );
};

export default Facturation;

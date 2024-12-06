import React, { useState } from "react";
import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { addFacture } from "../../redux/factureSlice";
const FacturationModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (price.length > 0 && name.length > 0) {
      const newFacture = {
        name: name,
        price: price,
      };
      dispatch(addFacture(newFacture));
    }
    handleClose()
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1300,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 className="mb-10 text-2xl font-semibold">Add Facture</h2>
        <Stack gap={2}>
          <Stack direction={"row"} gap={2}>
            <TextField
              name="name"
              fullWidth
              placeholder="Service Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              name="price"
              fullWidth
              placeholder="Price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </Stack>
          <Button
            variant="filled"
            fullWidth
            className="!bg-primary !text-white"
            onClick={handleSubmit}
          >
            Add Facture
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default FacturationModal;

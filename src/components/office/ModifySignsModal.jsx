import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { LuPencil, LuPlus, LuTrash2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { add, set } from "date-fns";
import { addSign, updateSign } from "../../redux/signsSlice";

const ModifySignsModal = ({ open, handleClose }) => {
  const [alignment, setAlignment] = useState("");
  const [selectedSign, setSelectedSign] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { signs } = useSelector((state) => state.signs);

  const [newSign, setNewSign] = useState({
    name: "",
    unit: "",
    type: "",
    placeholder: "",
  });

  const handleChange = (e) => {
    selectedSign != null
      ? setSelectedSign({ ...selectedSign, [e.target.name]: e.target.value })
      : setNewSign({ ...newSign, [e.target.name]: e.target.value });
  };
  const handleButtonChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleCancel = () => {
    setAlignment(null);
    setSelectedSign(null);
    setShow(false);
  };

  const handleAdd = () => {
    dispatch(addSign(newSign));
    setShow(false);
    setNewSign({ name: "", unit: "", type: "", placeholder: "" });
  };

  const handleUpdate = () => {
    dispatch(updateSign(selectedSign));
    setSelectedSign(null);
    setShow(false); 
  };

  const hanldeSignSelect = (sign) => {
    setSelectedSign(sign);
    setShow(true);
  };

  useEffect(() => {
    console.log(alignment);
  }, [alignment]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90vw",
          height: "90vh",
          overflowY: "auto",
          bgcolor: "white",
          borderRadius: "8px",
          boxShadow: 24,
        }}
      >
        <Stack direction={"row"} height={"100%"}>
          <Stack
            direction={"column"}
            sx={{ width: "30%" }}
            px={3}
            py={4}
            gap={2}
          >
            <h1 className="text-2xl font-semibold text-darkText">
              Manage Signs
            </h1>
            <Button
              startIcon={<LuPlus size={20} />}
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={() => {
                setShow(true);
                setNewSign({ name: "", unit: "", type: "", placeholder: "" }),
                setAlignment(null);
                setSelectedSign(null);
              }}
            >
              Add new Sign
            </Button>
            <Stack direction={"column"} gap={1}>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleButtonChange}
                aria-label="Platform"
                orientation="vertical"
              >
                {signs.map((sign, index) => {
                  return (
                    <ToggleButton
                      key={index}
                      value={sign.name}
                      onClick={() => {
                        hanldeSignSelect(sign);
                      }}
                      sx={{
                        width: "100%",
                        textTransform: "none",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <div className="w-fit text-base mb-1 font-medium text-darkText">
                        {sign.name}
                      </div>
                      <div className="text-sm font-medium text-lightText">
                        {sign.unit}
                      </div>
                    </ToggleButton>
                  );
                })}
              </ToggleButtonGroup>
            </Stack>
          </Stack>

          {show ? (
            <Stack
              direction={"column"}
              sx={{ width: "70%", backgroundColor: "rgb(155 155 155 / 0.2)" }}
              p={4}
              gap={2}
            >
              <div className="w-full rounded-md bg-white p-6">
                <div className="mb-6">
                  <h1 className="text-2xl mb-1 font-semibold text-darkText ">
                    {selectedSign != null ? "Edit Sign" : "Add New Sign"}
                  </h1>
                  <p className="text-sm font-medium text-lightText">
                    Modify the sign details below
                  </p>
                </div>

                <Stack direction={"column"} gap={2} mb={4}>
                  <div className="w-full">
                    <h1 className="text-base font-medium text-darkText mb-2">
                      Name
                    </h1>
                    <TextField
                      fullWidth
                      name="name"
                      value={
                        selectedSign != null ? selectedSign.name : newSign.name
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full flex gap-4">
                    <div className="w-1/2">
                      <h1 className="text-base font-medium text-darkText mb-2">
                        Unit
                      </h1>
                      <TextField
                        fullWidth
                        name="unit"
                        value={
                          selectedSign != null
                            ? selectedSign.unit
                            : newSign.unit
                        }
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-1/2">
                      <h1 className="text-base font-medium text-darkText mb-2">
                        Type
                      </h1>
                      <TextField
                        fullWidth
                        name="type"
                        value={
                          selectedSign != null
                            ? selectedSign.type
                            : newSign.type
                        }
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <h1 className="text-base font-medium text-darkText mb-2">
                      Placeholder
                    </h1>
                    <TextField
                      fullWidth
                      name="placeholder"
                      value={
                        selectedSign != null
                          ? selectedSign.placeholder
                          : newSign.placeholder
                      }
                      onChange={handleChange}
                    />
                  </div>
                </Stack>

                <div className="w-full flex items-center justify-end gap-4">
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    sx={{ textTransform: "none" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={selectedSign != null ? handleUpdate : handleAdd}
                    variant="contained"
                    sx={{ textTransform: "none" }}
                  >
                    {selectedSign != null ? "Update Sign" : "Add Sign"}
                  </Button>
                </div>
              </div>
            </Stack>
          ) : (
            <>
              <div className="w-[70%] h-full bg-lightText/20 flex items-center justify-center">
                <div className="text-lg font-semibold text-lightText">
                  Select a sign to view details
                </div>
              </div>
            </>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModifySignsModal;

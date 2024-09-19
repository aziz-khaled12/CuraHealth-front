import { Button, InputAdornment, Modal, TextField } from "@mui/material";
import React, { useState } from "react";

const AddNewModal = ({ open, setOpen }) => {


  const [formData, setFormData] = useState({
    patient: "",
    category: "",
    start_time: "",
    end_time: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData();

   
    form.append("patient", patient);
    form.append("category", formData.category);
    form.append("start_time", formData.start_time);
    form.append("end_time", formData.end_time);

    try {
        
    } catch (error) {
        
    }
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="w-[570px] rounded-2xl absolute top-1/2 left-1/2 transform py-6 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl">
          <div className="text-2xl pl-8 pb-4 font-semibold  w-full ">
            Add new Room
          </div>
          <form
            className="  flex items-center flex-col"
            onSubmit={handleSubmit}
          >
            <div className="w-full p-10 overflow-y-auto max-h-[540px] custom-scrollbar flex items-center gap-5 flex-col mb-5">
              <div className="flex flex-col items-start w-full">
                <h1 className="text-md font-medium mb-3">Patient</h1>
                <TextField
                  className="w-full"
                  name="patient"
                  onChange={handleChange}
                  hiddenLabel

                />
              </div>
              <div className="w-full flex justify-between gap-[20px]">
                <div className="flex flex-col justify-between items-start w-full">
                  <h1 className="text-md font-medium mb-3">Address</h1>
                  <TextField
                    name="start_time"
                    onChange={handleChange}
                    hiddenLabel
                    type="category"
                  />
                </div>

                <div className="flex flex-col justify-between items-start w-full">
                  <h1 className="text-md font-medium mb-3">Double Beds</h1>
                  <TextField
                    name="end_time"
                    onChange={handleChange}
                    label="Double Beds"
                    type="category"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </div>
              <div className="w-full flex justify-between gap-[20px]">
                <div className="flex flex-col justify-between items-start w-full">
                  <h1 className="text-md font-medium mb-3">Price</h1>
                  <TextField
                    className="w-full"
                    name="price"
                    onChange={handleChange}
                    label="Price"
                    type="category"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">DZD</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>

                <div className="flex flex-col justify-between items-start w-full">
                  <h1 className="text-md font-medium mb-3">Available Rooms</h1>
                  <TextField
                    name="available"
                    onChange={handleChange}
                    label="Available Rooms"
                    type="category"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="contained"
                className="!bg-primary !rounded-lg !p-3 !text-base w-[90%]"
              >
                {status === "loading" ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <style>{`.spinner_z9k8{color: white;transform-origin:center;animation:spinner_StKS .75s infinite linear}@keyframes spinner_StKS{100%{transform:rotate(360deg)}}`}</style>
                    <path
                      d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                      opacity=".25"
                    />
                    <path
                      d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                      className="spinner_z9k8"
                    />
                  </svg>
                ) : (
                  "Add Appointment"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddNewModal;

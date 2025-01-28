import { Stack, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TasksForm = ({ formData, setFormData }) => {
  const { services } = useSelector((state) => state.services);

  useEffect(() => {
    console.log("formData: ", formData);  
  }, [formData]);

  const handleChange = (id) => {
    if (formData.services.includes(id)) {
      // Remove the id from the services array
      const updatedData = {
        ...formData,
        services: formData.services.filter((service) => service !== id),
      };
      setFormData(updatedData);
    } else {
      // Add the id to the services array
      const updatedData = {
        ...formData,
        services: [...formData.services, id], 
      };
      setFormData(updatedData);
    }
  };

  useEffect(() => {
    console.log("services: ", services);
  }, [services]);

  return (
    <div className="rounded-lg p-8 border-2 border-solid border-lightText/20">
      <div className="text-2xl font-semibold mb-6">Additional Services</div>
      <Stack direction={"column"} gap={2}>
        {services.map((service, index) => {
          return (
            <div
              key={index}
              className="w-full flex items-center justify-between bg-white p-4 rounded-md border-2 border-solid border-lightText/20"
            >
              <div className="w-fit text-lg font-medium text-darkText">
                {service.name}
              </div>
              <Switch
                checked={formData.services.includes(service.id)}
                onChange={(e) => handleChange(service.id)}
              ></Switch>
            </div>
          );
        })}
      </Stack>
    </div>
  );
};

export default TasksForm;

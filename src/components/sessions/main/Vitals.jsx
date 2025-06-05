import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import VitalsInput from "../sessionUtils/VitalsInput";
import { useDispatch, useSelector } from "react-redux";
import { updateSessionAttribute } from "../../../redux/sessionSlice";
import { fetchVitals } from "../../../redux/signsSlice";
import { Edit } from "@mui/icons-material";
import ModifySignsModal from "../sessionUtils/ModifySignsModal";

const Vitals = ({ id }) => {
  const [selected, setSelected] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // State for modal
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVitals());
  }, [dispatch]);

  const { generalSigns } = useSelector((state) => state.signs);
  const vitals = useSelector(
    (state) =>
      state.sessions.vitals.find((vital) => vital.sessionId === id)?.data || []
  );

  const [formData, setFormData] = useState(vitals || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const currentVitals = Array.isArray(formData) ? formData : [];

    const updatedVitals = [
      ...currentVitals.filter((vital) => vital.name !== name),
      { id: generalSigns.find((sign) => sign.name === name)?.id, name, value },
    ];

    setFormData(updatedVitals);
    dispatch(
      updateSessionAttribute({
        sessionId: id,
        category: "vitals",
        newData: updatedVitals,
      })
    );
  };

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  return (
    <Box className="w-full bg-white border border-[#B4B4B4] p-4 rounded-lg">
      <Typography
        variant="h6"
        sx={{ fontWeight: 500, cursor: "pointer" }}
        onClick={() => setSelected(!selected)}
      >
        Vitals
      </Typography>

      {selected ? (
        <Box className="flex gap-6 flex-wrap mt-4">
          {generalSigns.map((sign, index) => (
            <VitalsInput
              key={index}
              sign={sign}
              formData={formData}
              handleChange={handleChange}
              selected={selected}
            />
          ))}
          <Button
            variant={"text"}
            sx={{ textTransform: "none" }}
            startIcon={<Edit />}
            onClick={() => setModalOpen(true)} // Open modal on click
          >
            Modify
          </Button>
        </Box>
      ) : (
        <Stack
          direction={"row"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={2}
          mt={formData?.length > 0 ? 1 : 0}
        >
          {generalSigns
            .map((sign, index) => {
              const vital = formData?.find((vital) => vital.name === sign.name);

              if (vital) {
                return (
                  <Stack key={index} direction={"row"} alignItems={"center"}>
                    <Typography variant="body2" className="!font-medium !mr-1">
                      {sign.name}:
                    </Typography>
                    <Typography variant="body2">
                      {vital.value} {sign.unit}
                    </Typography>
                  </Stack>
                );
              }

              return null;
            })
            .filter(Boolean)
            .flatMap((element, idx, array) =>
              idx < array.length - 1
                ? [
                    element,
                    <Divider
                      sx={{ borderColor: "#000" }}
                      key={`divider-${idx}`}
                      orientation="vertical"
                      flexItem
                    />,
                  ]
                : [element]
            )}
        </Stack>
      )}

      {/* Add the modal component */}
      <ModifySignsModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
    </Box>
  );
};

export default Vitals;

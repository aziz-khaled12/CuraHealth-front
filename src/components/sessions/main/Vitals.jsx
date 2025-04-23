import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import VitalsInput from "../sessionUtils/VitalsInput";
import { useDispatch, useSelector } from "react-redux";
import { updateSessionAttribute } from "../../../redux/sessionSlice";
import { fetchVitals } from "../../../redux/signsSlice";
// import { modifySession } from "../../../redux/sessionSlice";

const Vitals = ({ id }) => {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVitals());
  }, [dispatch]);

  const { generalSigns } = useSelector((state) => state.signs);
  const vitals = useSelector(
    (state) =>
      state.sessions.vitals.find((vital) => vital.sessionId === id).data
  );
  const [formData, setFormData] = useState(vitals || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const currentVitals = Array.isArray(formData) ? formData : [];

    const updatedVitals = [
      ...currentVitals.filter((vital) => vital.name !== name),
      { id: generalSigns.find((sign) => sign.name === name)?.id, name, value }, // Include id
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
              if (sign.name === "Blood Pressure") {
                const bp1 = formData?.find(
                  (vital) => vital.name === "BloodPressure1"
                )?.value;
                const bp2 = formData?.find(
                  (vital) => vital.name === "BloodPressure2"
                )?.value;

                if (bp1 && bp2) {
                  return (
                    <Stack key={index} direction={"row"} alignItems={"center"}>
                      <Typography
                        variant="body2"
                        className="!font-medium !mr-1"
                      >
                        {sign.name}:
                      </Typography>
                      <Typography variant="body2">
                        {bp1}/{bp2} {sign.unit}
                      </Typography>
                    </Stack>
                  );
                }
              } else {
                const vital = formData?.find(
                  (vital) => vital.name === sign.name
                );

                if (vital) {
                  return (
                    <Stack key={index} direction={"row"} alignItems={"center"}>
                      <Typography
                        variant="body2"
                        className="!font-medium !mr-1"
                      >
                        {sign.name}:
                      </Typography>
                      <Typography variant="body2">
                        {vital.value} {sign.unit}
                      </Typography>
                    </Stack>
                  );
                }
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
    </Box>
  );
};

export default Vitals;

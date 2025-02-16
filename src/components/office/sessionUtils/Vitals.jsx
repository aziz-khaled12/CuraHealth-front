import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import VitalsInput from "./VitalsInput";
import { useDispatch, useSelector } from "react-redux";

const Vitals = forwardRef(({ initialValue = [] }, ref) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(false);
  const { generalSigns } = useSelector((state) => state.signs);
  const [vitals, setVitals] = useState(initialValue);

  useImperativeHandle(ref, () => ({
    getValue: () => vitals,
    setValue: (value) => setVitals(value),
  }));
  const handleChange = (e) => {
    const { name, value } = e.target;
    const currentVitals = Array.isArray(vitals) ? vitals : [];

    const updatedVitals = [
      ...currentVitals.filter((vital) => vital.name !== name),
      { name, value },
    ];

    setVitals(updatedVitals);
  };

  return (
    <Box className="w-full bg-white border border-[#B4B4B4] p-4 rounded-lg">
      <Typography
        variant="h6"
        sx={{ fontWeight: 500, cursor: "pointer" }}
        onClick={() => setSelected((prevSelected) => !prevSelected)}
      >
        Vitals
      </Typography>

      {selected ? (
        <Box className="flex gap-6 flex-wrap mt-4">
          {generalSigns.map((sign, index) => (
            <VitalsInput
              key={index}
              sign={sign}
              formData={vitals}
              handleChange={handleChange}
            />
          ))}
        </Box>
      ) : (
        <Stack
          direction={"row"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={2}
          mt={vitals?.length > 0 ? 1 : 0}
        >
          {generalSigns
            .map((sign, index) => {
              if (sign.name === "Blood Pressure") {
                const bp1 = vitals?.find(
                  (vital) => vital.name === "BloodPressure1"
                )?.value;
                const bp2 = vitals?.find(
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
                const vitalValue = vitals?.find(
                  (vital) => vital.name === sign.name
                )?.value;

                if (vitalValue) {
                  return (
                    <Stack key={index} direction={"row"} alignItems={"center"}>
                      <Typography
                        variant="body2"
                        className="!font-medium !mr-1"
                      >
                        {sign.name}:
                      </Typography>
                      <Typography variant="body2">
                        {vitalValue} {sign.unit}
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
});

Vitals.displayName = "Vitals";

export default Vitals;

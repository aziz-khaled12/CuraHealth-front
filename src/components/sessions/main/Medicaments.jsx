import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import MedicamentChipsSelect from "./MedicamentChipsSelect";
import MedicamentList from "./MedicamentList";
import { useDispatch, useSelector } from "react-redux";
import { updateSessionAttribute } from "../../../redux/sessionSlice";
// import { modifySession } from "../../../redux/sessionSlice";

const Medicaments = ({ id, availableMedicaments = [] }) => {
  const { data } = useSelector(
    (state) =>
      state.sessions.medicaments.filter(
        (medicament) => medicament.sessionId === id
      )[0]
  );
  const dispatch = useDispatch();


  const { unites } = useSelector((state) => state.appointmentsData);
  console.log(unites)

  const handleChange = (updatedMedicaments) => {
    const modifyData = {
      sessionId: id,
      category: "medicaments",
      newData: updatedMedicaments,
    };
    console.log("modifyData: ", modifyData);

    dispatch(updateSessionAttribute(modifyData));
  };

  return (
    <Stack spacing={2} className="w-full">
      <MedicamentChipsSelect
        data={availableMedicaments}
        selectedMedicaments={data || []}
        onMedicamentsChange={handleChange}
        unites={unites}
      />
      <MedicamentList
        medicaments={data || []}
        onListChange={handleChange}
        unites={unites}
      />
    </Stack>
  );
};

export default Medicaments;

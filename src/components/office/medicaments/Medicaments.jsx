import { Stack } from "@mui/material";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import MedicamentChipsSelect from "./MedicamentChipsSelect";
import MedicamentList from "./MedicamentList";

const Medicaments = forwardRef(({ data = [], initialValue = [] }, ref) => {
  // Parent is the single source of truth
  const [selectedMedicaments, setSelectedMedicaments] = useState(initialValue);

   // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      getValue: () => selectedMedicaments,
      setValue: (value) => setSelectedMedicaments(value),
    }));

  return (
    <Stack spacing={2} className="w-full">
      <MedicamentChipsSelect
        data={data}
        selectedMedicaments={selectedMedicaments}
        onMedicamentsChange={setSelectedMedicaments}
      />
      <MedicamentList 
        medicaments={selectedMedicaments} 
        onListChange={setSelectedMedicaments} 
      />
    </Stack>
  );
});

export default Medicaments;

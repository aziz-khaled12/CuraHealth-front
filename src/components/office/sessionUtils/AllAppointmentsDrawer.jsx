import { Box, Button, Drawer } from "@mui/material";
import { calculateWaitingTime } from "../../../utils/TimeManipulationFunctions";
import { useSelector } from "react-redux";

const AllAppointmentsDrawer = ({ open, onClose, startSession }) => {
  const { appointments } = useSelector((state) => state.appointments);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, height: "100%" }} role="presentation" py={2}>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 10,
            padding: 2,
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <h1 className="text-2xl font-semibold">Patients Queue</h1>
        </Box>

        {appointments.map((appointment, index) => {
          return (
            <div key={index} className="w-full p-4">
              <div className="w-full p-4 border border-solid border-lightText/80 rounded-md shadow-sm">
                <div className="w-full mb-2">
                  <h1 className="text-lg font-medium">
                    {appointment.patient.fullName}
                  </h1>
                  <p className="text-sm text-lightText">
                    Priority: {appointment.category}
                  </p>
                  <p className="text-sm text-lightText">
                    Age: {appointment.age}
                  </p>
                  <p className="text-sm text-lightText">
                    Wait Time:{" "}
                    {calculateWaitingTime(appointment.createdAt).formatted}
                  </p>
                </div>
                <Button
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  fullWidth
                  onClick={() => startSession(appointment)}
                >
                  Start Appointment
                </Button>
              </div>
            </div>
          );
        })}
      </Box>
    </Drawer>
  );
};

export default AllAppointmentsDrawer;

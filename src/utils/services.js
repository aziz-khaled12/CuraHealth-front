import axios from "axios";

const url = import.meta.env.VITE_BACK_END_URL;
const token = localStorage.getItem("token");

const formatPatientRecord = (record) => {

  return {
    id: record.AppointmntID,
    doctor: record.DoctorName,
    type: record.ServiceName,
    startedAt: new Date(record.StartTime).toISOString(),
    category: record.ApponmentCategoryName,
    status: "Completed",
    patientName: record.PatientName,
    diagnosis: record.Li3lashat?.Diagnostic || [],
    consultationCause: record.Li3lashat?.Motifs || [],

    vitals:
      record.Status?.map((status) => {
        return {
          name: status.Status,
          value: status.Value,
          unit: JSON.parse(status.Info)?.unit || "",
        };
      }) || [],

    medicaments:
      record.DWA?.map((dwa) => {
        return {
          name: dwa.DwaName,
          unit: dwa.UnitName,
          frequency: dwa.Pososition,
          quantity: dwa.Quantity,
          instructions: dwa.Instraction
        };
      }) || [],
    physicalSigns: record.Li3lashat?.SingePhysic || [],
    functionalSigns: record.Li3lashat?.SingeFunctionnal || [],
    services: [record.ServiceName],
    files: record.File || [],
  };
};

export const fetchPatientRecords = async (patientId, setData) => {
  try {
    console.log("entered fetchPatientRecords");

    const res = await axios.get(
      `${url}/api/HstoricalRecored?PatientID=${patientId}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
    console.log("res: ", res.data.response.appointments);

    const records = res.data.response.appointments.map((record) =>
      formatPatientRecord(record)
    );
    console.log("records: ", records);
    setData(records);
  } catch (err) {
    return err.response?.data?.error || "Something went wrong";
  }
};

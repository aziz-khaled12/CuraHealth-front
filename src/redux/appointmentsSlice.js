import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { selectSessionById } from "../components/sessions/sessionUtils/sessionSelectors";
import { parseISO } from "date-fns";

let nextId = 1;
const token = localStorage.getItem("token");
const url = import.meta.env.VITE_BACK_END_URL;

const transformAppointments = (appointments) => {
  return appointments.map((appt) => {
    const patient = appt.Patient || {};
    const doctor = appt.Doctor || {};
    const category = appt.ApponmentCategory || {};

    return {
      appointmnt_id: appt.AppointmntID,
      patientName: `${patient.FirstName || ""} ${
        patient.LastName || ""
      }`.trim(),
      first_name: patient.FirstName || "",
      last_name: patient.LastName || "",
      birth_day: parseISO(patient.BirthDay || "0001-01-01T00:00:00Z"),
      date: parseISO(appt.CreatedAt),
      created_at: parseISO(appt.CreatedAt),
      name_category: category.NameCategory || "",
      phone_num: patient.PhoneNum || "",
      email: patient.Email || "",
      doctor_name: doctor.Name || "",
    };
  });
};

export const fetchAppointmentCategories = createAsyncThunk(
  "appointment/fetchAppointmentCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/api/All/ApponmentCategory`);
      const categories = res.data.apponment_category;
      return categories;
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/api/Apponment`, appointmentData, {
        headers: { Authorization: `${token}` },
      });
      console.log("res: ", res);
      const appointment = res.data.appointment;
      return appointment;
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);

export const startAppointment = createAsyncThunk(
  "appointments/startAppointment",
  async (appointmentId, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${url}/api/StartAppointmnt`,
        { AppointmntID: appointmentId },
        {
          headers: { Authorization: `${token}` },
        }
      );
      console.log("res: ", res);
      const appointment = res.data.appointment;
      // return appointment;
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);

// Function to transform a single medicament
const transformMedicament = (medicament) => ({
  DWAID: medicament.DWAID,
  GeneralInstractionID: medicament.GeneralInstractionID || null,
  NewInstraction: {
    Pososition: medicament.posologie || "",
    Quantity: medicament.quantity || 0,
    LeVoie: medicament.voie || "",
    Instraction: medicament.instructions || "",
    UniteID:
      medicament.unit.id
  },
});

// Function to prepare request data
const prepareEndAppointmentRequest = (appointmentId, sessionData) => ({
  Appointmnt: appointmentId,
  Status: sessionData.vitals.map((v) => ({
    StatusID: v.id,
    value: v.value,
  })),
  Li3laShat: {
    Diagnostic: sessionData.diagnoses.map((d) => d.id),
    Motifs: sessionData.consultationCauses.map((s) => s.id),
    SingePhysic: sessionData.physicalSigns.map((s) => s.id),
    SingeFunctionnal: sessionData.functionalSigns.map((s) => s.id),
  },
  DWAs: sessionData.medicaments.map(transformMedicament),
});

// API call to end the appointment
export const endAppointment = createAsyncThunk(
  "appointments/endAppointment",
  async (appointmentId, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${url}/api/EndAppointmnt`,
        { AppointmntID: appointmentId },
        {
          headers: { Authorization: `${token}` },
        }
      );

      console.log("End Appointment Response:", res);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to end appointment"
      );
    }
  }
);

export const submitAppointmentData = createAsyncThunk(
  "appointments/submitAppointmentData",
  async ({ appointmentId, sessionId }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const sessionData = selectSessionById(state, sessionId);


      if (!sessionData) throw new Error("Session not found");
      if (!sessionData.files || !Array.isArray(sessionData.files)) {
        throw new Error("Invalid session files data");
      }

      const requestData = prepareEndAppointmentRequest(
        appointmentId,
        sessionData
      );

      const formData = new FormData();

      formData.append("jsonData", JSON.stringify(requestData));

      sessionData.files.forEach((file) => {
        formData.append("files", file.binary);
      });


      const res = await axios.post(`${url}/api/AppointmmentIsDone`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      });

      console.log("Submit Appointment Data Response:", res);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error ||
          err.message ||
          "Failed to submit appointment data"
      );
    }
  }
);

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async (today = false, { rejectWithValue }) => {
    try {
      const fetchString = today
        ? `${url}/api/All/Apponment`
        : `${url}/api/All/Apponment`;
      const res = await axios.get(fetchString);
      const appointments = res.data.appointments;
      console.log("appointments: ", appointments);
      return appointments;
    } catch (err) {
      return rejectWithValue(err.response.data.error || "Something went wrong");
    }
  }
);

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    categories: [],
    appointmentStatus: "idle",
    error: null,
  },
  reducers: {
    addAppointment: (state, action) => {
      const newAppointment = {
        id: nextId++,
        ...action.payload,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
      state.appointments.push(newAppointment);
    },
    updateAppointment: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingAppointment = state.appointments.find(
        (appointment) => appointment.appointmnt_id === id
      );
      if (existingAppointment) {
        Object.assign(existingAppointment, changes);
      }
    },
    deleteAppointment: (state, action) => {
      const id = action.payload;
      state.appointments = state.appointments.filter(
        (appointment) => appointment.id !== id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.appointmentStatus = "succeeded";
        console.log(action.payload);
        state.appointments = action.payload;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.appointmentStatus = "succeeded";
        console.log(action.payload);
        state.appointments.push(action.payload);
      })
      .addCase(fetchAppointmentCategories.fulfilled, (state, action) => {
        state.appointmentStatus = "succeeded";
        console.log("fetch: ", action.payload);
        state.categories = action.payload;
      })

      .addCase(startAppointment.fulfilled, (state, action) => {
        state.appointmentStatus = "succeeded";
        console.log("start: ", action.payload);
      })

      .addMatcher(
        isAnyOf(
          createAppointment.pending,
          fetchAppointmentCategories.pending,
          fetchAppointments.pending,
          startAppointment.pending
        ),
        (state) => {
          state.appointmentStatus = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          createAppointment.rejected,
          fetchAppointmentCategories.rejected,
          fetchAppointments.rejected,
          startAppointment.rejected
        ),
        (state, action) => {
          state.appointmentStatus = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const { addAppointment, updateAppointment, deleteAppointment } =
  appointmentsSlice.actions;

export default appointmentsSlice.reducer;

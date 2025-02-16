import React, { useCallback, useRef, useState } from "react";
import Vitals from "./sessionUtils/Vitals";
import { Box, Button, Divider, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaFileInvoice, FaPrint } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { addSession } from "../../redux/patientsSlice";
import { deleteSession } from "../../redux/sessionSlice";
import ChipsSelect from "./sessionUtils/ChipsSelect";
import PatientInfo from "../PatientInfo";
import InfoSection from "../InfoSection";
import Medicaments from "./medicaments/Medicaments";
import { updateAppointment } from "../../redux/appointmentsSlice";
import MedicamentChipsSelect from "./medicaments/MedicamentChipsSelect";

const diagnoses = [
  "Anemia",
  "Diabetes Mellitus",
  "Hypertension",
  "Hypotension",
  "Pneumonia",
  "Asthma",
  "Chronic Obstructive Pulmonary Disease (COPD)",
  "Heart Failure",
  "Myocardial Infarction (Heart Attack)",
  "Stroke",
  "Meningitis",
  "Encephalitis",
  "Parkinson’s Disease",
  "Epilepsy",
  "Migraine",
  "Hypothyroidism",
  "Hyperthyroidism",
  "Kidney Failure",
  "Urinary Tract Infection (UTI)",
  "Gastroenteritis",
  "Peptic Ulcer Disease",
  "Liver Cirrhosis",
  "Hepatitis",
  "Sepsis",
  "Osteoarthritis",
  "Rheumatoid Arthritis",
  "Lupus",
  "Depression",
  "Anxiety Disorder",
  "Schizophrenia",
  "Alzheimer’s Disease",
  "Multiple Sclerosis",
  "Cancer (various types)",
  "Tuberculosis",
  "COVID-19",
  "Dengue Fever",
  "Malaria",
  "Dehydration",
  "Electrolyte Imbalance",
];

const physicalSigns = [
  "Fever",
  "Low body temperature",
  "Fast heart rate",
  "Slow heart rate",
  "High blood pressure",
  "Low blood pressure",
  "Rapid breathing",
  "Slow breathing",
  "Pale skin",
  "Bluish skin (cyanosis)",
  "Jaundice",
  "Swelling (edema)",
  "Finger clubbing",
  "Skin rash",
  "Abnormal pupil reaction",
  "Muscle weakness",
  "Muscle stiffness",
  "Tremors",
  "Abnormal lung sounds",
  "Heart murmur",
  "Swollen joints",
  "Lymph node swelling",
  "Abdominal bloating",
  "Tenderness on touch",
];

const functionalSigns = [
  "Drowsiness",
  "Memory loss",
  "Confusion",
  "Slurred speech",
  "Difficulty speaking",
  "Blurred vision",
  "Double vision",
  "Hearing loss",
  "Dizziness",
  "Loss of balance",
  "Weakness in limbs",
  "Paralysis",
  "Unsteady walking",
  "Tremors",
  "Difficulty swallowing",
  "Constipation",
  "Incontinence",
  "Numbness",
  "Tingling",
  "Shortness of breath",
  "Fatigue",
  "Chest pain",
  "Difficulty performing daily tasks",
];

const consultationCauses = [
  "Fever and chills",
  "Persistent cough",
  "Headache and dizziness",
  "Chest pain",
  "Shortness of breath",
  "Abdominal pain",
  "Skin rash or irritation",
  "Joint pain and stiffness",
  "Fatigue and weakness",
  "Allergic reaction",
  "High blood pressure",
  "Unexplained weight loss",
  "Anxiety and stress",
  "Depression and mood swings",
  "Digestive issues (bloating, gas, nausea)",
  "Urinary tract infection (UTI)",
  "Ear pain or infection",
  "Sore throat and difficulty swallowing",
  "Back pain and muscle strain",
  "Dizziness and balance issues",
];

const medicaments = [
  {
    name: "Paracetamol",
    dosage: "500 mg",
  },
  {
    name: "Ibuprofen",
    dosage: "200 mg",
  },
  {
    name: "Amoxicillin",
    dosage: "500 mg",
  },
  {
    name: "Aspirin",
    dosage: "100 mg",
  },
  {
    name: "Ciprofloxacin",
    dosage: "250 mg",
  },
  {
    name: "Metformin",
    dosage: "850 mg",
  },
  {
    name: "Loratadine",
    dosage: "10 mg",
  },
  {
    name: "Omeprazole",
    dosage: "20 mg",
  },
  {
    name: "Atorvastatin",
    dosage: "10 mg",
  },
  {
    name: "Losartan",
    dosage: "50 mg",
  },
];

export default function Session({ sessionId }) {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);

  const session = useSelector(
    (state) =>
      state.sessions.sessions.filter(
        (session) => session.sessionId === sessionId
      )[0]
  );

  // Create refs for each component
  const componentRefs = {
    vitals: useRef(null),
    consultationCause: useRef(null),
    physicalSigns: useRef(null),
    functionalSigns: useRef(null),
    services: useRef(null),
    diagnosis: useRef(null),
    medicaments: useRef(null),
  };

  // Handler for updating form data
  const handleFormChange = useCallback((section, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: value,
    }));
  }, []);

  const appointment = useSelector(
    (state) =>
      state.appointments.appointments.filter(
        (appointment) => appointment.id === session.appointmentId
      )[0]
  );

  const sections = [
    {
      name: "consultationCause",
      title: "Consultation Cause",
      data: consultationCauses,
      initialValue: session?.consultationCause || [],
    },
    {
      name: "physicalSigns",
      title: "Physical Signs",
      data: physicalSigns,
      initialValue: session?.physicalSigns || [],
    },
    {
      name: "functionalSigns",
      title: "Functional Signs",
      data: functionalSigns,
      initialValue: session?.functionalSigns || [],
    },
    {
      name: "services",
      title: "Services",
      data: services.map((service) => service.name),
      initialValue: session?.services || [],
    },
    {
      name: "diagnosis",
      title: "Diagnosis",
      data: diagnoses,
      initialValue: session?.diagnosis || [],
    },
  ];

  const closeVisit = () => {
    // Gather all data from refs
    const formData = {
      vitals: componentRefs.vitals.current?.getValue(),
      consultationCause: componentRefs.consultationCause.current?.getValue(),
      physicalSigns: componentRefs.physicalSigns.current?.getValue(),
      functionalSigns: componentRefs.functionalSigns.current?.getValue(),
      services: componentRefs.services.current?.getValue(),
      diagnosis: componentRefs.diagnosis.current?.getValue(),
      medicaments: componentRefs.medicaments.current?.getValue(),
    };

    console.log("formData", formData);

    const sessionData = {
      ...session,
      ...formData,
      status: "Completed",
      finishedAt: new Date().toLocaleString(),
    };

    dispatch(updateAppointment({ ...appointment, status: "Completed" }));
    dispatch(
      addSession({ patientId: session.patientId, session: sessionData })
    );
    dispatch(deleteSession(sessionId));
  };

  const cancelVisit = () => {
    dispatch(updateAppointment({ ...appointment, status: "Cancelled" }));
    dispatch(deleteSession(sessionId)); // Dispatch the action
  };

  const tabs = [
    {
      icon: <FaCheckCircle className="text-primary text-base" />,
      title: "Close Visit",
      click: closeVisit,
    },
    {
      icon: <FaCircleXmark className="text-primary text-base" />,
      title: "Cancel Visit",
      click: cancelVisit,
    },
    {
      icon: <FaPrint className="text-primary" />,
      title: "Print",
    },
    {
      icon: <FaFileInvoice className="text-primary" />,
      title: "Invoices",
    },
  ];

  return (
    <Box className="w-full flex gap-4 items-start justify-between min-h-[40vh] bg-lightBg p-8">
      <Box className="w-[75%] ">
        <Stack
          direction="row"
          className="w-full rounded-lg text-sm font-medium border border-[#B4B4B4] mb-2"
        >
          {tabs.map((tab, index) => (
            <React.Fragment key={index}>
              <Button
                sx={{
                  textTransform: "none",
                  color: "#000",
                  gap: "8px",
                  borderRight: "1px solid #B4B4B4",
                  ...(index === 0 && {
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                  }),
                  borderRadius: "0px",
                  padding: "8px 16px",
                }}
                onClick={tab.click}
              >
                {tab.icon}
                <span>{tab.title}</span>
              </Button>
              {index < tabs.length - 1 && (
                <Divider flexItem variant="fullWidth" />
              )}
            </React.Fragment>
          ))}
        </Stack>
        <section className="overflow-y-auto max-h-[75vh] flex flex-col gap-2 custom-scrollbar">
          {/* Vitals Section */}
          <Vitals ref={componentRefs.vitals} initialValue={session?.vitals} />

          {sections.map((section, index) => (
            <ChipsSelect
              key={index}
              data={section.data}
              title={section.title}
              name={section.name}
              ref={componentRefs[section.name]}
              initialValue={section.initialValue}
              onChange={handleFormChange}
            />
          ))}

          <Medicaments
            data={medicaments}
            ref={componentRefs.medicaments}
            initialValue={session?.medicaments || []}
          />
        </section>
      </Box>

      {/* Patient Info Sidebar */}
      <section className="w-[25%] flex flex-col gap-4 h-[80vh]">
        <PatientInfo />
        <InfoSection title="Medical History" height="70%" />
        <InfoSection title="Invoices" height="10%" />
      </section>
    </Box>
  );
}

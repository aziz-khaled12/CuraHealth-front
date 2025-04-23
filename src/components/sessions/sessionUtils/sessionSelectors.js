import { createSelector } from "@reduxjs/toolkit";

export const selectSessionById = (state, sessionId) => {
  return {
    session: state.sessions.sessions.find((s) => s.sessionId === sessionId),
    files: state.sessions.files.find((s) => s.sessionId === sessionId)?.data || [],
    vitals: state.sessions.vitals.find((s) => s.sessionId === sessionId)?.data || [],
    diagnoses: state.sessions.diagnoses.find((s) => s.sessionId === sessionId)?.data || [],
    medicaments: state.sessions.medicaments.find((s) => s.sessionId === sessionId)?.data || [],
    physicalSigns: state.sessions.physicalSigns.find((s) => s.sessionId === sessionId)?.data || [],
    functionalSigns: state.sessions.functionalSigns.find((s) => s.sessionId === sessionId)?.data || [],
    consultationCauses: state.sessions.consultationCauses.find((s) => s.sessionId === sessionId)?.data || [],
  };
};
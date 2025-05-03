// src/pdf/PDFRenderer.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import MedicalRecordTemplate from "../components/random/MedicalRecordTemplate";

export function renderToContainer(record, clinic) {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px"; // Hide it off-screen
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);
  root.render(<MedicalRecordTemplate record={record} clinic={clinic} />);

  return container;
}

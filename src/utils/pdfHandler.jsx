import React from "react";
import { createRoot } from "react-dom/client";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import MedicalRecord from "../pdf/MedicalRecordTemplate";
import PageOne from "../pdf/PageOne";
import PageTwo from "../pdf/PageTwo";
import PageThree from "../pdf/PageThree";


const createTempContainer1 = (record, clinicInfo) => {
  // Create container div
  const container1 = document.createElement("div");
  container1.style.position = "absolute";
  container1.style.left = "-9999px";
  container1.style.width = "810px"; // A4 width
  container1.style.backgroundColor = "white";
  document.body.appendChild(container1);

  // Render the medical record template into the container1
  const root = createRoot(container1);
  root.render(
    <div
      className="bg-white mx-auto"
      style={{
        width: "794px", // A4 width at 96 DPI
        minHeight: "1123px", // A4 height at 96 DPI
        boxSizing: "border-box",
      }}
    >
      <PageOne record={record} clinic={clinicInfo} />
    </div>
  );

  return container1;
};

const createTempContainer2 = (record, clinicInfo) => {
  // Create container div
  const container2 = document.createElement("div");
  container2.style.position = "absolute";
  container2.style.left = "-9999px";
  container2.style.width = "810px"; // A4 width
  container2.style.backgroundColor = "white";
  document.body.appendChild(container2);

  // Render the medical record template into the container2
  const root = createRoot(container2);
  root.render(
    <div
      className="bg-white mx-auto"
      style={{
        width: "794px", // A4 width at 96 DPI
        minHeight: "1123px", // A4 height at 96 DPI
        boxSizing: "border-box",
      }}
    >
      <PageTwo record={record} clinic={clinicInfo} />
    </div>
  );

  return container2;
};



const removeTempContainer = (container) => {
  setTimeout(() => {
    if (container && container.parentNode) {
      document.body.removeChild(container);
    }
  }, 100);
};

let root;

export const printPDF = (medicalRecord, clinicInfo) => {
  const container = document.getElementById("pdf-container");
  if (!container) return;

  if (root) {
    root.unmount();
  }
  root = createRoot(container);
  root.render(
    <div className="w-[794px] min-h-[1123px] bg-white">
      <PageOne record={medicalRecord} clinic={clinicInfo} />
    </div>
  );
  setTimeout(() => {
    window.print();
  }, 300);
};

export const downloadPDF = (record, clinicInfo) => {
  // Create and append temporary containers
  const container1 = createTempContainer1(record, clinicInfo);
  const container2 = createTempContainer2(record, clinicInfo);

  const containers = [container1, container2];

  // Wait for React to render the content
  setTimeout(async () => {
    try {
      // Create filename
      const date = new Date().toISOString().split("T")[0];
      const sanitizedName = record.patientName
        .replace(/\s+/g, "-")
        .toLowerCase();
      const filename = `${sanitizedName}-medical-record-${date}.pdf`;

      // Convert to canvas
      const scale = 2; // Higher scale for better quality

      const canvases = await Promise.all(
        containers.map((container) =>
          html2canvas(container, {
            scale: scale,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
          })
        )
      );

      // A4 dimensions in mm: 210 x 297
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Margins
      const marginX = 10; // Default margin on X-axis
      const marginY = 10; // Default margin on Y-axis
      const imgWidth = 210 - 2 * marginX; // Subtract margins from width

      canvases.forEach((canvas, index) => {
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", marginX, marginY, imgWidth, imgHeight);

        if (index < canvases.length - 1) {
          pdf.addPage();
        }
      });

      pdf.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      containers.forEach((container) => {
        removeTempContainer(container);
      });
    }
  }, 300);
};

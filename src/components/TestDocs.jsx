import { Button, Stack } from "@mui/material";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";

const TestDocs = () => {
  return (
      <div className="w-full h-full px-8 py-4 border-2 border-lightText/20 border-solid rounded-lg">
        <div className="text-2xl font-semibold text-darkText mb-6">
          Documents importés
        </div>

        <div
          className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${
            files.length === 0 ? "block" : "hidden"
          }`}
        >
          <p className="text-sm text-gray-500 mb-4">
            Glissez-déposez vos fichiers ici ou cliquez pour les sélectionner
          </p>
          <label htmlFor="file-upload">
            <Button
              component="span"
              variant="outlined"
              sx={{ textTransform: "none", color: "black" }}
            >
              ➕ Importer un document
            </Button>
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

        <div
          className={`${
            files.length === 0 ? "hidden" : "flex"
          } flex-wrap w-full h-full`}
        >
          {files.map((file, index) => (
            <div className="p-2 w-1/6" key={index}>
              <Stack
                className="rounded-lg border-2 border-lightText/20 border-solid shadow-md"
                direction="column"
                alignItems="center"
                p={4}
                gap={2}
                onClick={() => handleFileSelect(file.url)}
              >
                <GrDocumentText className="mr-2 text-2xl" />
                <div>{file.title}</div>
              </Stack>
            </div>
          ))}
          <div className="w-1/6 p-2">
            <label
              htmlFor="file-upload"
              className="rounded-lg h-full min-h-[8rem] border-2 border-lightText border-dashed shadow-md flex items-center justify-center"
            >
              <FaPlus className="text-2xl" />
            </label>
          </div>
        </div>
      </div>
  );
};

export default TestDocs;

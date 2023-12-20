"use client";

import { useState } from "react";
// Import the main component
import { OpenFile, Viewer } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

import { getFilePlugin } from "@react-pdf-viewer/get-file";
import { searchPlugin } from "@react-pdf-viewer/search";

// Import styles
import "@react-pdf-viewer/search/lib/styles/index.css";

type PDFProps = {
  src: string;
  // fileNameGenerator: (openFile: OpenFile) => string;
};

export default function PDF(props: PDFProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  // download instance
  const getFilePluginInstance = getFilePlugin();
  const { DownloadButton } = getFilePluginInstance;

  // search instance
  const searchPluginInstance = searchPlugin();

  function onLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  return (
    <>
      <div
        className="rpv-core__viewer"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          height: "700px",
        }}>
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#eeeeee",

            display: "flex",
            padding: "4px",
          }}>
          <DownloadButton />
        </div>
        <div
          style={{
            flex: 1,
            overflow: "hidden",
          }}>
          <Viewer
            fileUrl={props.src}
            plugins={[getFilePluginInstance, searchPluginInstance]}
          />
        </div>
      </div>
    </>
  );
}

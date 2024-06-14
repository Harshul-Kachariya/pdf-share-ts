import { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { AiOutlineShareAlt } from "react-icons/ai";

const PdfViewer = ({ file }: any) => {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState("");
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(file);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfBlob(blob);
        setPdfBlobUrl(url);
        console.log(blob);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };
    fetchPdf();
  }, [file]);

  // console.log(pdfBlobUrl, file);
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "PDF Document",
          files: [
            new File([pdfBlob!], "document.pdf", { type: "application/pdf" }),
          ],
        });
        console.log("Successful share");
      } else {
        console.log("Web Share API not supported");
      }
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="text-gray-600 text-xl absolute z-50 md:top-2 top-2 right-10 md:right-56"
      >
        <AiOutlineShareAlt />
      </button>
      {pdfBlobUrl && (
        <Worker workerUrl="/pdf.worker.min.js">
          <Viewer
            fileUrl={pdfBlobUrl}
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      )}
    </div>
  );
};

export default PdfViewer;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EvidenceViewer = () => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await fetch(`https://www.hs-service.api.crealape.com/api/v1/evidence/${id}`, {
          headers: {
            accept: "application/pdf",
          },
          credentials: "include"
        });
        console.log('Status de respuesta:', response.status);
        if (!response.ok) throw new Error("No se pudo cargar el PDF. Status: " + response.status);
        const blob = await response.blob();
        setPdfUrl(URL.createObjectURL(blob));
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPDF();
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [id]);

  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!pdfUrl) return <div className="p-6">Cargando evidencia...</div>;

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="mb-4 text-xl font-bold">Evidencia PDF</h2>
      <iframe
        src={pdfUrl}
        title="Evidencia PDF"
        width="800"
        height="600"
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default EvidenceViewer;

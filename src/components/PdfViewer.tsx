// src/components/PdfViewer.tsx
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
    fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
    return (
        <div>
            <h3>PDF Viewer</h3>
            <iframe
                src={fileUrl}
                width="100%"
                height="600px"
                title="PDF Viewer"
                frameBorder="0"
            ></iframe>
        </div>
    );
};

export default PdfViewer;

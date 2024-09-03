// src/components/CustomPdfViewer.tsx
import React, { useEffect, useRef, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

// Set the PDF.js worker path
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface CustomPdfViewerProps {
    fileUrl: string;
}

const CustomPdfViewer: React.FC<CustomPdfViewerProps> = ({ fileUrl }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;

            // Disable the context menu
            container.addEventListener('contextmenu', (event) => event.preventDefault());

            // Disable the print option using CSS
            const disablePrint = () => {
                const style = document.createElement('style');
                style.innerHTML = `
                    @media print {
                        .pdfViewerContainer {
                            display: none;
                        }
                    }
                `;
                document.head.appendChild(style);
            };

            disablePrint();

            return () => {
                document.head.querySelectorAll('style').forEach((style) => style.remove());
            };
        }
    }, [fileUrl]);

    const onDocumentLoadSuccess = (pdf: any) => {
        setNumPages(pdf.numPages);
        setCurrentPage(1); // Reset to the first page when a new document is loaded
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages || 1));
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div
            className="pdfViewerContainer"
            ref={containerRef}
            style={{ textAlign: 'center', padding: '20px' }}
        >
            <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) => console.error('Error while loading PDF:', error)}
            >
                <Page pageNumber={currentPage} />
            </Document>
            {numPages && (
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage <= 1}
                        style={{ padding: '5px 10px', cursor: 'pointer' }}
                    >
                        Previous
                    </button>
                    <span style={{ margin: '0 10px' }}>
                        Page {currentPage} of {numPages}
                    </span>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage >= (numPages || 1)}
                        style={{ padding: '5px 10px', cursor: 'pointer' }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default CustomPdfViewer;

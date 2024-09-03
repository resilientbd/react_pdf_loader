import React, { useEffect, useState, useRef } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up the PDF.js worker path
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

interface CustomPdfViewerProps {
    fileUrl: string;
}

const CustomPdfViewer: React.FC<CustomPdfViewerProps> = ({ fileUrl }) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.clientWidth);
            }
        };

        // Initial resize
        handleResize();

        // Add resize observer
        const resizeObserver = new ResizeObserver(handleResize);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        // Clean up
        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, [fileUrl]);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setCurrentPage(1);  // Reset to the first page when a new document is loaded
    };

    const goToNextPage = () => {
        if (currentPage < numPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Scrollable Document Section */}
            <div
                ref={containerRef}
                style={{
                    flex: '0 0 90%',  // Takes 80% of the height
                    width: '100%',
                    overflowY: 'auto',  // Enable vertical scrolling
                    padding: '10px',
                    boxSizing: 'border-box',
                }}
            >
                <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    options={options}
                >
                    <Page
                        key={`page_${currentPage}`}
                        pageNumber={currentPage}
                        width={Math.min(containerWidth, 800)} // Adjust width based on container
                    />
                </Document>
            </div>

            {/* Button Section */}
            <div
                style={{
                    flex: '0 0 5%', // Takes 5% of the height
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    padding: '10px',
                    width: '100%',
                    boxSizing: 'border-box',
                }}
            >
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage <= 1}
                    style={{ marginRight: '10px' }}
                >
                    Previous
                </button>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage >= numPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CustomPdfViewer;

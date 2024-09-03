'use client';

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

const maxWidth = 800;

interface CustomPdfViewerProps {
    fileUrl: string;
}

const CustomPdfViewer: React.FC<CustomPdfViewerProps> = ({ fileUrl }) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [containerWidth, setContainerWidth] = useState<number>(maxWidth);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setContainerWidth(Math.min(containerRef.current.clientWidth, maxWidth));
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
    };

    const goToNextPage = () => {
        if (currentPage < numPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div style={{ position: 'relative', padding: '20px', textAlign: 'center' }}>
            <div ref={containerRef} style={{ margin: '0 auto', width: '100%', maxWidth: `${maxWidth}px` }}>
                <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    options={options}
                >
                    <Page
                        key={`page_${currentPage}`}
                        pageNumber={currentPage}
                        width={containerWidth}
                    />
                </Document>
            </div>
            <div style={{ position: 'absolute', top: 20, right: 20 }}>
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

// src/App.tsx
import React, { useState } from 'react';
import UploadLink from './components/UploadLink';
import PdfList from './components/PdfList';
import CustomPdfViewer from './components/CustomPdfViewer';
import './App.css'; // Ensure the CSS is correctly imported

const App: React.FC = () => {
    const [pdfFiles, setPdfFiles] = useState<string[]>([]);
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
    const [baseUrl, setBaseUrl] = useState<string>('');  // State to store the base URL

    const handleLinkSubmit = async (link: string) => {
        try {
            setBaseUrl(link);  // Set the base URL
            const response = await fetch(link);
            console.log('File link:', link);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const text = await response.text();

            // Extract PDF file names from the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const links = doc.querySelectorAll('a[href$=".pdf"]');
            const files = Array.from(links).map(link => link.getAttribute('href') || '');

            setPdfFiles(files);
            console.log('Selected files:', files);
        } catch (error) {
            console.error('Failed to fetch PDF files:', error);
        }
    };

    const handleFileSelect = (file: string) => {
        setSelectedPdf(file);
        console.log('Filename:', file);
    };

    return (
        <div className="appContainer">
            <div className="pdfListContainer">
                <UploadLink onLinkSubmit={handleLinkSubmit} />
                <PdfList files={pdfFiles} baseUrl={baseUrl} onFileSelect={handleFileSelect} />
            </div>
            <div className="pdfViewerContainer">
                {selectedPdf && <CustomPdfViewer fileUrl={selectedPdf} />}
            </div>
        </div>
    );
};

export default App;

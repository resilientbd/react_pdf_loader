import React from 'react';

interface PdfListProps {
    files: string[];
    baseUrl: string;
    onFileSelect: (file: string) => void;
}

const PdfList: React.FC<PdfListProps> = ({ files, baseUrl, onFileSelect }) => {
    return (
        <div>
            <h2>PDF List</h2>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {files.map((file, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <button
                            onClick={() => onFileSelect(`${baseUrl}/${file}`)}
                            style={{
                                padding: '10px 20px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                backgroundColor: '#f5f5f5',
                                color: '#000', // Set text color to black
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                                width: '100%',
                                textAlign: 'left',
                                fontSize: '16px',
                            }}
                        >
                            {file}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PdfList;

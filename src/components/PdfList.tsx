// src/components/PdfList.tsx
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
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        <button onClick={() => onFileSelect(baseUrl+'/'+file)}>
                            {file}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PdfList;

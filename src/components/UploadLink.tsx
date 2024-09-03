// src/components/UploadLink.tsx
import React, { useState } from 'react';

interface UploadLinkProps {
    onLinkSubmit: (url: string) => void;
}

const UploadLink: React.FC<UploadLinkProps> = ({ onLinkSubmit }) => {
    const [link, setLink] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submit button clicked'); // Debugging log
        if (!link) {
            alert('Please enter a link.');
            return;
        }
        try {
            onLinkSubmit(link);
        } catch (error) {
            console.error('Error submitting link:', error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '15px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                maxWidth: '400px',
                margin: '0 auto', // Center the form horizontally
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
        >
            <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter directory path (ex.:10.200.10.151/pdfs)"
                required
                style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#007BFF'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
            <button
                type="submit"
                style={{
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
            >
                LOAD
            </button>
        </form>

    );
};

export default UploadLink;

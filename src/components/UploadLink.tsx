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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter network server link"
                required
            />
            <button type="submit">LOAD</button>
        </form>
    );
};

export default UploadLink;

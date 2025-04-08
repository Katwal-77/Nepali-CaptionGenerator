import { useState } from 'react';

const MediaUploader = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'audio/mpeg', 'audio/wav', 'audio/ogg'];

    if (validTypes.includes(file.type)) {
      setSelectedFile(file);
      onFileSelect(file);
    } else {
      alert('Please select a valid audio or video file.');
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="container mb-4">
      <div
        style={{
          border: '2px dashed',
          borderColor: isDragging ? '#3b82f6' : '#ccc',
          backgroundColor: isDragging ? '#eff6ff' : 'transparent',
          borderRadius: '0.5rem',
          padding: '2rem',
          textAlign: 'center'
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mb-4">
          <svg
            style={{
              margin: '0 auto',
              height: '3rem',
              width: '3rem',
              color: '#9ca3af'
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <p className="mb-4" style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          <span style={{ fontWeight: 'bold' }}>Click to upload</span> or drag and drop
        </p>
        <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
          Audio (MP3, WAV) or Video (MP4, WebM, OGG)
        </p>

        <input
          type="file"
          style={{ display: 'none' }}
          accept="video/mp4,video/webm,video/ogg,audio/mpeg,audio/wav,audio/ogg"
          onChange={handleFileInput}
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="mt-4 p-4 rounded bg-blue-500 text-white"
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            cursor: 'pointer'
          }}
        >
          Select File
        </label>
      </div>

      {selectedFile && (
        <div className="mt-4 p-4 rounded" style={{ backgroundColor: '#ecfdf5', marginTop: '1rem' }}>
          <p style={{ color: '#065f46' }}>
            <span style={{ fontWeight: 'bold' }}>Selected file:</span> {selectedFile.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;

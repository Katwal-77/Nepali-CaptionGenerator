import { useState, useEffect } from 'react';

const CaptionDisplay = ({ captions, currentTime }) => {
  const [activeCaptionIndex, setActiveCaptionIndex] = useState(-1);

  useEffect(() => {
    if (!captions || captions.length === 0) return;

    // Find the caption that corresponds to the current time
    const index = captions.findIndex(
      (caption) => currentTime >= caption.startTime && currentTime <= caption.endTime
    );

    setActiveCaptionIndex(index);
  }, [captions, currentTime]);

  if (!captions || captions.length === 0) {
    return (
      <div style={{
        width: '100%',
        maxWidth: '36rem',
        margin: '0 auto',
        padding: '1rem',
        backgroundColor: '#f3f4f6',
        borderRadius: '0.5rem'
      }}>
        <p style={{ textAlign: 'center', color: '#6b7280' }}>No captions available</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '36rem', margin: '0 auto' }}>
      <div style={{
        marginBottom: '1rem',
        padding: '1rem',
        backgroundColor: '#eff6ff',
        borderRadius: '0.5rem',
        border: '1px solid #bfdbfe'
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: '#1e40af'
        }}>Current Caption</h3>
        <div style={{
          padding: '0.75rem',
          backgroundColor: 'white',
          borderRadius: '0.25rem',
          border: '1px solid #bfdbfe'
        }}>
          {activeCaptionIndex >= 0 ? (
            <p style={{ fontSize: '1.125rem' }}>{captions[activeCaptionIndex].text}</p>
          ) : (
            <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No active caption</p>
          )}
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        overflow: 'hidden'
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 'bold',
          padding: '1rem',
          backgroundColor: '#f3f4f6',
          borderBottom: '1px solid #e5e7eb'
        }}>All Captions</h3>
        <div style={{ maxHeight: '15rem', overflowY: 'auto' }}>
          {captions.map((caption, index) => (
            <div
              key={index}
              style={{
                padding: '0.75rem',
                borderBottom: '1px solid #e5e7eb',
                backgroundColor: index === activeCaptionIndex ? '#eff6ff' : 'transparent'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.875rem',
                color: '#6b7280',
                marginBottom: '0.25rem'
              }}>
                <span>{formatTime(caption.startTime)}</span>
                <span>→</span>
                <span>{formatTime(caption.endTime)}</span>
              </div>
              <p style={{ fontWeight: index === activeCaptionIndex ? 'bold' : 'normal' }}>{caption.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to format time in MM:SS format
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default CaptionDisplay;

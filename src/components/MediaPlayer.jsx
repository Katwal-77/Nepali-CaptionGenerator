import { useRef, useEffect, useState } from 'react';

const MediaPlayer = ({ file, onTimeUpdate, onMediaLoaded }) => {
  const mediaRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      if (mediaRef.current) {
        mediaRef.current.src = fileURL;
        setIsVideo(file.type.startsWith('video/'));
      }

      // Clean up the URL when component unmounts
      return () => URL.revokeObjectURL(fileURL);
    }
  }, [file]);

  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      const time = mediaRef.current.currentTime;
      setCurrentTime(time);
      onTimeUpdate(time);
    }
  };

  const handleLoadedMetadata = () => {
    if (mediaRef.current) {
      setDuration(mediaRef.current.duration);
      onMediaLoaded(mediaRef.current);
    }
  };

  const togglePlayPause = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (mediaRef.current) {
      mediaRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '36rem',
      margin: '0 auto 2rem auto',
      backgroundColor: '#f3f4f6',
      borderRadius: '0.5rem',
      overflow: 'hidden'
    }}>
      {file && (
        <>
          {isVideo ? (
            <video
              ref={mediaRef}
              style={{ width: '100%' }}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
          ) : (
            <div style={{
              position: 'relative',
              paddingTop: '4rem',
              paddingBottom: '4rem',
              backgroundColor: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <audio
                ref={mediaRef}
                style={{ display: 'none' }}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />
              <div style={{ color: 'white', textAlign: 'center' }}>
                <svg
                  style={{
                    margin: '0 auto',
                    height: '4rem',
                    width: '4rem',
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
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
                <p style={{ marginTop: '0.5rem' }}>{file.name}</p>
              </div>
            </div>
          )}

          <div style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <button
                onClick={togglePlayPause}
                style={{
                  marginRight: '1rem',
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  backgroundColor: '#3b82f6',
                  color: 'white'
                }}
              >
                {isPlaying ? (
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', width: '4rem' }}>{formatTime(currentTime)}</div>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                style={{ flexGrow: 1, margin: '0 0.5rem' }}
                step="0.1"
              />
              <div style={{ fontSize: '0.875rem', color: '#6b7280', width: '4rem' }}>{formatTime(duration)}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MediaPlayer;

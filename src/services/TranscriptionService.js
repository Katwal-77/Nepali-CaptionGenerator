// This service handles the speech recognition and Nepali language detection

class TranscriptionService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.mediaElement = null;
    this.captions = [];
    this.currentSegment = null;
    this.onCaptionUpdate = null;
    
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new window.webkitSpeechRecognition();
      this.setupRecognition();
    } else if ('SpeechRecognition' in window) {
      this.recognition = new window.SpeechRecognition();
      this.setupRecognition();
    }
  }

  setupRecognition() {
    if (!this.recognition) return;

    // Configure recognition
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    
    // Try to set language to Nepali if available
    try {
      this.recognition.lang = 'ne-NP'; // Nepali language code
    } catch (e) {
      console.warn('Nepali language not supported, falling back to default');
    }

    // Handle results
    this.recognition.onresult = (event) => {
      const result = event.results[event.resultIndex];
      const transcript = result[0].transcript;
      
      if (result.isFinal) {
        this.finalizeSegment(transcript);
      } else {
        this.updateCurrentSegment(transcript);
      }
    };

    // Handle errors
    this.recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      
      // If we get a "no-speech" error, just restart
      if (event.error === 'no-speech') {
        this.restartRecognition();
      }
    };

    // Restart when recognition ends
    this.recognition.onend = () => {
      if (this.isListening) {
        this.restartRecognition();
      }
    };
  }

  setMediaElement(mediaElement) {
    this.mediaElement = mediaElement;
  }

  setOnCaptionUpdate(callback) {
    this.onCaptionUpdate = callback;
  }

  startListening() {
    if (!this.recognition) {
      console.error('Speech recognition not supported');
      return false;
    }

    if (!this.isListening) {
      this.isListening = true;
      this.recognition.start();
      return true;
    }
    
    return false;
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.isListening = false;
      this.recognition.stop();
      
      // Finalize current segment if exists
      if (this.currentSegment) {
        this.finalizeSegment(this.currentSegment.text);
      }
      
      return true;
    }
    
    return false;
  }

  restartRecognition() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore errors when stopping
      }
      
      setTimeout(() => {
        try {
          this.recognition.start();
        } catch (e) {
          console.error('Error restarting recognition', e);
        }
      }, 100);
    }
  }

  updateCurrentSegment(text) {
    if (!this.mediaElement) return;
    
    if (!this.currentSegment) {
      this.currentSegment = {
        startTime: this.mediaElement.currentTime,
        text: text,
        endTime: this.mediaElement.currentTime + 2 // Default 2 second duration
      };
    } else {
      this.currentSegment.text = text;
      this.currentSegment.endTime = this.mediaElement.currentTime;
    }
    
    // Notify about the update
    if (this.onCaptionUpdate) {
      const updatedCaptions = [...this.captions];
      if (this.currentSegment) {
        updatedCaptions.push(this.currentSegment);
      }
      this.onCaptionUpdate(updatedCaptions);
    }
  }

  finalizeSegment(text) {
    if (!this.mediaElement || !text || text.trim() === '') return;
    
    const segment = {
      startTime: this.currentSegment ? this.currentSegment.startTime : this.mediaElement.currentTime - 2,
      endTime: this.mediaElement.currentTime,
      text: text.trim()
    };
    
    // Ensure minimum duration
    if (segment.endTime - segment.startTime < 0.5) {
      segment.endTime = segment.startTime + 0.5;
    }
    
    this.captions.push(segment);
    this.currentSegment = null;
    
    // Sort captions by start time
    this.captions.sort((a, b) => a.startTime - b.startTime);
    
    // Notify about the update
    if (this.onCaptionUpdate) {
      this.onCaptionUpdate([...this.captions]);
    }
  }

  getCaptions() {
    return [...this.captions];
  }

  // For demo purposes, generate mock Nepali captions
  generateMockCaptions(duration) {
    const mockNepaliPhrases = [
      "नमस्ते, तपाईंलाई कस्तो छ?",
      "म नेपाली भाषा बोल्छु",
      "यो एक परीक्षण हो",
      "नेपाल एक सुन्दर देश हो",
      "हामी यहाँ नेपाली भाषा सिक्दैछौं",
      "मलाई नेपाली खाना मन पर्छ",
      "काठमाडौं नेपालको राजधानी हो",
      "हिमाल, पहाड र तराई नेपालका तीन भू-भाग हुन्",
      "नेपाली साहित्य धेरै समृद्ध छ",
      "बुद्ध नेपालमा जन्मिएका थिए"
    ];

    const segmentCount = Math.floor(duration / 5); // One segment every 5 seconds
    const mockCaptions = [];

    for (let i = 0; i < segmentCount; i++) {
      const startTime = i * 5;
      const endTime = startTime + 4; // 4 second duration
      const text = mockNepaliPhrases[i % mockNepaliPhrases.length];

      mockCaptions.push({
        startTime,
        endTime,
        text
      });
    }

    this.captions = mockCaptions;
    
    if (this.onCaptionUpdate) {
      this.onCaptionUpdate([...this.captions]);
    }
    
    return mockCaptions;
  }

  // Export captions to SRT format
  exportToSRT() {
    if (this.captions.length === 0) return '';
    
    let srt = '';
    this.captions.forEach((caption, index) => {
      // SRT index (starting from 1)
      srt += (index + 1) + '\n';
      
      // Time range in format: 00:00:00,000 --> 00:00:00,000
      srt += formatSRTTime(caption.startTime) + ' --> ' + formatSRTTime(caption.endTime) + '\n';
      
      // Caption text
      srt += caption.text + '\n\n';
    });
    
    return srt;
  }
}

// Helper function to format time for SRT format (HH:MM:SS,mmm)
function formatSRTTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const milliseconds = Math.floor((timeInSeconds % 1) * 1000);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')},${milliseconds.toString().padStart(3, '0')}`;
}

export default new TranscriptionService();

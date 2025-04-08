# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Nepali Caption Generator | नेपाली क्याप्शन जेनेरेटर

![Nepali Caption Generator](https://img.shields.io/badge/Nepali-Caption%20Generator-orange)

A web application for detecting Nepali language from audio and video files, generating captions with timestamps, and providing perfect synchronization capabilities.

## Features | विशेषताहरू

### English

- **Audio/Video Upload**: Support for various formats (MP4, WebM, OGG, MP3, WAV)
- **Nepali Language Detection**: Automatically detects Nepali speech in uploaded media
- **Caption Generation**: Creates captions with precise timestamps
- **Perfect Synchronization**: Tools to adjust caption timing for perfect alignment
- **Export Functionality**: Download perfectly synchronized captions in SRT format
- **Bilingual Interface**: Available in both English and Nepali

### नेपाली

- **अडियो/भिडियो अपलोड**: विभिन्न फर्म्याटहरू (MP4, WebM, OGG, MP3, WAV) को समर्थन
- **नेपाली भाषा पहिचान**: अपलोड गरिएको मिडियामा नेपाली बोली स्वचालित रूपमा पत्ता लगाउँछ
- **क्याप्शन जेनेरेशन**: सटीक टाइमस्ट्याम्पहरू सहित क्याप्शनहरू सिर्जना गर्दछ
- **पूर्ण सिङ्क्रोनाइजेसन**: पूर्ण संरेखणको लागि क्याप्शन समय समायोजन गर्ने उपकरणहरू
- **निर्यात कार्यक्षमता**: SRT फर्म्याटमा पूर्ण रूपमा सिङ्क्रोनाइज गरिएका क्याप्शनहरू डाउनलोड गर्नुहोस्
- **द्विभाषी इन्टरफेस**: अंग्रेजी र नेपाली दुवै भाषामा उपलब्ध

## How It Works | यो कसरी काम गर्छ

### English

1. **Upload Media**: Upload your audio or video file containing Nepali speech
2. **Automatic Detection**: The application processes the audio to detect Nepali language
3. **Caption Generation**: Captions are generated with timestamps
4. **Synchronization**: Use the timing controls to perfectly align captions with the audio
5. **Export**: Download the synchronized captions as an SRT file for use with any video player

### नेपाली

1. **मिडिया अपलोड गर्नुहोस्**: नेपाली बोली भएको तपाईंको अडियो वा भिडियो फाइल अपलोड गर्नुहोस्
2. **स्वचालित पहिचान**: अनुप्रयोगले नेपाली भाषा पत्ता लगाउन अडियो प्रशोधन गर्दछ
3. **क्याप्शन जेनेरेशन**: टाइमस्ट्याम्पहरू सहित क्याप्शनहरू उत्पन्न गरिन्छ
4. **सिङ्क्रोनाइजेसन**: अडियोसँग क्याप्शनहरू पूर्ण रूपमा मिलाउन समय नियन्त्रणहरू प्रयोग गर्नुहोस्
5. **निर्यात**: कुनै पनि भिडियो प्लेयरसँग प्रयोग गर्नको लागि सिङ्क्रोनाइज गरिएका क्याप्शनहरू SRT फाइलको रूपमा डाउनलोड गर्नुहोस्

## Getting Started | सुरु गर्दै

### Installation | स्थापना

```bash
# Clone the repository
git clone https://github.com/Katwal-77/Nepali-CaptionGenerator.git

# Navigate to the project directory
cd Nepali-CaptionGenerator

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Usage | प्रयोग

1. Open the application in your browser (typically at http://localhost:5173/)
2. Upload an audio or video file containing Nepali speech
3. Play the media to see the automatically generated captions
4. Use the synchronization controls to adjust caption timing if needed
5. Export the captions as an SRT file when satisfied with the synchronization

## Technical Implementation | प्राविधिक कार्यान्वयन

### English

- **Frontend**: React with Vite for fast development
- **Speech Recognition**: Web Speech API configured for Nepali language
- **Media Processing**: HTML5 media elements for audio/video handling
- **Caption Synchronization**: Custom timing adjustment algorithm
- **Export Format**: Industry-standard SRT format compatible with most video players

### नेपाली

- **फ्रन्टएन्ड**: छिटो विकासको लागि Vite सहित React
- **स्पीच रिकग्निशन**: नेपाली भाषाको लागि कन्फिगर गरिएको वेब स्पीच API
- **मिडिया प्रोसेसिङ**: अडियो/भिडियो ह्यान्डलिङको लागि HTML5 मिडिया एलिमेन्टहरू
- **क्याप्शन सिङ्क्रोनाइजेसन**: कस्टम समय समायोजन एल्गोरिदम
- **निर्यात फर्म्याट**: धेरैजसो भिडियो प्लेयरहरूसँग मिल्ने उद्योग-मानक SRT फर्म्याट

## Project Structure | परियोजना संरचना

```
├── public/                # Static assets
├── src/                   # Source code
│   ├── assets/            # Images, styles, etc.
│   ├── components/        # React components
│   │   ├── MediaUploader.jsx    # File upload component
│   │   ├── MediaPlayer.jsx      # Audio/video playback
│   │   └── CaptionDisplay.jsx   # Caption display
│   ├── services/          # Service modules
│   │   └── TranscriptionService.js  # Speech recognition
│   ├── App.jsx            # Main application component
│   ├── App.css            # Application styles
│   ├── index.css          # Global styles
│   └── main.jsx           # Entry point
├── .gitignore             # Git ignore file
├── package.json           # Project metadata and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Future Enhancements | भविष्यका सुधारहरू

### English

- Integration with specialized Nepali speech recognition APIs
- Caption editing capabilities
- Support for additional export formats
- Server-side processing for longer files
- User accounts to save and manage caption projects

### नेपाली

- विशेष नेपाली स्पीच रिकग्निशन API हरूसँग एकीकरण
- क्याप्शन सम्पादन क्षमताहरू
- थप निर्यात फर्म्याटहरूको लागि समर्थन
- लामो फाइलहरूको लागि सर्भर-साइड प्रशोधन
- क्याप्शन परियोजनाहरू बचत गर्न र व्यवस्थापन गर्न प्रयोगकर्ता खाताहरू

## Contributing | योगदान

Contributions are welcome! Please feel free to submit a Pull Request.

## License | लाइसेन्स

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements | आभार

- Thanks to all contributors who have helped with the development of this project
- Special thanks to the Nepali language community for their support and feedback

---

**Developed with ❤️ for the Nepali-speaking community | नेपाली भाषी समुदायको लागि ❤️ का साथ विकसित**

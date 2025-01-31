let recognition;
let patientPrescription = '';

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        patientPrescription = event.results[0][0].transcript;
        document.getElementById('patientPrescription').textContent = "Prescription: " + patientPrescription;
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };
}

// Start Speech Recognition
function startRecognition() {
    recognition.start();
}

// Translate prescription (Mock translation)
async function translatePrescription(prescription) {
    let translatedPrescription = prescription + " (Translated to Hindi)";
    document.getElementById('translation').textContent = "Translated Prescription: " + translatedPrescription;
    return translatedPrescription;
}

// Text-to-Speech (Read out the prescription using Web Speech API)
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';  
    window.speechSynthesis.speak(speech);
}

// Translate and Speak Prescription
async function translateAndSpeak() {
    if (patientPrescription) {
        const translatedText = await translatePrescription(patientPrescription);
        speak(translatedText);
    } else {
        alert('Please speak the prescription first.');
    }
}

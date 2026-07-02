// Función para que el navegador hable el texto recibido
export const speakText = (text: string) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Tu navegador no soporta síntesis de voz.");
  }
};

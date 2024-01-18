// TranslationComponent.js
import React, { useState } from "react";
import axios from "axios";

const TranslationComponent = () => {
  const [textToTranslate, setTextToTranslate] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/translate", {
        text: textToTranslate,
        targetLanguage,
      });
      setTranslatedText(response.data.translation);
    } catch (error) {
      console.error("Translation Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        value={textToTranslate}
        onChange={(e) => setTextToTranslate(e.target.value)}
        placeholder="Enter text to translate"
      />
      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
      >
        <option value="en">English</option>
        {/* Add other language options based on your needs */}
      </select>
      <button onClick={handleTranslate} disabled={loading}>
        Translate
      </button>
      {loading && <p>Loading...</p>}
      {translatedText && <p>Translated Text: {translatedText}</p>}
    </div>
  );
};

export default TranslationComponent;

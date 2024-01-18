// WordPairCreation.jsx
import { useState } from "react";
import axios from "axios";
import { Button, TextField, CircularProgress } from "@mui/material";
import React from "react";

const WordPairCreation = () => {
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [sourceWord, setSourceWord] = useState("");
  const [translatedWord, setTranslatedWord] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/translate", {
        text: sourceWord,
        targetLanguage,
      });
      setTranslatedWord(response.data.translation);
    } catch (error) {
      console.error("Translation Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      // Send the word pair to the server to be saved and published
      await axios.post("http://localhost:3001/wordpairs", {
        source_language: sourceLanguage,
        target_language: targetLanguage,
        source_word: sourceWord,
        translated_word: translatedWord,
        // You may need to pass admin_id and user_id here
      });
      // Clear the form after successful publication
      setSourceLanguage("");
      setTargetLanguage("");
      setSourceWord("");
      setTranslatedWord("");
    } catch (error) {
      console.error("Publish Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TextField
        label="Source Language"
        value={sourceLanguage}
        onChange={(e) => setSourceLanguage(e.target.value)}
      />
      <TextField
        label="Target Language"
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
      />
      <TextField
        label="Source Word"
        value={sourceWord}
        onChange={(e) => setSourceWord(e.target.value)}
      />
      <TextField
        label="Translated Word"
        value={translatedWord}
        onChange={(e) => setTranslatedWord(e.target.value)}
        disabled
      />
      <Button onClick={handleTranslate} disabled={loading}>
        {loading ? <CircularProgress size={20} /> : "Translate"}
      </Button>
      <Button onClick={handlePublish} disabled={loading}>
        {loading ? <CircularProgress size={20} /> : "Publish Word Pair"}
      </Button>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default WordPairCreation;

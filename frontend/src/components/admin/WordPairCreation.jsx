// WordPairCreation.jsx
import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, CircularProgress } from "@mui/material";

const WordPairCreation = () => {
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [sourceWord, setSourceWord] = useState("");
  const [translatedWord, setTranslatedWord] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/wordpairs`,
        {
          source_language: sourceLanguage,
          target_language: targetLanguage,
          source_word: sourceWord,
          translated_word: translatedWord,
          // Add admin_id and user_id here if needed
        }
      );

      if (response.data.success) {
        console.log("Word pair published successfully:", response.data);
        // Clear the form after successful publication
        setSourceLanguage("");
        setTargetLanguage("");
        setSourceWord("");
        setTranslatedWord("");
      } else {
        console.error("Publish failed:", response.data.message);
        // Handle the error, display a message, or update state accordingly
      }
    } catch (error) {
      console.error("Publish Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
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
      />
      <Button onClick={handlePublish} disabled={loading}>
        {loading ? <CircularProgress size={20} /> : "Publish Word Pair"}
      </Button>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default WordPairCreation;

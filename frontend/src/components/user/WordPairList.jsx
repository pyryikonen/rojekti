import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const WordPairsList = () => {
  const [wordPair, setWordPair] = useState({});
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");

  const fetchRandomWordPair = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/random`
      );
      console.log("Response:", response);

      const randomWordPair = response.data.data; // Adjust to the correct property
      setWordPair(randomWordPair);
    } catch (error) {
      console.error("Error fetching random word pair:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchRandomWordPair();
  }, [fetchRandomWordPair]);

  useEffect(() => {
    console.log("Word Pair:", wordPair);
  }, [wordPair]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleCheckAnswer = () => {
    if (userInput.toLowerCase() === wordPair.source_word.toLowerCase()) {
      fetchRandomWordPair();
      setUserInput("");
      setError("");
    } else {
      setError("Incorrect! Please try again.");
    }
  };

  return (
    <div>
      <h2>{"English"} Word Pair</h2>

      <p>{wordPair.translated_word}</p>

      <input
        type="text"
        placeholder={`Enter the Finnish word`}
        value={userInput}
        onChange={handleInputChange}
      />
      <button onClick={handleCheckAnswer}>Check Answer</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default WordPairsList;

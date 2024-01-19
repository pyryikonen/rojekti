// wordPairRoutes.js
const express = require("express");
const {
  addWordPair,
  getAllWordPairs,
  updateWordPair,
} = require("../utils/wordPairUtils");
const { getRandomWordPair } = require("./../database/databaseFunctions");

const router = express.Router();

router.post("/wordpairs", async (req, res) => {
  const {
    source_language,
    target_language,
    source_word,
    translated_word,
    admin_id,
    user_id,
  } = req.body;

  try {
    const result = await addWordPair(
      source_language,
      target_language,
      source_word,
      translated_word,
      admin_id,
      user_id
    );

    res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.put("/wordpairs/:id", async (req, res) => {
  const {
    source_language,
    target_language,
    source_word,
    translated_word,
    admin_id,
    user_id,
  } = req.body;
  const { id } = req.params;

  try {
    const result = await updateWordPair(
      id,
      source_language,
      target_language,
      source_word,
      translated_word,
      admin_id,
      user_id
    );

    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/wordpairs", async (req, res) => {
  const result = await getAllWordPairs();
  res.status(result.success ? 200 : 500).json(result);
});

router.get("/random", async (req, res) => {
  try {
    // Fetch a random English to Finnish word pair
    const randomWordPair = await getRandomWordPair("English", "Finnish");

    // Send the response with the random word pair
    res.status(200).json({
      success: true,
      data: {
        id: randomWordPair.id,
        source_language: randomWordPair.source_language,
        target_language: randomWordPair.target_language,
        translated_word: randomWordPair.translated_word,
        source_word: randomWordPair.source_word,
      },
    });
  } catch (error) {
    console.error("Error fetching random word pair:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;

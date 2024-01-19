// wordPairUtils.js
const { executeQuery } = require("../database/databaseFunctions");

const addWordPair = async (
  sourceLanguage,
  targetLanguage,
  sourceWord,
  translatedWord
) => {
  try {
    const result = await executeQuery(
      "INSERT INTO word_pairs (source_language, target_language, source_word, translated_word) VALUES (?, ?, ?, ?)",
      [sourceLanguage, targetLanguage, sourceWord, translatedWord]
    );

    return {
      success: true,
      id: result.insertId,
      message: "Word pair added successfully",
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal Server Error" };
  }
};

const getAllWordPairs = async () => {
  try {
    const results = await executeQuery("SELECT * FROM word_pairs");
    return { success: true, data: results };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal Server Error" };
  }
};

const updateWordPair = async (
  id,
  sourceLanguage,
  targetLanguage,
  sourceWord,
  translatedWord
) => {
  try {
    await executeQuery(
      "UPDATE word_pairs SET source_language=?, target_language=?, source_word=?, translated_word=? WHERE id=?",
      [sourceLanguage, targetLanguage, sourceWord, translatedWord, id]
    );

    return { success: true, message: "Word pair updated successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal Server Error" };
  }
};

module.exports = { addWordPair, getAllWordPairs, updateWordPair };

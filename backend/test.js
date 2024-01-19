const axios = require("axios");

const translateText = async () => {
  try {
    const response = await axios.post(
      "https://api-free.deepl.com/v2/translate",
      {
        text: "Hello, world!",
        target_lang: "DE",
      },
      {
        headers: {
          Authorization:
            "DeepL-Auth-Key f146e906-1cd7-dca3-bb16-0d819bba515e:fx",
        },
      }
    );

    console.log(response.data.translations[0].text);
  } catch (error) {
    console.error("Translation Error:", error.message);
  }
};

translateText();

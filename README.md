# Learn English! App

Learn English! is a language learning application designed for kids to practice foreign language grammar, specifically focusing on English to Finnish translations and vice versa. The application provides an interactive interface for users to learn and test their vocabulary in a fun and engaging way.

Features
Word Pairs: The app allows users to practice word pairs in English and Finnish. Users are prompted with English words and are required to provide the correct Finnish translation or vice versa.

Admin View: A dedicated admin view allows parents or teachers to create, delete, and update word pairs. Word pairs are stored in a MySQL database, making it easy to manage the content.

Score Tracking: Users receive scores based on their answers, encouraging a sense of achievement and progress.

Tag Support: The app supports tags, enabling users to focus on specific categories such as colors, vehicles, animals, etc.

Multilingual Support: Users can practice translations in different languages by extending the word pairs table to include a "language" column.

User Authentication: Secure user authentication is implemented, ensuring that only authorized users can access and modify word pairs.

Deepl API Integration: The app integrates with the DeepL API for translating new sets of cards from admin to user, providing accurate and efficient translations.

Responsive UI: The user interface is designed using Material-UI or Bootstrap, offering a visually appealing and user-friendly experience.

Getting Started
Prerequisites
Node.js
MySQL
DeepL API Key
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/learn-english-app.git
cd learn-english-app
Install dependencies for both frontend and backend:

bash
Copy code

# Frontend

cd frontend
npm install

# Backend

cd backend
npm install
Set up the MySQL database:

Create a database named learn_english.
Run the provided SQL script to create the word_pairs table.
Configure the backend:

Edit backend/server.js to include your MySQL database connection details and DeepL API key.
Start the application:

bash
Copy code

# Frontend (from the frontend directory)

npm start

# Backend (from the backend directory)

npm start
Open your browser and go to http://localhost:3000 to access the application.

Contributing
Contributions are welcome! If you have suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

# Learn English! App

**Learn English!** is a language learning application designed for kids to practice foreign language grammar, focusing on English to Finnish translations and vice versa. The application provides an interactive interface for users to learn and test their vocabulary in a fun and engaging way.

### Screencast link

https://youtu.be/8rmMHCW1G7M

## Features

### Word Pairs Practice

Users can actively practice word pairs in both English and Finnish. The application presents users with English words, requiring them to provide the corresponding Finnish translation, and vice versa.

### Admin Panel

A dedicated admin view empowers parents or educators to create, delete, and update word pairs effortlessly. The word pairs are stored in a MySQL database, offering a convenient way to manage content.

### User Authentication

Secure user authentication is implemented, ensuring that only authorized users can access and modify word pairs.

### Responsive UI

The user interface is designed using Material-UI or Bootstrap, offering a visually appealing and user-friendly experience.

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

#### Clone the repository:

git clone https://github.com/your-username/learn-english-app.git
cd learn-english-app
Install dependencies for both frontend and backend:

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
Edit backend/server.js to include your MySQL database connection details

Start the application:

# Frontend (from the root directory)

npm run start-frontend

# Backend (from the root directory)

npm run start-backend
Open your browser and go to http://localhost:3001 to access the application.

Deployment
The application is structured to facilitate deployment with Docker. The GNU 3.0 license applies to this project. Users can deploy the app with their own database, or if they prefer, they can utilize our database.

Contributing
Contributions are welcome! If you have suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

License
This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.

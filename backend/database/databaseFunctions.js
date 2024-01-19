//databaseFunctions.js
const pool = require("../dbConfig");
const yup = require("yup");
const mysql = require("mysql");

const wordPairSchema = yup.object().shape({
  sourceWord: yup.string().required(),
  targetWord: yup.string().required(),
});

const idSchema = yup.object().shape({
  id: yup.number().integer().positive().required(),
});

const validateWordPair = (wordPair) => {
  return wordPairSchema.validate(wordPair);
};

const validateId = (id) => {
  return idSchema.validate({ id });
};

const executeQuery = async (query, values = []) => {
  try {
    console.log("Executing query:", query, "with values:", values);

    const queryParams = Array.isArray(values) ? values : [values];

    const [results] = await pool.execute(query, queryParams);
    console.log("Query results:", results);
    return results;
  } catch (error) {
    console.error(`Error in executeQuery: ${error.message}`);
    throw error;
  }
};

const findAllWordPairs = async () => {
  try {
    const query = "SELECT * FROM wordPairs";
    const wordPairs = await executeQuery(query);
    return wordPairs;
  } catch (error) {
    console.error(`Error in findAllWordPairs: ${error.message}`);
    throw error;
  }
};

const findWordPairById = async (id) => {
  try {
    await validateId(id);
    const query = "SELECT * FROM wordPairs WHERE id = ?";
    const results = await executeQuery(query, [id]);

    if (results.length === 0) {
      throw new Error("Word pair with specified ID not found");
    }

    return results[0];
  } catch (error) {
    console.error(`Error in findWordPairById: ${error.message}`);
    throw error;
  }
};

const deleteWordPairById = async (id) => {
  try {
    await validateId(id);
    const query = "DELETE FROM wordPairs WHERE id = ?";
    const results = await executeQuery(query, [id]);

    if (results.affectedRows === 0) {
      throw new Error("Word pair with specified ID not found");
    }

    return { success: true };
  } catch (error) {
    console.error(`Error in deleteWordPairById: ${error.message}`);
    throw error;
  }
};

const saveWordPair = async (wordPair) => {
  try {
    const { error } = validateWordPair(wordPair);

    if (error) {
      throw new Error(error.message);
    }

    const query =
      "INSERT INTO wordPairs (sourceWord, targetWord) VALUES (?, ?)";
    const results = await executeQuery(query, [
      wordPair.sourceWord,
      wordPair.targetWord,
    ]);

    const newWordPair = {
      id: results.insertId,
      sourceWord: wordPair.sourceWord,
      targetWord: wordPair.targetWord,
    };

    return newWordPair;
  } catch (error) {
    console.error(`Error in saveWordPair: ${error.message}`);
    throw error;
  }
};

const clearWordPairs = async () => {
  try {
    const query = "DELETE FROM wordPairs";
    const results = await executeQuery(query);

    if (results.affectedRows === 0) {
      throw new Error("No word pairs found to delete");
    }

    return { success: true };
  } catch (error) {
    console.error(`Error in clearWordPairs: ${error.message}`);
    throw error;
  }
};

const fetchUsers = async () => {
  try {
    const query = "SELECT * FROM users";
    const users = await executeQuery(query);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};

const fetchAdmins = async () => {
  try {
    const query = "SELECT * FROM admins";
    const admins = await executeQuery(query);
    return admins;
  } catch (error) {
    console.error("Error fetching admins:", error.message);
    throw error;
  }
};

const fetchUserRoleByUsername = async (username) => {
  try {
    const userQuery = "SELECT role FROM users WHERE username = ?";
    const adminQuery = "SELECT role FROM admins WHERE username = ?";
    const values = [username];

    const [userResult] = await executeQuery(userQuery, values);
    const [adminResult] = await executeQuery(adminQuery, values);

    return userResult ? userResult.role : adminResult ? adminResult.role : null;
  } catch (error) {
    console.error("Error fetching user role:", error.message);
    throw error;
  }
};

const fetchUserByEmail = async (email) => {
  try {
    const userQuery = "SELECT * FROM users WHERE email = ?";
    const adminQuery = "SELECT * FROM admins WHERE email = ?";
    const values = [email];

    console.log("Fetching user with email:", email);

    const [user] = await executeQuery(userQuery, values);
    const [admin] = await executeQuery(adminQuery, values);

    if (user) {
      return user;
    } else if (admin) {
      return admin;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user or admin:", error.message);
    throw error;
  }
};

const fetchUserById = async (id, role) => {
  const tableName = role === "admin" ? "admins" : "users";
  const columnName = role === "admin" ? "admin_id" : "user_id";

  const query = `SELECT * FROM ${tableName} WHERE ${columnName} = ?`;

  try {
    const [user] = await executeQuery(query, [id]);
    return user;
  } catch (error) {
    console.error(`Error in fetchUserById: ${error.message}`);
    throw error;
  }
};

const fetchUserByUsername = async (username) => {
  try {
    console.log("Fetching user with identifier:", username);

    const [user] = await executeQuery(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (user) {
      return user;
    }

    console.log("Fetching admin with identifier:", username);

    // Check in the admins table
    const [admin] = await executeQuery(
      "SELECT * FROM admins WHERE username = ?",
      [username]
    );

    if (admin) {
      return admin;
    }

    // If neither user nor admin is found, return null
    console.log("User and Admin not found by username");
    return null;
  } catch (error) {
    console.error("Error fetching user or admin by username:", error.message);
    throw error;
  }
};

const getRandomWordPair = async () => {
  try {
    const query = "SELECT * FROM word_pairs ORDER BY RAND() LIMIT 1";
    const [randomWordPair] = await executeQuery(query);

    return randomWordPair;
  } catch (error) {
    console.error("Error fetching random word pair:", error.message);
    throw error;
  }
};

module.exports = {
  validateWordPair,
  validateId,
  findAllWordPairs,
  findWordPairById,
  deleteWordPairById,
  saveWordPair,
  clearWordPairs,
  fetchUsers,
  executeQuery,
  fetchAdmins,
  fetchUserRoleByUsername,
  fetchUserByEmail,
  fetchUserById,
  fetchUserByUsername,
  getRandomWordPair,
};

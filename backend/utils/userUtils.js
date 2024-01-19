const { executeQuery } = require("../database/databaseFunctions");

const registerUser = async (username, email, password, role) => {
  try {
    const [existingUser] = await executeQuery(
      `SELECT * FROM ${role}s WHERE email = ?`,
      [email]
    );

    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const query = `INSERT INTO ${role}s (username, email, password) VALUES (?, ?, ?)`;
    const values = [username, email, password]; // Store plain text password

    await executeQuery(query, values);

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal Server Error" };
  }
};

const loginUser = async (email, password) => {
  try {
    const [user] = await executeQuery("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (user && user.password === password) {
      return { success: true, user, role: "user" };
    } else {
      // Check if the user is an admin
      const [admin] = await executeQuery(
        "SELECT * FROM admins WHERE email = ?",
        [email]
      );

      if (admin && admin.password === password) {
        return { success: true, user: admin, role: "admin" };
      }
    }

    return { success: false, message: "Invalid credentials" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal Server Error" };
  }
};

module.exports = { registerUser, loginUser };

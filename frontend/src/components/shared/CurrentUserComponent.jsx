import React, { useEffect, useState } from "react";
import axios from "axios";

const CurrentUserComponent = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users`,
          {}
        );

        if (response.data.success) {
          setCurrentUser(response.data.user);
          console.log(response);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div>
      {currentUser ? (
        <p>Welcome, {currentUser.username}!</p>
      ) : (
        <p>Please log in to view this content.</p>
      )}
    </div>
  );
};

export default CurrentUserComponent;

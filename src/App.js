import React, { useState, useEffect } from 'react';
import './App.css';

const MyComponent = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=100');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setUsers(jsonData.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <div className="user-list">
          <h1>3rd party data</h1>
          <ul>
            {users.map(user => (
              <li key={user.login.uuid}>
                <img src={user.picture.thumbnail} alt="user" />
                <div>
                  <strong>{user.name.first} {user.name.last}</strong>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyComponent;

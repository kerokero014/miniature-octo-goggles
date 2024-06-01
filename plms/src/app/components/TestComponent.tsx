'use client';
import React, { useEffect, useState } from 'react';

function FetchData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/topic') //EndPoint Test
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setLoading(false);
      });
  }, []);

  if (loading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div>
      <h1>Data from server:</h1>
      <p>{data}</p> {/* This will display the data being sent from server throught response */}
    </div>
  );
}

export default FetchData;

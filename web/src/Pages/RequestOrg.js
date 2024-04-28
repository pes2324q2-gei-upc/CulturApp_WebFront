import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function RequestOrg( {token} ) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:8080/tickets//solicitudsOrganitzador/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching organizer requests');
        }
        const data = await response.json();
        setRequests(data);

      } catch (error) {
        console.error('Error fetching organizer requests:', error);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="content">
      <h1>Request Event Organizer</h1>
      <ul>
        {requests.map((requests) => (
          <li key={requests.id}>
            <Link to={`${requests.id}`}>
              <h3>{requests.titol}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RequestOrg;

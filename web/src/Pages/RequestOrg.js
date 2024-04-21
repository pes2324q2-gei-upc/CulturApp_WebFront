import React, { useState, useEffect } from 'react';

function RequestOrg() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:8080/tickets/read/solicitudsOrganitzador/otorgades');
        if (!response.ok) {
          throw new Error('Error fetching organizer requests');
        }
        const data = await response.json();

        // Fetch user name and activity info for each request
        const requestsWithUserInfo = await Promise.all(data.map(async (request) => {
          const userResponse = await fetch(`http://localhost:8080/users/${request.userSolicitant}/username`);
          if (!userResponse.ok) {
            throw new Error('Error fetching user name');
          }
          const userName = await userResponse.json();

          const activityResponse = await fetch(`http://localhost:8080/activitats/read/${request.idActivitat}`);
          if (!activityResponse.ok) {
            throw new Error('Error fetching activity info');
          }
          const activityInfo = await activityResponse.json();

          return { ...request, userName, activityInfo };
        }));

        setRequests(requestsWithUserInfo);
      } catch (error) {
        console.error('Error fetching organizer requests:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="content">
      <h1>RequestOrg</h1>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            <h3>User: {request.userName}</h3>
            <p>Activity: {request.activityInfo.denominaci}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RequestOrg;

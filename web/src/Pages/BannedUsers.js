import React, { useState, useEffect } from 'react';

function ReportUser({ token }) {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('https://culturapp-back.onrender.com/users/banned/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching banned users: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        setReports(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching banned users', error);
      }
    };

    fetchReports();
  }, [token]);

  const filteredReports = reports.filter(report =>
    report.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content">
      <h1 className="titlesmenusection">Banned users</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <i className="fas fa-search search-icon"></i>
      </div>
      {filteredReports.length > 0 ? (
        <ul>
          {filteredReports.map((report) => (
            <li key={report.id}>
              <p><strong>Username:</strong> {report.username}</p>
              <p><strong>Email:</strong> {report.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <h3 className="notfound">No banned users found</h3>
      )}
    </div>
  );
}

export default ReportUser;

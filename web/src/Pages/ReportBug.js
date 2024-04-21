import React, { useState, useEffect } from 'react';

function ReportBug() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:8080/tickets/read/reportsBug/all');
        if (!response.ok) {
          throw new Error('Error fetching reports');
        }
        const data = await response.json();
        setReports(data);

        const updatedReports = await Promise.all(
          data.map(async (report) => {
            try {
              const usernameResponse = await fetch(`http://localhost:8080/users/${report.user}/username`);
              if (!usernameResponse.ok) {
                throw new Error('Error fetching username');
              }
              const usernameData = await usernameResponse.json();
              return { ...report, username: usernameData };
            } catch (error) {
              console.error('Error fetching username:', error);
              return { ...report, username: 'Usuario desconocido' };
            }
          })
        );

        setReports(updatedReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="content">
      <h1>ReportBug</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <h3>{report.errorApp}</h3>
            <p>Usuario: {report.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportBug;

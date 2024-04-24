import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../RequestOrg.css"


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

  const Notification = ({ reports }) => (
    <div className="notification">
      <div className="notiglow"></div>
      <div className="notiborderglow"></div>
      <div className="notititle">{reports.errorApp}</div>
      <div className="notibody">Usuario: {reports.username}</div>
    </div>
  );



  return (
    <div className="content">
    <h1>RequestOrg</h1>
    <ul>
      {reports.map((reports) => (
        <li key={reports.id}>
          <Link to={`${reports.id}`}>
            <Notification reports={reports} />
          </Link>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default ReportBug;

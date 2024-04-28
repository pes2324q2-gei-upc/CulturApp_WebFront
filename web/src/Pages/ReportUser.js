import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function ReportUser({token}) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:8080/tickets/reportsUsuaris/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Aquí es donde se incluye el token
            },
        }

        );
        if (!response.ok) {
          throw new Error('Error fetching user reports');
        }
        const data = await response.json();
        setReports(data);

      } catch (error) {
        console.error('Error fetching user reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="content">
      <h1>User Report</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <Link to={`${report.id}`}>
              <h3> {report.titol} </h3>
              <p> {report.report} </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportUser;

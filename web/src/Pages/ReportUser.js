import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function ReportUser() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = "b3bb874372df8a262c33a78b4de4841453b3ea52825a05f56f4dbb2f7863d989"
        const response = await fetch('http://localhost:8080/tickets/read/reportsUsuari/all', {
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

        // Map through each report and fetch additional user information
        const enhancedReports = await Promise.all(data.map(async (report) => {
          const userReportedResponse = await fetch(`http://localhost:8080/users/${report.usuariReportat}/username`);
          const userReportedData = await userReportedResponse.json();
          const userReportResponse = await fetch(`http://localhost:8080/users/${report.user}/username`);
          const userReportData = await userReportResponse.json();

          return {
            ...report,
            userReportedUsername: userReportedData,
            userReportUsername: userReportData,
          };
        }));

        setReports(enhancedReports);
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
              <h3> {report.motiuReport} </h3>
              <p>User Reported: {report.userReportedUsername}</p>
              <p>{report.description}</p>
              <p>Reported By: {report.userReportUsername}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportUser;

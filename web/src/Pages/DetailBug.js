import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

async function fetchBugReportById(id, token) {
  try {
    const response = await fetch(`http://localhost:8080/tickets/reportsBug/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching bug report');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bug report:', error);
    return null;
  }
}

const DetailBug = ( {token} ) => {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const reportData = await fetchBugReportById(id, token);
      setReport(reportData);
    };

    fetchData();
  }, [id]);

  return (
    <div className="content">
      <h1>Detail Bug for ID: {id}</h1>
      {report && (
        <div>
          <p>Title: {report.data_report}</p>
          <p>Description: {report.errorApp}</p>
          {/* Render other details as needed */}
        </div>
      )}
    </div>
  );
};

export default DetailBug;

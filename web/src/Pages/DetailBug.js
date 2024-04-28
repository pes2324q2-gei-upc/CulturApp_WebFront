import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

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

const DetailBug = ({ token }) => {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const reportData = await fetchBugReportById(id, token);
      setReport(reportData);
    };

    fetchData();
  }, [id, token]);

  const handleToDo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/tickets/reportsBug/${id}/nosolucionar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error setting report to To Do');
      }

      // Actualizar el estado del reporte para reflejar el cambio
      setReport(prevReport => ({ ...prevReport, solucionat: false }));
    } catch (error) {
      console.error('Error setting report to To Do:', error);
    }
  };

  const handleDone = async () => {
    try {
      const response = await fetch(`http://localhost:8080/tickets/reportsBug/${id}/solucionar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error setting report to Done');
      }

      // Actualizar el estado del reporte para reflejar el cambio
      setReport(prevReport => ({ ...prevReport, solucionat: true }));
    } catch (error) {
      console.error('Error setting report to Done:', error);
    }
  };

  return (
    <div className="content">
      <h1>Detail Bug for ID: {id}</h1>
      {report && (
        <div>
          <p>Fecha: {report.data_report}</p>
          <p>Description: {report.report}</p>
          {/* Botón para cambiar el estado */}
          {report.solucionat ? (
            <button onClick={handleToDo}>Done</button>
          ) : (
            <button onClick={handleDone}>To Do</button>
          )}
        </div>
      )}
      <Link to="/report-bug">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default DetailBug;

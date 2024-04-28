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

    const reportData = await response.json();

    // Obtener el nombre de usuario
    const usernameResponse = await fetch(`http://localhost:8080/users/${reportData.user}/username`);
    if (!usernameResponse.ok) {
      throw new Error('Error fetching username');
    }
    const usernameData = await usernameResponse.json();
    reportData.username = usernameData;

    return reportData;
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

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric' });
    const time = date.toLocaleTimeString('es-ES');
    return { day, time };
  };

  return (
    <div className="content">
      <h1>Detail Bug for ID</h1>
      <h2>{id}</h2>
      {report && (
        <div>
          <h3>About the bug</h3>
          <p>Title: {report.titol}</p>
          <p>Description: {report.report}</p>
          <p>Fecha: {formatDate(report.data_report).day}</p>
          <p>Hora: {formatDate(report.data_report).time}</p>
          <h3>About the user</h3>
          <p>User: {report.username}</p>
          <p>Mail: </p>
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

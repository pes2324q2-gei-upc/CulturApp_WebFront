import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

async function fetchUserReportById(id, token) {
  try {
    const response = await fetch(`https://culturapp-back.onrender.com/tickets/reportsUsuari/${id}`, {
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
    const usernameResponse = await fetch(`https://culturapp-back.onrender.com/users/${reportData.user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!usernameResponse.ok) {
      throw new Error('Error fetching username');
    }
    const usernameData = await usernameResponse.json();
    reportData.username = usernameData.username;
    reportData.mail = usernameData.email;

    // Obtener el nombre de usuario
    const usernamereportedResponse = await fetch(`https://culturapp-back.onrender.com/users/${reportData.usuariReportat}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!usernamereportedResponse.ok) {
      throw new Error('Error fetching username');
    }
    const usernamereportedData = await usernamereportedResponse.json();
    reportData.usernamereported = usernamereportedData.username;
    reportData.mailreported = usernamereportedData.email;

    return reportData;
  } catch (error) {
    console.error('Error fetching bug report:', error);
    return null;
  }
}

const DetailUser = ({token}) => {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const reportData = await fetchUserReportById(id, token);
      setReport(reportData);
    };

    fetchData();
  }, [id, token]);

  const handleToDo = async () => {
    try {
      const response = await fetch(`https://culturapp-back.onrender.com/tickets/reportsUsuari/${id}/nosolucionar`, {
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
      const response = await fetch(`https://culturapp-back.onrender.com/tickets/reportsUsuari/${id}/solucionar`, {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric', year: 'numeric' });
    const time = date.toLocaleTimeString('es-ES');
    return { day, time };
  };

  return (
    <div className="content">
      <h1 className="detailBugtitle">Detail User report</h1>
      <h2 className="detailBugid">ID: {id}</h2>
      {report && (
        <div>
          <h3 className="detailBugsection">About the report</h3>
          <hr className="line" />
          <div className="detailBugcontent">
            <p className="atribute">Title</p>
            <p className="value">{report.titol}</p>
            <p className="atribute">Description</p>
            <p className="value">{report.report}</p>
            <p className="atribute">Date</p>
            <p className="value">{formatDate(report.data_report).day}</p>
            <p className="atribute">Time</p>
            <p className="value">{formatDate(report.data_report).time}</p>
            <p className="atribute">User reported</p>
            <p className="value">{report.usernamereported}</p>
            <p className="atribute">Mail</p>
            <p className="value">{report.mailreported}</p>
          </div>
          <h3 className="detailBugsection">About the user</h3>
          <hr className="line" />
          <div className="detailBugcontent">
            <p className="atribute">User</p>
            <p className="value">{report.username}</p>
            <p className="atribute">Mail</p>
            <p className="value">{report.mail}</p>
          </div>
          <div className="detailbutton">
            {report.solucionat ? (
              <button onClick={handleToDo}>Done</button>
            ) : (
              <button onClick={handleDone}>To Do</button>
            )}
          </div>
        </div>
      )}
      <Link to="/report-user">
        <button className="backbutton">Back</button>
      </Link>
    </div>
  );
};

export default DetailUser;
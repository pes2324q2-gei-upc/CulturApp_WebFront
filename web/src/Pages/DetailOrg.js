import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

async function fetchRequestById(id, token) {
  try {
    const response = await fetch(`http://localhost:8080/tickets/solicitudsOrganitzador/${id}`, {
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
    const usernameResponse = await fetch(`http://localhost:8080/users/${reportData.userSolicitant}`);
    if (!usernameResponse.ok) {
      throw new Error('Error fetching username');
    }
    const usernameData = await usernameResponse.json();
    reportData.username = usernameData.username;
    reportData.mail = usernameData.email;

    return reportData;
  } catch (error) {
    console.error('Error fetching bug report:', error);
    return null;
  }
}

const DetailOrg = ({token}) => {
  let { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const reportData = await fetchRequestById(id, token);
      setReport(reportData);
    };

    fetchData();
  }, [id, token]);

  const handleDecline = async () => {
    try {
      const response = await fetch(`http://localhost:8080/tickets/solicitudOrganitzador/${id}/rebutjar`, {
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

  const handleAccept = async () => {
    try {
      const response = await fetch(`http://localhost:8080/tickets/solicitudOrganitzador/${id}/acceptar`, {
        method: 'POST',
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
      <h1 className="detailBugtitle">Request Organitzador</h1>
      <h2 className="detailBugid">ID: {id}</h2>
      {report && (
        <div>
          <h3 className="detailBugsection">About the request</h3>
          <hr className="line" />
          <div className="detailBugcontent">
            <p className="atribute">Title</p>
            <p className="value">{report.titol}</p>
            <p className="atribute">Description</p>
            <p className="value">{report.motiu}</p>
            <p className="atribute">Date</p>
            <p className="value">{formatDate(report.data_sol).day}</p>
            <p className="atribute">Time</p>
            <p className="value">{formatDate(report.data_sol).time}</p>
            <p className="atribute">State</p>
            <p className="value">
                {! report.pendent ? (
                    report.atorgat ? 'Accepted' : 'Declined'
                ) : null}
            </p>
          </div>
          <h3 className="detailBugsection">About the user</h3>
          <hr className="line" />
          <div className="detailBugcontent">
            <p className="atribute">User</p>
            <p className="value">{report.username}</p>
            <p className="atribute">Mail</p>
            <p className="value">{report.mail}</p>
          </div>
          {report.pendent && (
            <div className="actionbutton">
                <button onClick={handleAccept}>Accept</button>
                <button onClick={handleDecline}>Decline</button>
            </div>
          )}
        </div>
      )}
      <Link to="/request-org">
        <button className="backbutton">Back</button>
      </Link>
    </div>
  );
};

export default DetailOrg;
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

async function fetchBugReportById(id, token) {
  try {
    const response = await fetch(`https://culturapp-back.onrender.com/tickets/reportsBug/${id}`, {
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

    return reportData;
  } catch (error) {
    console.error('Error fetching bug report:', error);
    return null;
  }
}

const DetailBug = ({ token }) => {
  const { id } = useParams();
  const [report, setReport] = useState(null)
  const [open, setOpen] = useState(false)
  const [repo, setRepo] = useState("CulturApp_Front")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchData = async () => {
      const reportData = await fetchBugReportById(id, token);
      setReport(reportData);
    };

    fetchData();
  }, [id, token]);

  const handleToDo = async () => {
    try {
      const response = await fetch(`https://culturapp-back.onrender.com/tickets/reportsBug/${id}/nosolucionar`, {
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
      const response = await fetch(`https://culturapp-back.onrender.com/tickets/reportsBug/${id}/solucionar`, {
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

  const handlerepo1 = () => {
    setRepo("CulturApp_Front");
    setOpen(false);
  };

  const handlerepo2 = () => {
    setRepo("CulturApp_Back");
    setOpen(false);
  };

  const sendissue = async (report) => {
    try {
      const response = await fetch(`https://api.github.com/repos/pes2324q2-gei-upc/${repo}/issues`, {
          method: 'POST',
          headers: {
              'Authorization': `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              title: report.titol,
              body: report.report
          })
      });
  
      if (response.ok) {
        setSuccessMessage('The issue was successfully created');
        setErrorMessage('');
      } else {
        setErrorMessage(`Error when creating the issue: ${response.status}`);
        const responseData = await response.json();
        console.error(responseData);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error on the application:', error);
      setErrorMessage(`Error on the applicaiton: ${error.message}`);
      setSuccessMessage('');
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
      <h1 className="detailBugtitle">Detail Bug</h1>
      <h2 className="detailBugid">ID: {id}</h2>
      {report && (
        <div>
          <h3 className="detailBugsection">About the bug</h3>
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
          </div>
          <h3 className="detailBugsection">About the user</h3>
          <hr className="line" />
          <div className="detailBugcontent">
            <p className="atribute">User</p>
            <p className="value">{report.username}</p>
            <p className="atribute">Mail</p>
            <p className="value">{report.mail}</p>
          </div>
          <div className="githubissues">
            <h3 className="detailBugsection">GitHub issues</h3>
            <div className="github-buttons">
              <div className="dropdown">
                <button onClick={handleOpen} className="dropdown-button">Repository</button>
                {open ? (
                  <ul className="dropdown-menu">
                    <li className="menu-item">
                      <button onClick={handlerepo1}>CulturApp_Front</button>
                    </li>
                    <li className="menu-item">
                      <button onClick={handlerepo2}>CulturApp_Back</button>
                    </li>
                  </ul>
                ) : null}
              </div>
              <button onClick={() => sendissue(report)} className="send-button">Send issue</button>
            </div>
            {repo && <p>Selected repository: <strong>{repo}</strong></p>}
            {successMessage && <p className="okmessage">{successMessage}</p>}
            {errorMessage && <p className="failmessage">{errorMessage}</p>}
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
      <Link to="/report-bug">
        <button className="backbutton">Back</button>
      </Link>
    </div>
  );
};

export default DetailBug;

import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";


const DetailOrgAct = ({token}) => {
    const { idAct, idUser } = useParams();
    const [user, setUser] = useState({});
    const [activity, setActivity] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const reportData = await fetchRequestById(id, token);
      setReport(reportData);
    };

    fetchData();
  }, [id, token]);

  async function fetchRequestById(id, token) {
    try {
      const response = await fetch(`https://culturapp-back.onrender.com/tickets/solicitudsOrganitzador/${id}`, {
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
      const usernameResponse = await fetch(`https://culturapp-back.onrender.com/users/${reportData.userSolicitant}`, {
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
  
      const actividadesResponse = await fetch(`https://culturapp-back.onrender.com/activitats/read/${reportData.idActivitat}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!actividadesResponse.ok) {
        throw new Error('Error fetching username');
      }
      const activitatData = await actividadesResponse.json();
      reportData.actdir = activitatData.adre_a;
      reportData.actdatini = activitatData.data_inici;
      reportData.actdatfi = activitatData.data_fi;
      reportData.acttitol = activitatData.denominaci;
      reportData.actdescr = activitatData.descripcio;
  
      console.log(reportData);
  
      return reportData;
    } catch (error) {
      console.error('Error fetching bug report:', error);
      return null;
    }
  }

  const handleDecline = async () => {
    try {
      const response = await fetch(`https://culturapp-back.onrender.com/tickets/solicitudOrganitzador/${id}/rebutjar`, {
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
      {user && activity && (
        <div>
          <h3 className="detailBugsection">About the user</h3>
          <hr className="line" />
          <div className="detailBugcontent">
            <p className="atribute">User</p>
            <p className="value">{user.username}</p>
            <p className="atribute">Mail</p>
            <p className="value">{user.mail}</p>
          </div>
          <h3 className="detailBugsection">About the activity</h3>
          <hr className="line" />
          <div className="detailBugcontent">
            <p className="atribute">Title</p>
            <p className="value">{activity.denominaci}</p>
            <p className="atribute">Description</p>
            <p className="value">{activity.descripcio}</p>
            <p className="atribute">Initial date</p>
            <p className="value">{formatDate(activity.data_inici).day}   {formatDate(activity.data_inici).time}</p>
            <p className="atribute">Final date</p>
            <p className="value">{formatDate(activity.data_fi).day}  {formatDate(activity.data_fi).time}</p>
            <p className="atribute">Direction</p>
            <p className="value">{activity.adre_a}</p>    
          </div>
            <div className="actionbutton">
                <button onClick={handleDecline}>Decline</button>
            </div>
        </div>
      )}
      <Link to="/list-act-org/:id">
        <button className="backbutton">Back</button>
      </Link>
    </div>
  );
};

export default DetailOrgAct;
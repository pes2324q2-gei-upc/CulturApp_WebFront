import { useParams, Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";


const DetailOrgAct = ({token}) => {
    const { idAct, idUser } = useParams();
    const [user, setUser] = useState({});
    const [activity, setActivity] = useState({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const userData = await fetchUserData(idUser, token);
            setUser(userData);
    
            const activityData = await fetchActivityData(idAct, token);
            setActivity(activityData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, [idAct, idUser, token]);

  async function fetchUserData(idUser, token) {
    const response = await fetch(`https://culturapp-back.onrender.com/users/${idUser}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching user data');
    }
    return response.json();
  }

  async function fetchActivityData(idAct, token) {
    const response = await fetch(`https://culturapp-back.onrender.com/activitats/read/${idAct}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching activity data');
    }
    return response.json();
  }

  const handleDecline = async () => {
    try {
      const response = await fetch(`https://culturapp-back.onrender.com`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error setting report to To Do');
      }

      history.push(`/list-act-org/${idAct}`);
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
      <Link to={`/list-act-org/${idAct}`}>
        <button className="backbutton">Back</button>
      </Link>
    </div>
  );
};

export default DetailOrgAct;
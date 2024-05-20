import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../RequestOrg.css"

function OrgsAct( {token} ) {
  const { id } = useParams();
  const [organitzadors, setOrganitzadors] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchOrganitzadorsData(id, token);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id, token]);

  async function fetchOrganitzadorsData(id, token) {
    try {
      const orgResponse = await fetch(`https://culturapp-back.onrender.com/organitzadors/activitat/${id}/organitzadors`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!orgResponse.ok) {
        throw new Error('Error fetching organizers data');
      }
      const orgData = await orgResponse.json();
      setOrganitzadors(orgData);
    } catch (error) {
      console.error('Error fetching organizers:', error);
    }
  }

  const handleRefuse = async (organitzador) => {
    console.log("handle refuse")
    console.log(organitzador.user, organitzador.activitat);
    try {
      const response = await fetch(`https://culturapp-back.onrender.com/users/${organitzador.user}/treureRol`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          activitatID: organitzador.activitat,
        })
      });
      if (!response.ok) {
        throw new Error('Error setting report to To Do');
      }
    } catch (error) {
      console.error('Error setting report to To Do:', error);
    }
  };


  const StateButtonUI = ({organitzador}) => (
    <div>
      <button className="refuseButton" onClick={(e) => {
        e.preventDefault(); // Evitar la redirección predeterminada
        console.log("statebutton")
        console.log(organitzador)
        handleRefuse(organitzador);
        setOrganitzadors(organitzadors.filter(organitzadorT => organitzadorT !== organitzador)); 
      }}> <span>Decline</span>
      </button>
    </div>
  );

  const Notification = ({ organitzador }) => {
    const MAX_LENGTH = 120;
    const truncateText = (text) => {
      if (text.length > MAX_LENGTH) {
          return text.substring(0, MAX_LENGTH) + '...';
      }
      return text;
    };   
    return (
      <div className="notification">
        <div className="notiglow"></div>
        <div className="notiborderglow"></div>
        <div className="notititle">User id: {organitzador.user}</div>
        <div className="notibody">User email: {truncateText(organitzador.email)}</div>
        <div>
          <StateButtonUI organitzador={organitzador}/>
        </div>
      </div>
    );
  };

  return (
    <div className="content">
      <h1 className="titlesmenusection">Organizers of Activity with id: ${id}</h1>
      {organitzadors && organitzadors.length > 0 ? (
        <ul style={{ listStyleType: 'none' }}>
          {organitzadors.map((organitzador) => (
            <li key={organitzador.id}>
              <Link to={`/org/${organitzador.activitat}/${organitzador.user}`} style={{ textDecoration: 'none' }}>
                <Notification organitzador={organitzador} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <h2>There are no organizers</h2>
      )}
    </div>
  );
}

export default OrgsAct;

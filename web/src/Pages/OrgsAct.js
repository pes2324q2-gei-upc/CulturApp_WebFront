import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../RequestOrg.css"

function OrgsAct( {token} ) {
  const { id } = useParams();
  const [organitzadors, setOrganitzadors] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const organitzadorsData = await fetchOrganitzadorsData(idUser, token);
        setUser(organitzadorsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id, token]);

  async function fetchOrganitzadorsData(idUser, token) {
    try {
      const orgResponse = await fetch('https://culturapp-back.onrender.com/',{
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
      setActivities(orgData);
    } catch (error) {
      console.error('Error fetching organizers:', error);
    }
  }

  const handleRefuse = async ({idActivitat, idUser}) => {
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
    } catch (error) {
      console.error('Error setting report to To Do:', error);
    }
  };


  const StateButtonUI = ({organitzador}) => (
    <div>
      <button className="refuseButton" onClick={(e) => {
        e.preventDefault(); // Evitar la redirección predeterminada
        handleRefuse(organitzador.user, organitzador.activitat);
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
        <div className="notititle">{organitzador.user}</div>
        <div className="notibody">{truncateText(organitzador.email)}</div>
        <div>
          <StateButtonUI organitzadors={organitzador}/>
        </div>
      </div>
    );
  };

  return (
    <div className="content">
      <h1 className="titlesmenusection">Organitzadors Activitat</h1>
      <ul style={{ listStyleType: 'none' }}>
        {organitzadors.map((organitzador) => (
          <li key={organitzador.id}>
            <Link to={`/org/${organitzador.activitat}/${organitzador.user}`} style={{ textDecoration: 'none' }}>
              <Notification organitzador={organitzador} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrgsAct;

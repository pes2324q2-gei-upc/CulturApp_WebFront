import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../RequestOrg.css"

function OrgsAct( {activitat, token} ) {
  const [requestOrg, setRequestOrg] = useState([]);
 
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('https://culturapp-back.onrender.com/tickets/reportsBug/all',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching reports');
        }
        const data = await response.json();
        setActivities(data);

      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const handleRefuse = async (id) => {
    try {
      const response = await fetch(`https://culturapp-back.onrender.com/tickets/reportsBug/${id}/solucionar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error setting report to To Do');
      }
  
      const data = await response.text();
      console.log(data); // Manejar la respuesta de la API según sea necesario
    } catch (error) {
      console.error('Error setting report to To Do:', error);
    }
  };


  const StateButtonUI = ({id, activitat}) => (
    <div>
      <button className="refuseButton" onClick={(e) => {
        e.preventDefault(); // Evitar la redirección predeterminada
        handleRefuse(id);
        
        setActivities(activities.filter(activitatF => activitatF !== activitat)); 
      }}> <span>Decline</span>
      </button>
    </div>
  );

  const Notification = ({ activitat }) => {
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
        <div className="notititle">{activitat.titol}</div>
        <div className="notibody">{truncateText(activitat.report)}</div>
        <div>
          <StateButtonUI id={activitat.id} activitat={activitat}/>
        </div>
      </div>
    );
  };

  return (
    <div className="content">
      <h1 className="titlesmenusection">Organitzadors Activitat</h1>
      <ul style={{ listStyleType: 'none' }}>
        {activities.map((activitat) => (
          <li key={activitat.id}>
            <Link to={`/org/${activitat.idActivitat}/${activitat.userSolicitant}`} style={{ textDecoration: 'none' }}>
              <Notification activitat={activitat} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrgsAct;

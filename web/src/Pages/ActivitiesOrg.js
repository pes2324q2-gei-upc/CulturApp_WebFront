import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../RequestOrg.css"

function ActivitiesOrg( {token} ) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activitiesResponse = await fetch('https://culturapp-back.onrender.com/organitzadors/llistarActivitats',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!activitiesResponse.ok) {
          throw new Error('Error fetching activities');
        }
        const activitiesData = await activitiesResponse.json();
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
  }, []);


  const Notification = ({ activitat }) => {
    const MAX_LENGTH = 120;
    const truncateText = (text) => {
      if (text && text.length > MAX_LENGTH) {
        return text.substring(0, MAX_LENGTH) + '...';
      }
      return text;
    };     
    return (
      <div className="notification">
        <div className="notiglow"></div>
        <div className="notiborderglow"></div>
        <div className="notititle">{activitat.denominaci}</div>
        <div className="notibody">{truncateText(activitat.descripcio)}</div>
      </div>
    );
  };

  return (
    <div className="content">
      <h1 className="titlesmenusection">List of Activities with Organizers</h1>
      <ul style={{ listStyleType: 'none' }}>
        {activities.map((activitat) => (
          <li key={activitat.denominaci}>
            <Link to={`${activitat.codi}`} style={{ textDecoration: 'none' }}>
              <Notification activitat={activitat} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivitiesOrg;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../RequestOrg.css"

function RequestOrg( {token} ) {
  const [requests, setRequests] = useState([]);
  const [activeButtons, setActiveButtons] = useState({});
  const [filterState, setFilterState] = useState('Pending');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('https://culturapp-back.onrender.com/tickets//solicitudsOrganitzador/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching organizer requests');
        }
        const data = await response.json();
        console.log(data);
        setRequests(data);

      } catch (error) {
        console.error('Error fetching organizer requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleRefuse = async (id) => {
    try {
      const response = await fetch(`https://culturapp-back.onrender.com/tickets/solicitudOrganitzador/${id}/rebutjar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error setting report to refuse');
      }
  
      const data = await response.text();
      console.log(data); // Manejar la respuesta de la API según sea necesario
    } catch (error) {
      console.error('Error setting report to refuse:', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await fetch(`https://culturapp-back.onrender.com/tickets/solicitudOrganitzador/${id}/acceptar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error setting report to Resolved');
      }
  
      const data = await response.text();
      console.log(data); // Manejar la respuesta de la API según sea necesario
    } catch (error) {
      console.error('Error setting report to Resolved:', error);
    }
  };

  const handleFilterChange = (filter) => {
    setFilterState(filter);
  };

  const Filters = () => (
    <div className="filter">
      <button
        className={filterState === 'Pending' ? 'active' : ''}
        onClick={() => handleFilterChange('Pending')}
      >
        <span>Pending</span>
      </button>
      <button
        className={filterState === 'Resolved' ? 'active' : ''}
        onClick={() => handleFilterChange('Resolved')}
      >
        <span>Resolved</span>
      </button>
    </div>
  );

  const StateButtonUI = ({id, request}) => (
    <div>
      <button className="acceptButton" onClick={(e) => {
        e.preventDefault(); // Evitar la redirección predeterminada
        handleAccept(id);
        request.pendent = false;
      }}> <span>Accept</span>
      </button>
      <button className="refuseButton" onClick={(e) => {
        e.preventDefault(); // Evitar la redirección predeterminada
        handleRefuse(id);
        request.pendent = false;
      }}> <span>Decline</span>
      </button>
    </div>
    
  );

  const Notification = ({ report }) => {
    const MAX_LENGTH = 120;
    const truncateText = (text) => {
      if (text && text.length > MAX_LENGTH) {
          return text.substring(0, MAX_LENGTH) + '...';
      }
      return text;
    };
    
    if ((filterState === 'Pending' && report.pendent)) {
      return (
        <div className="notification">
          <div className="notiglow"></div>
          <div className="notiborderglow"></div>
          <div className="notititle">{report.titol}</div>
          <div className="notibody">{truncateText(report.motiu)}</div>
          <div>
            <StateButtonUI id={report.id} request={report}/>
          </div>
        </div>
      );
    } else if(filterState === 'Resolved' && !report.pendent) {
      return (
        <div className="notification">
          <div className="notiglow"></div>
          <div className="notiborderglow"></div>
          <div className="notititle">{report.titol}</div>
          <div className="notibody">{report.motiu}</div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="content">
      <h1 className="titlesmenusection">Organizer requests</h1>
      <Filters />
      <ul style={{ listStyleType: 'none' }}>
        {requests.map((report) => (
          <li key={report.id}>
            <Link to={`${report.id}`} style={{ textDecoration: 'none' }}>
              <Notification report={report} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RequestOrg;

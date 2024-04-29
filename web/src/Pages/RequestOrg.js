import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../RequestOrg.css"

function RequestOrg( {token} ) {
  const [requests, setRequests] = useState([]);
  const [activeButtons, setActiveButtons] = useState({});
  const [filterState, setFilterState] = useState('To Do');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:8080/tickets//solicitudsOrganitzador/all', {
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
        setRequests(data);

      } catch (error) {
        console.error('Error fetching organizer requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleRefuse = async (id) => {
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
  
      const data = await response.text();
      console.log(data); // Manejar la respuesta de la API según sea necesario
    } catch (error) {
      console.error('Error setting report to To Do:', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/tickets/solicitudOrganitzador/${id}/acceptar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error setting report to Done');
      }
  
      const data = await response.text();
      console.log(data); // Manejar la respuesta de la API según sea necesario
    } catch (error) {
      console.error('Error setting report to Done:', error);
    }
  };

  const handleFilterChange = (filter) => {
    setFilterState(filter);
  };

  const Filters = () => (
    <div className="filter">
      <button
        className={filterState === 'To Do' ? 'active' : ''}
        onClick={() => handleFilterChange('To Do')}
      >
        <span>To Do</span>
      </button>
      <button
        className={filterState === 'Done' ? 'active' : ''}
        onClick={() => handleFilterChange('Done')}
      >
        <span>Done</span>
      </button>
    </div>
  );

  const StateButtonUI = () => (
    <div>
      <button className="acceptButton" onClick={(e) => {
        e.preventDefault(); // Evitar la redirección predeterminada
        handleAccept();
      }}> 
      </button>
      <button className="refuseButton" onClick={(e) => {
        e.preventDefault(); // Evitar la redirección predeterminada
        handleRefuse();
      }}> 
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
    
    if (filterState === 'Done') {
      return (
        <div className="notification">
          <div className="notiglow"></div>
          <div className="notiborderglow"></div>
          <div className="notititle">{report.titol}</div>
          <div className="notibody">{truncateText(report.report)}</div>
          <div>
            <StateButtonUI/>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="content">
      <h1 className="titlesmenusection">Organizator request</h1>
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

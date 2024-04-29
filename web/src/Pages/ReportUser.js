import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../RequestOrg.css"

function ReportUser({token}) {
  const [reports, setReports] = useState([]);
  const [activeButtons, setActiveButtons] = useState({});
  const [filterState, setFilterState] = useState('To Do');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:8080/tickets/reportsUsuaris/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Aquí es donde se incluye el token
            },
        }

        );
        if (!response.ok) {
          throw new Error('Error fetching user reports');
        }
        const data = await response.json();
        setReports(data);

      } catch (error) {
        console.error('Error fetching user reports:', error);
      }
    };

    fetchReports();
  }, []);

  const handleToDo = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/tickets/reportsUsuari/${id}/solucionar`, {
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

  const handleDone = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/tickets/reportsUsuari/${id}/nosolucionar`, {
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

  const StateButtonUI = ({ id, state }) => (
    <button className="stateButton" onClick={(e) => {
      e.preventDefault(); // Evitar la redirección predeterminada
      if (activeButtons[id] === 'button1') {
        handleToDo(id);
        setActiveButtons(prevState => ({
          ...prevState,
          [id]: 'button2' // Cambiar el estado a 'Done' después de hacer clic en 'To Do'
        }));
      } else if (activeButtons[id] === 'button2') {
        handleDone(id);
        setActiveButtons(prevState => ({
          ...prevState,
          [id]: 'button1' // Cambiar el estado a 'To Do' después de hacer clic en 'Done'
        }));
      }
    }}> 
      <span>{activeButtons[id] === 'button1' ? 'To Do' : 'Done'}</span>
    </button>
  );

  const Notification = ({ report }) => {
    const MAX_LENGTH = 120;
    const truncateText = (text) => {
      if (text.length > MAX_LENGTH) {
          return text.substring(0, MAX_LENGTH) + '...';
      }
      return text;
    };
    if ((filterState === 'Done' && !report.solucionat) || (filterState === 'To Do' && report.solucionat)) {
      return (
        <div className="notification">
          <div className="notiglow"></div>
          <div className="notiborderglow"></div>
          <div className="notititle">{report.titol}</div>
          <div className="notibody">{truncateText(report.report)}</div>
          <div>
            <StateButtonUI id={report.id} state={report.state}/>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="content">
      <h1 className="titlesmenusection">User reports</h1>
      <Filters />
      <ul style={{ listStyleType: 'none' }}>
        {reports.map((report) => (
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

export default ReportUser;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../RequestOrg.css"

function ReportBug() {
  const [reports, setReports] = useState([]);
  const [activeButtons, setActiveButtons] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = "b3bb874372df8a262c33a78b4de4841453b3ea52825a05f56f4dbb2f7863d989"
        const response = await fetch('http://localhost:8080/tickets/reportsBug/all',{
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
        setReports(data);

        const initialActiveButtonsState = {};
        data.forEach((report) => {
          initialActiveButtonsState[report.id] = 'button1'; // Inicialmente todos los botones están en 'To Do'
        });
        setActiveButtons(initialActiveButtonsState);

        const updatedReports = await Promise.all(
          data.map(async (report) => {
            try {
              const usernameResponse = await fetch(`http://localhost:8080/users/${report.user}/username`);
              if (!usernameResponse.ok) {
                throw new Error('Error fetching username');
              }
              const usernameData = await usernameResponse.json();
              return { ...report, username: usernameData };
            } catch (error) {
              console.error('Error fetching username:', error);
              return { ...report, username: 'Usuario desconocido' };
            }
          })
        );

        setReports(updatedReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const handleToDo = async (id) => {
    try {
      const token = 'b3bb874372df8a262c33a78b4de4841453b3ea52825a05f56f4dbb2f7863d989';
      const response = await fetch(`http://localhost:8080/tickets/reportsBug/${id}/solucionar`, {
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
      const token = 'b3bb874372df8a262c33a78b4de4841453b3ea52825a05f56f4dbb2f7863d989';
      const response = await fetch(`http://localhost:8080/tickets/reportsBug/${id}/nosolucionar`, {
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

  const handleClick = async (button, id) => {
    setActiveButtons(prevState => ({
      ...prevState,
      [id]: button
    }));
    if (button === 'button1') {
      await handleToDo(id);
    } else if (button === 'button2') {
      await handleDone(id);
    }
  };

  const Filters = ({ id }) => (
    <div className="filter">
      <button
        className={activeButtons[id] === 'button1' ? 'active' : ''}
        onClick={() => handleClick('button1', id)}
      ><span>To Do</span>
      </button>
      <button
        className={activeButtons[id] === 'button2' ? 'active' : ''}
        onClick={() => handleClick('button2', id)}
      >
      <span>Done</span>
      </button>
    </div>
  );

  const StateButtonUI = ({ id }) => (
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

  const Notification = ({ report }) => (
    <div className="notification">
      <div className="notiglow"></div>
      <div className="notiborderglow"></div>
      <div className="notititle">{report.titol}</div>
      <div className="notibody">{report.report}</div>
      <div>
        <StateButtonUI id={report.id}/>
      </div>
    </div>
  );

  return (
    <div className="content">
      <h1>Bug Reports</h1>
      {reports.map((report) => (
        <div key={report.id}>
          <Filters id={report.id}/>
          <Notification report={report} />
        </div>
      ))}
    </div>
  );
}

export default ReportBug;

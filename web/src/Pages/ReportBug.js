import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../RequestOrg.css"


function ReportBug() {
  const [reports, setReports] = useState([]);
  const [activeButton, setActiveButton] = useState('button1');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:8080/tickets/read/reportsBug/all');
        if (!response.ok) {
          throw new Error('Error fetching reports');
        }
        const data = await response.json();
        setReports(data);

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

  const handleClick = (button) => {
    setActiveButton(button);
  };

  const Filters = () => (
    <div class="filter">
      <button
        className={activeButton === 'button1' ? 'active' : ''}
        onClick={() => handleClick('button1')}
      ><span>To Do</span>

      </button>
      <button
        className={activeButton === 'button2' ? 'active' : ''}
        onClick={() => handleClick('button2')}
      >
      <span>Done</span>
      </button>
    </div>
  )

  const StateButtonUI = () => (
    <button class="stateButton"> 
      <span>Done</span>
    </button>
  )


  const Notification = ({ reports }) => (

    <div className="notification">
      <div className="notiglow"></div>
      <div className="notiborderglow"></div>
      <div className="notititle">{reports.errorApp}</div>
      <div className="notibody">Usuario: {reports.username}</div>
      <div>
        <StateButtonUI/>
      </div>
    </div>
  );

/*
  const Filter = () => (
    <div className="filter">
      <label htmlFor="checkbox_toggle" className="checkbox">
        <input id="checkbox_toggle" type="checkbox" className="check" />
        <div className="slide">
          <span className="toggle"></span>
          <span className="text">Day</span>
          <span className="text">Night</span>
        </div>
      </label>
    </div>
  );
*/

  const Switch = () => (
    <label class="toggle-switch">
      <input type="checkbox" />
      <div class="toggle-switch-background">
        <div class="toggle-switch-handle"></div>
      </div>
    </label>
  )



  return (
    <div className="content">
    <h1>Bug Reports</h1>
    <Filters/>
    <ul>
      {reports.map((reports) => (
        <li key={reports.id}>
          <Link to={`${reports.id}`} style={{ textDecoration: 'none' }}>
            <Notification reports={reports} />
          </Link>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default ReportBug;

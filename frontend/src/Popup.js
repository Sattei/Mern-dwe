import React, { useState, useEffect } from "react";
import "./Popup.css";

const Popup = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch logs when popup mounts
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:4000/api/logged-visit/get-logs",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setLogs(data.foundLogs || []);
    } catch (error) {
      console.error(`ERROR ${error} HAS OCCURRED`);
    }
    setLoading(false);
  };

  return (
    <div className="popup-container">
      <header className="popup-header">
        <h2>History</h2>
        <button className="refresh-btn" onClick={fetchLogs}>
          Refresh
        </button>
      </header>

      {loading ? (
        <p>Loading...</p>
      ) : logs.length === 0 ? (
        <p>NO LOGS FOUND</p>
      ) : (
        <ul className="logs-list">
          {logs.map((log, index) => (
            <li key={log.id || index} className="log-item">
              <a href={log.url} target="_blank" rel="noopener noreferrer">
                {/* target="_blank"  OPENS LINK IN NEW TAB */}
                {/* rel="noopener noreferrer"  SECURITY AND PRIVACY MEASURE : 
                    noopener : PREVENT NEW LINK FROM ACCESSING CURRENT PAGE
                    noreferrer : PREVENT CURRENT PAGE INFO BEING SENT TO URL LINK */}
                {log.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Popup;

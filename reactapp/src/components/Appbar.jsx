import React from 'react';

const Appbar = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="appbar">
      <div className="appbar-title">Student Dashboard</div>
      <button className="refresh-button" onClick={handleRefresh}>
        Refresh
      </button>
    </div>
  );
};

export default Appbar;

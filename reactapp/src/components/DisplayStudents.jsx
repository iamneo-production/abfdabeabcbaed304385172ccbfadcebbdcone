import React, { useEffect, useState } from 'react';

const DisplayStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchedData, setSearchedData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/getAllStudent")
      .then(res => res.json())
      .then(result => {
        setStudents(result);
      });
  }, []);

  const handleSearch = () => {
    if (searchId === '') {
      setSearchedData(null); // Reset the searched data if search is empty
      return;
    }

    fetch(`http://localhost:8080/getById/${searchId}`)
      .then(res => res.json())
      .then(result => {
        setSearchedData(result);
      });
  };

  return (
    <div>
      <h2>Students List</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {searchedData ? (
        <div className="searched-students">
          <h3>Searched Student:</h3>
          <table className="student-table">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>PhoneNumber</th>
              </tr>
              <tr>
                <td>{searchedData.id}</td>
                <td>{searchedData.name}</td>
                <td>{searchedData.department}</td>
                <td>{searchedData.phonenumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="students-list">
          <h3>Students:</h3>
          <table className="student-table">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>PhoneNumber</th>
              </tr>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td>{student.phonenumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DisplayStudents;


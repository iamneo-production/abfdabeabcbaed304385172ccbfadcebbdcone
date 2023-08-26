import React, { useState } from 'react';

const AddStudent = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [phonenumber, setPhonenumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = { id, name, department, phonenumber };

    fetch("http://localhost:8080/addStudent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    }).then(async (response) => {
      if (response.ok) {
        console.log("New Student Added");
        // You can also log the response data if needed
        const responseData = await response.json();
        console.log("Response Data:", responseData);
      } else {
        console.error("Failed to add student");
      }
    });

    setId('');
    setName('');
    setDepartment('');
    setPhonenumber('');
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="id" className="form-label">RegistrationId:</label>
          <input
            type="text"
            id="id"
            className="form-input"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Name" className="form-label">Name:</label>
          <input
            type="text"
            id="Name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Department" className="form-label">Department:</label>
          <input
            type="text"
            id="Department"
            className="form-input"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber" className="form-label">PhoneNumber:</label>
          <input
            type="text"
            id="phoneNumber"
            className="form-input"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
          />
        </div>
        <button type="submit" className="form-submit">Submit</button>
      </form>
    </div>
  );
};

export default AddStudent;

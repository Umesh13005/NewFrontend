import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

import './Appointments.css'; // Adjust the path as necessary

const Appointments = () => {
  const { user } = useContext(AuthContext);

  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
  });

  const { doctor, date, time } = formData;

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axios.get('/api/appointments');
      setAppointments(res.data);
    };
    fetchAppointments();
  }, []);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/appointments', formData);
    setAppointments([...appointments, res.data]);
  };

  const deleteAppointment = async (id) => {
    await axios.delete(`/api/appointments/${id}`);
    setAppointments(appointments.filter((appointment) => appointment._id !== id));
  };

  return (
    <div className="appointments-container">
      <h1>Appointments</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Doctor</label>
          <input type="text" name="doctor" value={doctor} onChange={onChange} required />
        </div>
        <div>
          <label>Date</label>
          <input type="date" name="date" value={date} onChange={onChange} required />
        </div>
        <div>
          <label>Time</label>
          <input type="time" name="time" value={time} onChange={onChange} required />
        </div>
        <button type="submit">Book Appointment</button>
      </form>
      <ul className="appointments-list">
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            {appointment.doctor} - {appointment.date} at {appointment.time}
            <button onClick={() => deleteAppointment(appointment._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;

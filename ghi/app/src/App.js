import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import MainPage from './MainPage';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendConferenceForm from './AttendConferenceForm';
import PresentationForm from './PresentationForm';
import { Route, Routes } from 'react-router-dom';


function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
      <Nav />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="conferences/new" element={<ConferenceForm />} />
        <Route path="attendees/new" element={<AttendConferenceForm />} />
        <Route path="locations/new" element={<LocationForm />} />
        <Route path="presentations/new" element={<PresentationForm />} />
        <Route path="attendees" element={<AttendeesList attendees={props.attendees} />} />
      </Routes>
    </>
  );
}

export default App;

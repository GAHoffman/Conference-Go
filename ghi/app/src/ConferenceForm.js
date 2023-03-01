import React, { useState, useEffect } from 'react';


function ConferenceForm () {
    // Create a bunch of useState hooks and Change functions for the different inputs we need
    const [name, setName] = useState('');
    const handleNameChange = event => {
        setName(event.target.value);
    }

    const [starts, setStarts] = useState('');
    const handleStartsChange = event => {
        setStarts(event.target.value);
    }

    const [ends, setEnds] = useState('');
    const handleEndsChange = event => {
        setEnds(event.target.value);
    }

    const [description, setDescription] = useState('');
    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    }

    const [maxPresentations, setMaxPresentations] = useState('');
    const handleMaxPresentationsChange = event => {
        setMaxPresentations(event.target.value);
    }

    const [maxAttendees, setMaxAttendees] = useState('');
    const handleMaxAttendeesChange = event => {
        setMaxAttendees(event.target.value);
    }

    const [location, setLocation] = useState('');
    const handleLocationChange = event => {
        setLocation(event.target.value);
    }

    // Location Handling for Location List DropDown specifically
    const [locations, setLocations] = useState([]);

    // Load locations for the location select element
    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // onSubmit Handle event
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.name = name;
        data.starts = starts;
        data.ends = ends;
        data.description = description;
        data.max_presentations = maxPresentations;
        data.max_attendees = maxAttendees;
        data.location = location;
        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
            },
        };

        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            setName('');
            setStarts('');
            setEnds('');
            setDescription('');
            setMaxPresentations('');
            setMaxAttendees('');
            setLocation('');
        }


    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new conference</h1>
                    <form onSubmit={handleSubmit} id="create-conference-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} placeholder="Name" required
                                type="text" name="name" id="name" value={name}
                                className="form-control"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleStartsChange} placeholder="Starts" required
                                type="date" name="starts" id="starts" value={starts}
                                className="form-control"/>
                            <label htmlFor="starts">Starts</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEndsChange} placeholder="Ends" required
                                type="date" name="ends" id="ends" value={ends}
                                className="form-control"/>
                            <label htmlFor="ends">Ends</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea onChange={handleDescriptionChange} name="description"
                                id="description" rows="5" value={description}
                                className="form-control"
                            ></textarea>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleMaxPresentationsChange} placeholder="Maximum presentations" required
                                type="number" name="max_presentations" id="max_presentations" value={maxPresentations}
                                className="form-control"/>
                            <label htmlFor="ends">Maximum presentations</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleMaxAttendeesChange} placeholder="Maximum attendees" required
                                type="number" name="max_attendees" id="max_attendees" value={maxAttendees}
                                className="form-control"/>
                            <label htmlFor="ends">Maximum attendees</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleLocationChange} required name="location" id="location" value={location} className="form-select">
                                <option value="">Choose a location</option>
                                {locations.map(location => {
                                    return (
                                        <option key={location.id} value={location.id}>
                                            {location.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ConferenceForm;

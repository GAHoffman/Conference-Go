import React, {useEffect, useState} from 'react';


function LocationForm () {
    // Create a bunch of useState hooks and Change functions for the different inputs we need
    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const [roomCount, setRoomCount] = useState('');
    const handleRoomCountChange = (event) => {
        setRoomCount(event.target.value);
    };

    const [city, setCity] = useState('');
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const [state, setState] = useState('');
    const handleStateChange = (event) => {
        setState(event.target.value);
    };

    // State Handling for States List DropDown specifically
    const [states, setStates] = useState([]);

    // load states for the state select element
    const fetchData = async () => {
        const url = 'http://localhost:8000/api/states/';

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          // use the set function from useState hook to set state for states with data.states
          setStates(data.states);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // onSubmit Handle event
    const handleSubmit = async (event) => {
        event.preventDefault();

        // create empty JSON object
        const data = {};

        data.room_count = roomCount;
        data.name = name;
        data.city = city;
        data.state = state;
        console.log(data);

        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            const newLocation = await response.json();
            console.log(newLocation);

            setName('');
            setRoomCount('');
            setCity('');
            setState('');
        }
    }


    // return Form JSX
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new location</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} placeholder="Name" required
                                type="text" name="name" id="name" value={name}
                                className="form-control"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleRoomCountChange} placeholder="Room count" required
                                type="number" name="room_count" id="room_count" value={roomCount}
                                className="form-control"/>
                            <label htmlFor="room_count">Room count</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleCityChange} placeholder="City" required
                                type="text" name="city" id="city" value={city}
                                className="form-control"/>
                            <label htmlFor="city">City</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleStateChange} required name="state" id="state" value={state} className="form-select">
                                <option value="">Choose a state</option>
                                {states.map(state => {
                                    return (
                                        <option key={state.abbreviation} value={state.abbreviation}>
                                            {state.name}
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

export default LocationForm;

import React, { useState, useEffect } from 'react';


function PresentationForm () {
    // Create a bunch of useState hooks and Change functions for the different inputs we need
    const [presenterName, setPresenterName] = useState('');
    const handleNameChange = event => {
        setPresenterName(event.target.value);
    }
    const [presenterEmail, setPresenterEmail] = useState('');
    const handleEmailChange = event => {
        setPresenterEmail(event.target.value);
    }
    const [companyName, setCompanyName] = useState('');
    const handleCompanyChange = event => {
        setCompanyName(event.target.value);
    }
    const [title, setTitle] = useState('');
    const handleTitleChange = event => {
        setTitle(event.target.value);
    }
    const [synopsis, setSynopsis] = useState('');
    const handleSynopsisChange = event => {
        setSynopsis(event.target.value);
    }
    const [conference, setConference] = useState('');
    const handleConferenceChange = event => {
        setConference(event.target.value);
    }
    // Conference Handling for Location List DropDown specifically
    const [conferences, setConferences] = useState([]);
    // Load conference for the conference select element
    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data.conferences);
            setConferences(data.conferences);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    // onSubmit Handle event
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.presenter_name = presenterName;
        data.presenter_email = presenterEmail;
        data.company_name = companyName;
        data.title = title;
        data.synopsis = synopsis;
        data.conference = conference;
        console.log(data);

        const presentationUrl = `http://localhost:8000/${data.conference}presentations/`
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            const newPresentation = await response.json();
            console.log(newPresentation);

            setPresenterName('');
            setPresenterEmail('');
            setCompanyName('');
            setTitle('');
            setSynopsis('');
            setConference('');
        }

    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new presentation</h1>
                    <form onSubmit={handleSubmit} id="create-presentation-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} placeholder="Presenter name" required
                                type="text" name="presenter_name" id="presenter_name" value={presenterName}
                                className="form-control"/>
                            <label htmlFor="presenter_name">Presenter name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEmailChange} placeholder="Presenter email" required
                                type="email" name="presenter_email" id="presenter_email" value={presenterEmail}
                                className="form-control"/>
                            <label htmlFor="presenter_email">Presenter email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleCompanyChange} placeholder="Company name" type="text"
                                name="company_name" id="company_name" value={companyName}
                                className="form-control"/>
                            <label htmlFor="company_name">Company name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleTitleChange} placeholder="Title" required
                                type="text" name="title" id="title" value={title}
                                className="form-control"/>
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="synopsis">Synopsis</label>
                            <textarea onChange={handleSynopsisChange} name="synopsis"
                                id="synopsis" rows="5" value={synopsis}
                                className="form-control"
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleConferenceChange} required name="conference" id="conference" value={conference} className="form-select">
                                <option value="">Choose a conference</option>
                                {conferences.map(conference => {
                                    return (
                                        <option key={conference.href} value={conference.href}>
                                            {conference.name}
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

export default PresentationForm;

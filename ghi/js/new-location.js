// 1. Need to add event listener for when DOM loads
// 2. Declare variable that will hold URL for the API that we created
// 3. Fetch URL. Don't forget await keyword, so that we get the response
// 4. If the response is ok, then get the data using the await .json() method

// We are using a new window entirely hence why it's not on the form itself, but
// the entire DOM loading
window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/states';
    const stateResponse = await fetch(url);

    if (stateResponse.ok) {
        const stateData = await stateResponse.json();

        const selectStateTag = document.getElementById('state');

        for (let state of stateData.states) {
            const option = document.createElement('option');
            option.value = state.abbreviation;
            option.innerHTML = state.name;
            selectStateTag.appendChild(option);
        }
    }

    const formTag = document.getElementById('create-location-form');
    formTag.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(formTag);
        const dataObject = Object.fromEntries(formData);
        const json = JSON.stringify(dataObject);

        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const locationURL = 'http://localhost:8000/api/locations/';
        const locationResponse = await fetch(locationURL, fetchConfig);
        if (locationResponse.ok) {
            formTag.reset();
            const newLocation = await locationResponse.json();

        }
    });

});

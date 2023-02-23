// 1. Need to add event listener for when DOM loads
// 2. Declare variable that will hold URL for the API that we created
// 3. Fetch URL. Don't forget await keyword, so that we get the response
// 4. If the response is ok, then get the data using the await .json() method

// We are using a new window entirely hence why it's not on the form itself, but
// the entire DOM loading
window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/locations';
    const locationResponse = await fetch(url);

    if (locationResponse.ok) {
        const locationData = await locationResponse.json();
        const selectLocationTag = document.getElementById('location');

        for (let location of locationData.locations) {
            const option = document.createElement('option');
            option.value = location.id;
            option.innerHTML = location.name;
            selectLocationTag.appendChild(option);
        }
    }

    const formTag = document.getElementById('create-conference-form');
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
        const conferenceURL = 'http://localhost:8000/api/conferences/';
        const conferenceResponse = await fetch(conferenceURL, fetchConfig);
        if (conferenceResponse.ok) {
            formTag.reset();
            const newConference = await conferenceResponse.json();

        }
    });

});

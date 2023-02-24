// 1. Need to add event listener for when DOM loads
// 2. Declare variable that will hold URL for the API that we created
// 3. Fetch URL. Don't forget await keyword, so that we get the response
// 4. If the response is ok, then get the data using the await .json() method

// We are using a new window entirely hence why it's not on the form itself, but
// the entire DOM loading
window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';
    const conferenceResponse = await fetch(url);

    const selectTag = document.getElementById('conference');

    if (conferenceResponse.ok) {
        const conferenceData = await conferenceResponse.json();

        for (let conference of conferenceData.conferences) {
            const option = document.createElement('option');
            option.value = conference.id;
            option.innerHTML = conference.name;
            selectTag.appendChild(option);
        }
    }

    const formTag = document.getElementById('create-presentation-form');
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
        const conferenceId = selectTag.options[selectTag.selectedIndex].value;
        const presentationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
        const presentationResponse = await fetch(presentationUrl, fetchConfig);
        if (presentationResponse.ok) {
            formTag.reset();
            const newPresentation = await presentationResponse.json();

        }
    });

});

window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');

    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      for (let conference of data.conferences) {
        const option = document.createElement('option');
        option.value = conference.href;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }
    }
    // Here, add the 'd-none' class to the loading icon
    const loadingIcon = document.getElementById("loading-conference-spinner");
    loadingIcon.classList.add('d-none');
    // Here, remove the 'd-none' class from the select tag
    selectTag.classList.remove('d-none');

    // Now to add the attendee POST functionality
    const formTag = document.getElementById('create-attendee-form');
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

        const attendeeUrl = `http://localhost:8001/api/attendees/`;
        const attendeeResponse = await fetch(attendeeUrl, fetchConfig);
        if (attendeeResponse.ok) {
            formTag.reset();
            const newAttendee = await attendeeResponse.json();
        }
        // Here, add the 'd-none' class to the form
        formTag.classList.add('d-none');
        // Here, .getElementById of the success alert message and remove the 'd-none' class
        const successAlert = document.getElementById('success-message');
        successAlert.classList.remove('d-none');
    });

});

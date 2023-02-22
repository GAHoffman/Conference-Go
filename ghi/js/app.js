window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();

          const conference = data.conferences[0];
          const nameTag = document.querySelector('.card-title');
          nameTag.innerHTML = conference.name;

          const detailURL =  `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailURL);
          if (detailResponse.ok) {
            const details = await detailResponse.json();

            const textTag = document.querySelector('.card-text');
            textTag.innerHTML = details.conference.description;

            const imgTag = document.querySelector('.card-img-top');
            imgTag.src = details.conference.location.picture_url;
          }
        } else {
          throw new Error('Response not ok');
        }
      } catch (e) {
            console.error('error', e);
      }

});

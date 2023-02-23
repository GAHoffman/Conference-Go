function createCard(name, description, pictureUrl, locationName, starts, ends) {
  return `
    <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${locationName}</h6>
        <p class="card-text">${description}</p>
      </div>
      <div class="card-footer">
        <p class="text-muted">Starts: ${starts}</p>
        <p class="text-muted">Ends: ${ends}</p>
      </div>
    </div>
  `;
}


function createAlert() {
  return `
    <div class="alert alert-warning" role="alert">
      A simple warning alert—check it out!
    </div>
  `;
}


window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/conferences/';
  const columns = document.querySelectorAll('.col');
  let colIndx = 0

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Figure out what to do when the response is bad
      const alert = createAlert();
      return alert;
    } else {
      const data = await response.json();

      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          console.log(details);
          const title = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const locationName = details.conference.location.name;
          const starts = new Date(details.conference.starts).toDateString();
          const ends = new Date(details.conference.ends).toDateString();
          const html = createCard(title, description, pictureUrl, locationName, starts, ends);

          const column = columns[colIndx % 3];
          column.innerHTML += html;
          colIndx++;
        }
      }

    }
  } catch (e) {
    // Figure out what to do if an error is raised
    console.error('error', e);
  }

});


// Alternate Method Below


// window.addEventListener('DOMContentLoaded', () => {
//   console.log('JS Loaded!');

//   async function getConferencesAndDetails() {
//       const conferences = await getConferences();

//       const promisesArr = conferences.map(({href}) => getConferenceDetailsByHref(href));
//       return Promise.all(promisesArr);
//   }

//   async function getConferences() {
//       const url = 'http://localhost:8000/api/conferences/';
//       try {
//           const response = await fetch(url);
//           if(response.ok) {
//               const { conferences } = await response.json();
//               return conferences;
//           } else {
//               console.log('Unable to fetch conferences!');
//           }
//       } catch(e) {
//           console.error(e);
//       }
//   }

//   async function getConferenceDetailsByHref(conferenceHref) {
//       const url = `http://localhost:8000${conferenceHref}`;

//       try {
//           const response = await fetch(url);
//           if (response.ok) {
//               const details = await response.json();
//               return details;
//           }
//       } catch(e) {
//           console.log(e);
//       }
//   }

//   function renderConferenceCardHtml({ conference }) {
//       const { name, description } = conference;
//       const { picture_url } = conference.location;
//       const imageUrl = conference.location.picture_url
//       return `
//       <div class="card">
//           <img src="${picture_url}" class="card-img-top" alt="...">
//           <div class="card-body">
//               <h5 class="card-title">${name}</h5>
//               <p class="card-text">${description}</p>
//           </div>
//       </div>
//       `
//   }

//   function renderConferenceCards(conferences) {
//       const columns = document.querySelectorAll('.col');

//       const conferenceCards = conferences.forEach((conference, idx) => {
//           const card = renderConferenceCardHtml(conference);
//           const cardCol = idx % 3;

//           columns[cardCol].innerHTML += card;
//       })

//   }

//   getConferencesAndDetails()
//       .then(conferences => renderConferenceCards(conferences));
// });

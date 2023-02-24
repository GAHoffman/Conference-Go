// Get the cookie out of the cookie store
const payloadCookie = await cookieStore.get('jwt_access_payload');
if (payloadCookie) {
  // The cookie value is a JSON-formatted string, so parse it
//   const encodedPayload = JSON.parse(payloadCookie.value);  //Didn't need this step do to DJWTO package

  // Convert the encoded payload from base64 to normal string
  const decodedPayload = atob(payloadCookie.value);

  // The payload is a JSON-formatted string, so parse it
  const payload = JSON.parse(decodedPayload);

  // Print the payload
  console.log(payload);

  const permissions = payload.user.perms;
  // Check if "events.add_conference" is in the permissions.
  // If it is, remove 'd-none' from the link
  const conferenceLink = document.getElementById("conference-link")
  if (permissions.includes("events.add_conference")) {
    conferenceLink.classList.remove('d-none');
  };

  // Check if "events.add_location" is in the permissions.
  // If it is, remove 'd-none' from the link
  const locationLink = document.getElementById("location-link")
  if (permissions.includes("events.add_location")) {
    locationLink.classList.remove('d-none');
  };

  // Check if "presentations.add_presentation" is in the permissions.
  // If it is, remove 'd-none' from the link
  const presentationLink = document.getElementById("presentation-link")
  if (permissions.includes("presentations.add_presentation")) {
    presentationLink.classList.remove('d-none');
  };

}

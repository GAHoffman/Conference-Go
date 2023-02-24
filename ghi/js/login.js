window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', async event => {
      event.preventDefault();

      // login requires normal form data, not JSON
      const fetchOptions = {
        method: 'post',
        body: new FormData(form),
        credentials: "include",
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      };
      const url = 'http://localhost:8000/login/';
      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        window.location.href = '/';
      } else {
        console.error(response);
      }
      const successAlert = document.getElementById('success-message');
      successAlert.classList.remove('d-none');
    });
  });

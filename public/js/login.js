const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const userName = document.querySelector('#userName-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (userName && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: { 'Content-Type': 'application/json' },
      });

        const result = await response.json();
        console.log(result);

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  };

  const sign_up_button = async function sign_up_route () {

    document.location.replace(`/signup`)

  }

  
  document
    .querySelector('.sign_up')
    .addEventListener('click', sign_up_button)
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);


  
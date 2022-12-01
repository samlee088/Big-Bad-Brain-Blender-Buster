async function signupFormHandler(event) {
    event.preventDefault();

    const userName = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (userName && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({
                userName,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log('success');

            document.location.replace('/homepage');

        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
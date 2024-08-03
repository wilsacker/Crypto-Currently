document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username-input-login');
  const passwordInput = document.getElementById('password-input-login');

  // Handle login form submission
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username && password) {
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ username, password }) // Send username and password in the body
        });
          
        if (response.ok) {
          // Redirect to the homepage if login is successful
          document.location.replace('/');
        } else {
          // Display an alert if login fails
          alert('Failed to login. Please check your username and password.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    } else {
      alert('Please enter both username and password.');
    }
  });
});

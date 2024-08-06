document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username-input-login');
  const passwordInput = document.getElementById('password-input-login');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

 
    if (username && password) {
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ username, password })
        });
          
        if (response.ok) {
          document.location.replace('/');
        } else {
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

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  const usernameInput = document.getElementById('username-input-signup');
  const passwordInput = document.getElementById('password-input-signup');

  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username && password) {
      try {
        const response = await fetch('/signup', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ username, password })
        });
          
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to sign up. Please try again.');
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

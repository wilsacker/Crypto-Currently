document.addEventListener('DOMContentLoaded', () => {
  // Use the correct ID for the form
  const signupForm = document.getElementById('signup-form');
  const usernameInput = document.getElementById('username-input-signup');
  const passwordInput = document.getElementById('password-input-signup');

  if (!signupForm) {
    console.error('Signup form element not found');
    return;
  }

  // Handle signup form submission
  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username && password) {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: {'Content-Type': 'application/json'},
          
        });

        if (response.ok) {
          // Redirect to the homepage if the signup was successful
          document.location.replace('/');
        } else {
          // Display an alert if the signup failed
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

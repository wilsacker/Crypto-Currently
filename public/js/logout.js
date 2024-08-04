document.addEventListener('DOMContentLoaded', () => {
  const logoutLink = document.getElementById('logout');

  if (logoutLink) {
    logoutLink.addEventListener('click', async (event) => {
      event.preventDefault();

      try {
        const response = await fetch('/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to log out.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    });
  }
});

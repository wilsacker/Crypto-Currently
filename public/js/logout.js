document.addEventListener('DOMContentLoaded', () => {
  const logoutLink = document.getElementById('logout');

  if (logoutLink) {
    logoutLink.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent default link behavior

      try {
        const response = await fetch('/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Redirect to login page or home page after successful logout
          window.location.href = '/homepage'; // Redirect to login page or home page
        } else {
          console.error('Failed to log out');
          alert('An error occurred while logging out. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    });
  }
});






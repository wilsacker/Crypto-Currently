const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    const body = document.body;
    const isLightMode = body.classList.contains('light-mode');

    if (isLightMode) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggle.textContent = 'Light Mode';
        themeToggle.classList.remove('btn-outline-light');
        themeToggle.classList.add('btn-outline-dark');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeToggle.textContent = 'Dark Mode';
        themeToggle.classList.remove('btn-outline-dark');
        themeToggle.classList.add('btn-outline-light');
    }
});


// Function to toggle password visibility
function togglePasswordVisibility(passwordInputId, toggleButton) {
    const passwordInput = document.getElementById(passwordInputId);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = 'Hide';
    } else {1
        passwordInput.type = 'password';
        toggleButton.textContent = 'Show';
    }
}

// Add event listener for login password toggle
document.getElementById('toggle-password').addEventListener('click', function() {
    togglePasswordVisibility('password-input-login', this);
});

// Function to toggle signup password visibility
function toggleSignupPassword() {
    const toggleButton = document.querySelector('.password-toggle-btn');
    togglePasswordVisibility('password-input-signup', toggleButton);
}


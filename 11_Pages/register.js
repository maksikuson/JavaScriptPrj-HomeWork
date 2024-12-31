document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    if (password !== confirmPassword) {
        document.getElementById('error').textContent = 'Passwords do not match.';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
        document.getElementById('error').textContent = 'Email already registered.';
        return;
    }

    users.push({ username, email, password, firstName, lastName });
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = 'login.html';
});
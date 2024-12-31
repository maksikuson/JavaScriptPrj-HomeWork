const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
    window.location.href = 'login.html';
} else {
    const userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.innerHTML = `
        <p>Name: ${currentUser.firstName} ${currentUser.lastName}</p>
        <p>Username: ${currentUser.username}</p>
        <p>Email: ${currentUser.email}</p>
    `;

    document.getElementById('logout').addEventListener('click', function () {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
}
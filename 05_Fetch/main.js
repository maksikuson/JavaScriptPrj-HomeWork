async function getUserInfo() {
    const username = document.getElementById("username").value.trim();
    const errorElement = document.getElementById("error");
    const userInfo = document.getElementById("userInfo");
    errorElement.textContent = '';
    userInfo.style.display = 'none';

    if (!username) {
      errorElement.textContent = "Please enter a username.";
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      document.getElementById("avatar").src = data.avatar_url || '';
      document.getElementById("name").textContent = `Name: ${data.name || 'N/A'}`;
      document.getElementById("login").textContent = `Login: ${data.login}`;
      document.getElementById("htmlUrl").href = data.html_url;
      document.getElementById("htmlUrl").textContent = data.html_url;
      document.getElementById("blog").href = data.blog || '#';
      document.getElementById("blog").textContent = data.blog || 'N/A';
      document.getElementById("location").textContent = data.location || 'N/A';
      document.getElementById("email").textContent = data.email || 'N/A';
      document.getElementById("followers").textContent = data.followers;
      document.getElementById("following").textContent = data.following;
      userInfo.style.display = 'block';
    } catch (error) {
      errorElement.textContent = error.message;
    }
  }
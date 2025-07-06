document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('registerForm');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var displayName = document.getElementById('displayName').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
      return;
    }
    document.getElementById('confirmPasswordError').textContent = '';

    var userData = {
      displayName: displayName,
      username: username,
      email: email,
      password: password,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = 'feed.html';
  });
}); 
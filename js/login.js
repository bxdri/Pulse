document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('loginForm');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var found = users.find(function(u) {
      return u.username === username && u.password === password;
    });
    if (!found) {
      document.getElementById('loginGeneralError').textContent = 'Invalid username or password';
      return;
    }
    localStorage.setItem('currentUser', JSON.stringify(found));
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'feed.html';
  });
}); 
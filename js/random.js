document.addEventListener('DOMContentLoaded', function() {
  // Logout functionality
  document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
  });

  var userPic = document.getElementById('randomUserPic');
  var userName = document.getElementById('randomUserName');
  var userUsername = document.getElementById('randomUserUsername');
  var userEmail = document.getElementById('randomUserEmail');
  var userBirthday = document.getElementById('randomUserBirthday');
  var newUserBtn = document.getElementById('newUserBtn');
  var addFriendBtn = document.getElementById('addFriendBtn');

  function getRandomUser() {
    userName.textContent = 'Loading...';
    userUsername.textContent = '@loading';
    userEmail.textContent = 'loading@email.com';
    userBirthday.textContent = 'Birthday: Loading...';
    userPic.src = 'img/default-user.png';
    
    // Reset Add Friend button
    addFriendBtn.disabled = false;
    addFriendBtn.textContent = 'Add Friend';
    
    fetch('https://randomuser.me/api/')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var user = data.results[0];
        var firstName = user.name.first;
        var lastName = user.name.last;
        var username = user.login.username;
        var email = user.email;
        var birthday = new Date(user.dob.date);
        var picture = user.picture.large;
        
        userName.textContent = firstName + ' ' + lastName;
        userUsername.textContent = '@' + username;
        userEmail.textContent = email;
        userBirthday.textContent = 'Birthday: ' + birthday.toLocaleDateString();
        userPic.src = picture;
      })
      .catch(function(error) {
        console.log('Error:', error);
        userName.textContent = 'Error loading user';
        userUsername.textContent = '@error';
        userEmail.textContent = 'error@email.com';
        userBirthday.textContent = 'Birthday: Error';
      });
  }

  newUserBtn.addEventListener('click', getRandomUser);
  
  addFriendBtn.addEventListener('click', function() {
    this.disabled = true;
    this.textContent = 'Friend Request Sent';
  });
  
  // Load initial user
  getRandomUser();
}); 
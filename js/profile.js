document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
  });

  var user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  var username = user.username || '';

  document.getElementById('profileDisplayName').textContent = user.displayName || '';
  document.getElementById('profileUsername').textContent = '@' + username;
  document.getElementById('profileBio').value = user.bio || '';
  document.getElementById('profilePic').src = user.profilePic || 'img/default-user.png';


  document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    user.bio = document.getElementById('profileBio').value;
    user.profilePic = document.getElementById('profilePic').src;
    localStorage.setItem('currentUser', JSON.stringify(user));

    var users = JSON.parse(localStorage.getItem('users') || '[]');
    for (var i = 0; i < users.length; i++) {
      if (users[i].username === user.username) {
        users[i].bio = user.bio;
        users[i].profilePic = user.profilePic;
      }
    }
    localStorage.setItem('users', JSON.stringify(users));
  });

// პროფილის სურათის შეცვლა
  document.getElementById('profilePicInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(evt) {
      document.getElementById('profilePic').src = evt.target.result;
    };
    reader.readAsDataURL(file);
  });
//

  var posts = JSON.parse(localStorage.getItem('posts') || '[]');
  var myPosts = posts.filter(function(p) { return p.username === username; });
  var postsDiv = document.getElementById('profilePosts');
  postsDiv.innerHTML = '';
  
  if (myPosts.length === 0) {
    postsDiv.innerHTML = '<div style="text-align:center;color:#666;padding:40px;">No posts yet. Share your first post!</div>';
    return;
  }
  
  myPosts.reverse().forEach(function(post) {
    var card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML =
      '<div class="post-header">' +
        '<img class="post-avatar" src="' + (user.profilePic || 'img/default-user.png') + '" />' +
        '<span class="post-user">' + (user.displayName || '') + '</span>' +
        '<span class="post-date">' + (post.date || '') + '</span>' +
      '</div>' +
      '<div class="post-content">' + post.content + '</div>' +
      (post.image ? '<img src="' + post.image + '" class="post-img" style="max-width:100%;margin-top:8px;border-radius:12px;" />' : '');
    postsDiv.appendChild(card);
  });
}); 
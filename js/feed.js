document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
  });

  var postBtn = document.getElementById('postBtn');
  var postContent = document.getElementById('postContent');
  var postsDiv = document.getElementById('posts');
  var user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  var postImageData = '';

  var createAvatar = document.querySelector('.create-avatar');
  if (user.profilePic) {
    createAvatar.src = user.profilePic;
  }

  var createPostActions = document.querySelector('.create-post-actions');
  var imgInput = document.createElement('input');
  imgInput.type = 'file';
  imgInput.accept = 'image/*';
  imgInput.style.display = 'none';
  var imgBtn = document.createElement('button');
  imgBtn.type = 'button';
  imgBtn.innerHTML = '<img src="img/image-upload-icon.svg" alt="Upload Image" style="width:20px;height:20px;" />';
  imgBtn.className = 'btn-primary';
  imgBtn.style.marginRight = '8px';
  imgBtn.style.padding = '8px';
  imgBtn.style.background = 'transparent';
  imgBtn.style.border = 'none';
  imgBtn.style.color = '#666';
  imgBtn.style.cursor = 'pointer';
  imgBtn.style.transition = 'transform 0.2s';
  imgBtn.onmouseenter = function() { this.style.transform = 'scale(1.1)'; };
  imgBtn.onmouseleave = function() { this.style.transform = 'scale(1)'; };
  createPostActions.insertBefore(imgBtn, postBtn);
  createPostActions.appendChild(imgInput);

  imgBtn.onclick = function() { imgInput.click(); };
  imgInput.onchange = function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(evt) {
      postImageData = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  postBtn.addEventListener('click', function() {
    var content = postContent.value.trim();
    if (!content && !postImageData) return;
    var posts = JSON.parse(localStorage.getItem('posts') || '[]');
    var post = {
      id: Date.now(),
      username: user.username,
      displayName: user.displayName,
      profilePic: user.profilePic || 'img/default-user.png',
      content: content,
      image: postImageData,
      date: new Date().toLocaleString(),
      liked: false
    };
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    postContent.value = '';
    postImageData = '';
    imgInput.value = '';
    showPosts();
  });

  function toggleLike(postId) {
    var posts = JSON.parse(localStorage.getItem('posts') || '[]');
    var post = posts.find(function(p) { return p.id === postId; });
    if (!post) return;
    
    if (!post.liked) {
      post.liked = true;
    } else {
      post.liked = false;
    }
    
    localStorage.setItem('posts', JSON.stringify(posts));
    showPosts();
  }

  function showPosts() {
    var posts = JSON.parse(localStorage.getItem('posts') || '[]');
    postsDiv.innerHTML = '';
    
    if (posts.length === 0) {
      postsDiv.innerHTML = '<div style="text-align:center;color:#666;padding:40px;">No posts yet. Be the first to share something!</div>';
      return;
    }
    
    posts.reverse().forEach(function(post) {
      var card = document.createElement('div');
      card.className = 'post-card';
      card.innerHTML =
        '<div class="post-header">' +
          '<img class="post-avatar" src="' + (post.profilePic || 'img/default-user.png') + '" />' +
          '<span class="post-user">' + (post.displayName || '') + '</span>' +
          '<span class="post-date">' + (post.date || '') + '</span>' +
        '</div>' +
        '<div class="post-content">' + post.content + '</div>' +
        (post.image ? '<img src="' + post.image + '" class="post-img" style="max-width:100%;margin-top:8px;border-radius:12px;" />' : '') +
        '<div class="post-actions" style="margin-top:12px;display:flex;align-items:center;gap:8px;">' +
          '<button onclick="toggleLike(' + post.id + ')" style="background:none;border:none;cursor:pointer;padding:4px;">' +
            '<img src="img/heart-icon.svg" style="width:20px;height:20px;opacity:' + (post.liked ? '1' : '0.5') + ';" />' +
          '</button>' +
          '<span style="color:#666;font-size:14px;">' + (post.liked ? '1' : '0') + '</span>' +
        '</div>';
      postsDiv.appendChild(card);
    });
  }

  window.toggleLike = toggleLike;

  showPosts();
}); 
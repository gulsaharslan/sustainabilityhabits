// Ana JavaScript dosyası 
// Blog yorumları (blog-detail.html için)
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('comment-form');
  const nameInput = document.getElementById('comment-name');
  const textInput = document.getElementById('comment-text');
  const commentsList = document.getElementById('comments-list');
  if (!form || !nameInput || !textInput || !commentsList) return;

  // Yorumları localStorage'dan yükle
  function loadComments() {
    commentsList.innerHTML = '';
    const comments = JSON.parse(localStorage.getItem('blogComments') || '[]');
    comments.forEach(function (c) {
      const li = document.createElement('li');
      li.className = 'mb-3 border-bottom pb-2';
      li.innerHTML = `<strong>${c.name}</strong> <span class="text-muted small ms-2">${c.date || ''}</span><br><span>${c.text}</span>`;
      commentsList.appendChild(li);
    });
  }

  // Yorum ekle
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    if (!name || !text) return;
    const now = new Date();
    const date = now.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const comments = JSON.parse(localStorage.getItem('blogComments') || '[]');
    comments.unshift({ name, text, date });
    localStorage.setItem('blogComments', JSON.stringify(comments));
    nameInput.value = '';
    textInput.value = '';
    loadComments();
  });

  loadComments();
}); 
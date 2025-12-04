import { LS_COMMENT_KEY } from './config.js';

export function initComments() {
  if (!localStorage.getItem(LS_COMMENT_KEY))
    localStorage.setItem(LS_COMMENT_KEY, JSON.stringify({}));
  const form = document.getElementById('comment-form');
  if (form)
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form['comment-name'].value.trim();
      const email = form['comment-email'].value.trim();
      const content = form['comment-content'].value.trim();
      if (!name || !email || !content) return;
      const blogId = 1; // 简化：当前查看的博客 id
      saveComment(blogId, { name, email, content, date: new Date().toISOString().slice(0, 10) });
      form.reset();
      loadComments(blogId);
    });
}

export function loadComments(blogId) {
  const data = JSON.parse(localStorage.getItem(LS_COMMENT_KEY)) || {};
  const list = document.getElementById('comments-list');
  const comments = data[blogId] || [];
  list.innerHTML = comments.length
    ? comments
        .map(
          c => `<div class="comment">
                  <div class="comment-header">
                    <span class="comment-author">${c.name}</span>
                    <span class="comment-date">${c.date}</span>
                  </div>
                  <p>${c.content}</p>
                </div>`
        )
        .join('')
    : '<p>暂无评论，快来发表第一条评论吧！</p>';
}

function saveComment(blogId, c) {
  const data = JSON.parse(localStorage.getItem(LS_COMMENT_KEY)) || {};
  if (!data[blogId]) data[blogId] = [];
  data[blogId].push(c);
  localStorage.setItem(LS_COMMENT_KEY, JSON.stringify(data));
}
import { blogData } from './config.js';
import { gotoPage } from './router.js';

const renderMarkdown = text =>
  text
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');

export function initBlogList() {
  const grid = document.getElementById('blog-grid');
  grid.innerHTML = '';
  blogData.forEach(post => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
      <img src="${post.image}" alt="">
      <div class="blog-content">
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <div class="blog-tags">${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="blog-date">${formatDate(post.date)}</div>
      </div>
    `;
    card.addEventListener('click', () => showBlogDetail(post.id));
    grid.appendChild(card);
  });
}

function showBlogDetail(id) {
  const post = blogData.find(p => p.id === id);
  if (!post) return;
  gotoPage('blog-detail');

  const article = document.getElementById('blog-article');
  article.innerHTML = `
    <h1>${post.title}</h1>
    <div class="blog-meta">
      <span class="blog-date">${formatDate(post.date)}</span>
      <div class="blog-tags">${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>
    <img src="${post.image}" style="width:100%;border-radius:8px;margin:1rem 0;">
    <div>${renderMarkdown(post.content)}</div>
  `;

  // 加载评论
  import('./comment.js').then(m => m.loadComments(id));
}

function formatDate(str) {
  const d = new Date(str);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

// 把 showBlogDetail 暴露给 router 的“返回”按钮
window.showBlogDetail = showBlogDetail;
// router.js - 版本3：最简方案
export function gotoPage(id) {
  document.querySelectorAll('.page-section').forEach(sec => 
    sec.classList.remove('active')
  );
  
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
  }
}

export function initRouter() {
  // 导航链接
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      gotoPage(link.getAttribute('href').slice(1));
    });
  });

  // 汉堡菜单
  const ham = document.getElementById('hamburger');
  const nav = document.getElementById('nav-menu');
  ham?.addEventListener('click', () => {
    ham.classList.toggle('active');
    nav.classList.toggle('active');
  });
  
  // 返回按钮
  document.getElementById('back-to-blog')?.addEventListener('click', () => 
    gotoPage('home')
  );
  
  // 初始页面（根据URL hash）
  const hash = window.location.hash.slice(1);
  gotoPage(hash || 'home');
}
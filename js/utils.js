// 表单验证 + 涟漪 + 成功/失败提示
export function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm)
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validateForm(contactForm)) return;
      showAlert('success');
      contactForm.reset();
    });
  // 涟漪
  document.addEventListener('click', e => {
    if (!e.target.classList.contains('btn')) return;
    const btn = e.target;
    const ripple = document.createElement('span');
    const r = Math.max(btn.clientWidth, btn.clientHeight);
    ripple.style.width = ripple.style.height = r + 'px';
    ripple.style.left = e.offsetX - r / 2 + 'px';
    ripple.style.top = e.offsetY - r / 2 + 'px';
    ripple.classList.add('ripple');
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

export function validateForm(form) {
  let ok = true;
  form.querySelectorAll('input, textarea').forEach(inp => {
    inp.classList.remove('error');
    if (inp.hasAttribute('required') && !inp.value.trim()) {
      inp.classList.add('error');
      ok = false;
    }
    if (inp.type === 'email' && inp.value) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(inp.value)) {
        inp.classList.add('error');
        ok = false;
      }
    }
    const min = inp.getAttribute('minlength');
    const max = inp.getAttribute('maxlength');
    if (min && inp.value.length < +min) {
      inp.classList.add('error');
      ok = false;
    }
    if (max && inp.value.length > +max) {
      inp.classList.add('error');
      ok = false;
    }
  });
  return ok;
}

function showAlert(type) {
  const box = document.getElementById(type === 'success' ? 'success-alert' : 'error-alert');
  box.style.display = 'block';
  setTimeout(() => (box.style.display = 'none'), 4000);
}
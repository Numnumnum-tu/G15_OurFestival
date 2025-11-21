// public/js/feedback.js


const btn = document.getElementById('sidebarToggle');
const backdrop = document.getElementById('drawerBackdrop');

function toggle() {
  document.body.classList.toggle('sidebar-open');
  const opened = document.body.classList.contains('sidebar-open');
  if (btn) btn.setAttribute('aria-expanded', String(opened));
}

if (btn) btn.addEventListener('click', toggle);
if (backdrop) backdrop.addEventListener('click', toggle);


const form = document.getElementById('feedbackForm');
const rating = document.getElementById('rating');
const ratingValue = document.getElementById('ratingValue');
const feedbackList = document.getElementById('feedbackList');
const resetBtn = document.getElementById('resetBtn');


rating.addEventListener('input', () => {
ratingValue.textContent = rating.value;
});


form.addEventListener('submit', async (e) => {
e.preventDefault();
const fd = new FormData(form);
const data = {
name: fd.get('name'),
gender: fd.get('gender'),
rating: fd.get('rating'),
like: fd.get('like'),
improve: fd.get('improve')
};


try {
const res = await fetch('/api/feedback', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data)
});
const json = await res.json();
if (json.ok) {
// show confirmation
showAlert('ส่งเรียบร้อย ขอบคุณสำหรับคำติชม!', 'success');
form.reset();
ratingValue.textContent = rating.value;
await loadRecentFeedbacks();
} else {
showAlert('เกิดข้อผิดพลาดในการส่ง โปรดลองอีกครั้ง', 'danger');
}
} catch (err) {
console.error(err);
showAlert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้', 'danger');
}
});


resetBtn.addEventListener('click', () => form.reset());


function showAlert(msg, type='info'){
const el = document.createElement('div');
el.className = `alert alert-${type} alert-dismissible fade show`;
el.role = 'alert';
el.innerHTML = `${msg} <button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
document.querySelector('.container').prepend(el);
setTimeout(() => {
try { el.classList.remove('show'); el.classList.add('hide'); } catch(e){}
}, 4000);
}


async function loadRecentFeedbacks(){
try {
const res = await fetch('/api/feedbacks');
const arr = await res.json();
// show last 5
const latest = arr.slice(-5).reverse();
if (!latest.length) {
feedbackList.innerHTML = '<p class="text-muted">ยังไม่มีความคิดเห็น</p>';
return;
}
const cards = latest.map(f => `
<div class="card mb-2">
<div class="card-body">
<div class="d-flex justify-content-between align-items-start">
<div>
<h5 class="card-title mb-1">${escapeHtml(f.name || 'ไม่ระบุ')}</h5>
<div class="small text-muted">${new Date(f.createdAt).toLocaleString()} • ${escapeHtml(f.gender || '')} • คะแนน: ${f.rating ?? ''}</div>
</div>
</div>
<p class="mt-3 mb-1"><strong>ชอบ:</strong> ${escapeHtml(f.like || '-')}</p>
<p class="mb-0"><strong>ปรับปรุง:</strong> ${escapeHtml(f.improve || '-')}</p>
</div>
</div>
`).join('\n');


r
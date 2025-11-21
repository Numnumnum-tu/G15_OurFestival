const btn = document.getElementById('sidebarToggle');
const backdrop = document.getElementById('drawerBackdrop');

function toggle() {
  document.body.classList.toggle('sidebar-open');
  const opened = document.body.classList.contains('sidebar-open');
  if (btn) btn.setAttribute('aria-expanded', String(opened));
}

if (btn) btn.addEventListener('click', toggle);
if (backdrop) backdrop.addEventListener('click', toggle);



document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);

    try {
      const resp = await fetch('save_feedback.php', {
        method: 'POST',
        body: fd
      });
      const data = await resp.json();
      if (data.ok) {
        alert('ขอบคุณ! แบบประเมินถูกบันทึกแล้ว');
        form.reset();
      } else {
        alert('เกิดปัญหา: ' + data.msg);
      }
    } catch (err) {
      console.error(err);
      alert('ไม่สามารถส่งข้อมูลได้ โปรดลองอีกครั้ง');
    }
  });
});
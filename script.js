const btn = document.getElementById('toggleBtn');
const reason = document.getElementById('reason');

btn.addEventListener('click', function () {
  if (reason.classList.contains('hidden')) {
    reason.classList.remove('hidden');
    btn.textContent = 'เหตุผลที่อยากเข้า DevPool ▲';
  } else {
    reason.classList.add('hidden');
    btn.textContent = 'เหตุผลที่อยากเข้า DevPool ▼';
  }
});

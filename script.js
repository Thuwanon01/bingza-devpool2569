const WEATHER_LABELS = {
  0: 'ท้องฟ้าแจ่มใส', 1: 'เมฆบางส่วน', 2: 'มีเมฆมาก', 3: 'ครึ้ม',
  45: 'หมอก', 48: 'หมอกหนัก',
  51: 'ฝนละออง', 53: 'ฝนละออง', 55: 'ฝนละออง',
  61: 'ฝนเบา', 63: 'ฝนปานกลาง', 65: 'ฝนหนัก',
  80: 'ฝนพรำ', 81: 'ฝนพรำ', 82: 'ฝนพรำหนัก',
  95: 'พายุฝนฟ้าคะนอง', 96: 'พายุลูกเห็บ', 99: 'พายุลูกเห็บ',
};

async function getWeather() {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast' +
      '?latitude=13.85097784961423&longitude=100.55748265228772' +
      '&current=temperature_2m,weathercode&timezone=Asia%2FBangkok'
    );
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    document.getElementById('weather-temp').textContent = data.current.temperature_2m + '°C';
    document.getElementById('weather-desc').textContent =
      WEATHER_LABELS[data.current.weathercode] ?? 'ไม่ทราบสภาพอากาศ';
  } catch {
    document.getElementById('weather-desc').textContent = 'โหลดไม่ได้';
  }
}
getWeather();

function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  document.getElementById('darkModeBtn').textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
function initDarkModeBtn() {
  const isDark = document.documentElement.classList.contains('dark');
  document.getElementById('darkModeBtn').textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}
document.getElementById('darkModeBtn').addEventListener('click', toggleDarkMode);
initDarkModeBtn();

const toggleBtn  = document.getElementById('toggleBtn');
const reasonBlock = document.getElementById('reasonDevpool');
const arrowSpan  = document.getElementById('toggleArrow');
toggleBtn.addEventListener('click', function () {
  const isHidden = reasonBlock.classList.toggle('hidden');
  arrowSpan.textContent = isHidden ? '▼' : '▲';
});


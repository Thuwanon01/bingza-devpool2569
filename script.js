// Weather codes จาก WMO standard ที่ Open-Meteo ใช้
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
      'https://api.open-meteo.com/v1/forecast?latitude=13.85097784961423&longitude=100.55748265228772&current=temperature_2m,weathercode&timezone=Asia%2FBangkok'
    );
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    const temp = data.current.temperature_2m;
    const code = data.current.weathercode;
    document.getElementById('weather-temp').textContent = `${temp}°C`;
    document.getElementById('weather-desc').textContent = WEATHER_LABELS[code] ?? 'ไม่ทราบสภาพอากาศ';
  } catch {
    document.getElementById('weather-desc').textContent = 'โหลดไม่ได้';
  }
}

getWeather();

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

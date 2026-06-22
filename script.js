// ============================================================
// WEATHER WIDGET
// ============================================================

// ตาราง: แปลง weather code (มาตรฐาน WMO) เป็นข้อความภาษาไทย
// Open-Meteo ส่งตัวเลขรหัสมา เราต้องแปลงเองเพราะ API ไม่ได้แปลให้
const WEATHER_LABELS = {
  0: 'ท้องฟ้าแจ่มใส', 1: 'เมฆบางส่วน', 2: 'มีเมฆมาก', 3: 'ครึ้ม',
  45: 'หมอก', 48: 'หมอกหนัก',
  51: 'ฝนละออง', 53: 'ฝนละออง', 55: 'ฝนละออง',
  61: 'ฝนเบา', 63: 'ฝนปานกลาง', 65: 'ฝนหนัก',
  80: 'ฝนพรำ', 81: 'ฝนพรำ', 82: 'ฝนพรำหนัก',
  95: 'พายุฝนฟ้าคะนอง', 96: 'พายุลูกเห็บ', 99: 'พายุลูกเห็บ',
};

// ดึงข้อมูลสภาพอากาศจาก Open-Meteo API (ฟรี ไม่ต้องใช้ API key)
// แล้วแสดงอุณหภูมิและสภาพอากาศใน weather widget มุมขวาบน
// async = ฟังก์ชันนี้ทำงานแบบ "รอผล API" โดยไม่บล็อก browser
async function getWeather() {
  try {
    // ส่ง HTTP GET ไปที่ Open-Meteo — พิกัด: กฟภ. สำนักงานใหญ่
    // await = รอจนกว่าจะได้ response กลับมา (browser ยังทำงานต่อได้ระหว่างรอ)
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=13.85097784961423&longitude=100.55748265228772&current=temperature_2m,weathercode&timezone=Asia%2FBangkok'
    );

    // fetch() ไม่ throw error เมื่อ server ตอบ 4xx/5xx
    // ต้องเช็ค res.ok เองว่า status code อยู่ในช่วง 200-299 ไหม
    if (!res.ok) throw new Error('API error');

    // แปลง response body จาก JSON text → JavaScript object
    const data = await res.json();

    const temp = data.current.temperature_2m; // อุณหภูมิ (°C)
    const code = data.current.weathercode;    // รหัสสภาพอากาศ WMO

    // อัปเดต HTML ทั้งสอง element ใน widget
    document.getElementById('weather-temp').textContent = `${temp}°C`;
    // ?? คือ nullish coalescing: ถ้า code ไม่มีในตาราง ให้ใช้ข้อความ fallback
    document.getElementById('weather-desc').textContent = WEATHER_LABELS[code] ?? 'ไม่ทราบสภาพอากาศ';
  } catch {
    // ถ้า network ล่ม หรือ API error — แสดงข้อความแทนการ crash
    document.getElementById('weather-desc').textContent = 'โหลดไม่ได้';
  }
}

// เรียกทันทีที่ script โหลด เพื่อแสดงอากาศตั้งแต่เปิดหน้า
getWeather();


// ============================================================
// DARK MODE TOGGLE
// ============================================================

// สลับระหว่าง dark mode และ light mode
// วิธีทำงาน: toggle class "dark" บน <html> element
// Tailwind อ่าน class นี้แล้วเปลี่ยนสีทุก element ที่มี dark: prefix
// บันทึกค่าลง localStorage เพื่อจำ preference ข้าม refresh
function toggleDarkMode() {
  const html = document.documentElement; // คือ <html> element ทั้งหน้า
  const btn = document.getElementById('darkModeBtn');

  // classList.toggle คืนค่า true ถ้าเพิ่ง add class, false ถ้าเพิ่ง remove
  const isDark = html.classList.toggle('dark');

  // เปลี่ยนข้อความปุ่มให้ตรงกับ mode ปัจจุบัน
  btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';

  // บันทึก preference ลง localStorage (เก็บไว้แม้ปิด browser)
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// อ่าน preference ที่บันทึกไว้ แล้วตั้งค่าข้อความปุ่มให้ตรงกับ state ปัจจุบัน
// (class "dark" บน <html> ถูก set ไว้แล้วจาก inline script ใน <head>)
function initDarkModeBtn() {
  const btn = document.getElementById('darkModeBtn');
  const isDark = document.documentElement.classList.contains('dark');
  btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// ผูก event: เมื่อกดปุ่ม dark mode → เรียก toggleDarkMode
document.getElementById('darkModeBtn').addEventListener('click', toggleDarkMode);

// ตั้งค่าข้อความปุ่มให้ตรงกับ state ตั้งแต่เริ่มโหลดหน้า
initDarkModeBtn();


// ============================================================
// TOGGLE เหตุผลที่อยากเข้า DevPool
// ============================================================

// ดึง reference ของ element ทั้งสองมาเก็บไว้ในตัวแปร
// เพื่อไม่ต้องค้นหาใน DOM ซ้ำทุกครั้งที่กดปุ่ม
const btn = document.getElementById('toggleBtn');
const reason = document.getElementById('reason');

// สลับการแสดง/ซ่อน section เหตุผล เมื่อกดปุ่ม
// ใช้ CSS class "hidden" (display: none) ของ Tailwind
// พร้อมเปลี่ยนลูกศรปุ่มให้ user รู้ว่า expand หรือ collapse
btn.addEventListener('click', function () {
  if (reason.classList.contains('hidden')) {
    // ถ้าซ่อนอยู่ → แสดง และเปลี่ยนลูกศรขึ้น
    reason.classList.remove('hidden');
    btn.textContent = 'เหตุผลที่อยากเข้า DevPool ▲';
  } else {
    // ถ้าแสดงอยู่ → ซ่อน และเปลี่ยนลูกศรลง
    reason.classList.add('hidden');
    btn.textContent = 'เหตุผลที่อยากเข้า DevPool ▼';
  }
});

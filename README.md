# Resume — ธุวานนท์ อรรถสุภาพงศ์

Portfolio / Resume เว็บไซต์ส่วนตัว สร้างด้วย HTML, Tailwind CSS และ Vanilla JavaScript ล้วน ๆ ไม่มี framework หรือ build tool

## 🔗 ลิงก์สำคัญ

| รายการ | ลิงก์ |
|--------|-------|
| **เว็บไซต์ (Vercel)** | https://bingza-portfo-devpool69.vercel.app/ |
| **Source Code (GitHub)** | https://github.com/Thuwanon01/bingza-devpool2569 |

---

## ✨ ฟีเจอร์ที่มีในโปรเจกต์

- **Dark Mode** — toggle ได้ บันทึกค่าไว้ใน `localStorage`
- **Weather Widget** — ดึงข้อมูลสภาพอากาศแบบ real-time ผ่าน Open-Meteo API
- **Responsive Design** — รองรับทั้งมือถือและ desktop ด้วย Tailwind breakpoint
- **Profile Image Hover** — hover แล้วสลับรูป, มี initials fallback กรณีรูปโหลดไม่ได้
- **Expandable Section** — กล่อง "เหตุผลที่สมัคร DevPool" ย่อ/ขยายได้

---

## 🗂️ โครงสร้างไฟล์

```
web-starter/
├── index.html      # หน้าเดียวทั้งหมด — โครงสร้าง + layout + style
├── script.js       # logic ทั้งหมด (dark mode, weather API, toggle)
└── assets/
    ├── profile.jpg     # รูปโปรไฟล์ปกติ
    └── profileugly.png # รูปสลับเมื่อ hover
```

---

## 🛠️ เทคโนโลยีที่ใช้

| เทคโนโลยี | วัตถุประสงค์ |
|-----------|------------|
| HTML5 | โครงสร้างหน้าเว็บ |
| [Tailwind CSS (CDN)](https://tailwindcss.com/) | Styling + Responsive + Dark mode |
| [Google Fonts — Sarabun](https://fonts.google.com/specimen/Sarabun) | Font ภาษาไทย |
| Vanilla JavaScript | Dark mode toggle, Weather API, DOM interaction |
| [Open-Meteo API](https://open-meteo.com/) | ข้อมูลสภาพอากาศ (ไม่ต้อง API key) |
| [Vercel](https://vercel.com/) | Hosting / Deploy |

---

## 🚀 รันในเครื่อง (Local)

ไม่มี dependency — เปิดไฟล์ได้เลย

```bash
# วิธีที่ 1: เปิดตรง ๆ
open index.html

# วิธีที่ 2: ใช้ VS Code Live Server (แนะนำ)
# ติดตั้ง extension "Live Server" แล้วคลิก "Go Live"

# วิธีที่ 3: Python local server
python3 -m http.server 3000
# แล้วเปิด http://localhost:3000
```

---

## 📝 หมายเหตุสำหรับผู้ตรวจ

- ทุก element ใน `index.html` มี comment อธิบายว่าแต่ละ attribute และ class ทำงานอย่างไร เพื่อแสดงความเข้าใจ HTML/CSS
- `script.js` อธิบายทุก step ของ logic ไว้ด้วยเช่นกัน
- โปรเจกต์นี้เป็นส่วนหนึ่งของ **DevPool69** — โปรแกรมฝึกงานสาย Web Dev

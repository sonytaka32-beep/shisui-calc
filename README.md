# Shisui Calc — Kalkulator Tema Mangekyou Shisui Uchiha

APK kalkulator Android (HTML/CSS/JS + Apache Cordova) dengan nuasa klan Uchiha:

- **Mangekyou Shisui** di atas layar — digambar CSS murni, berputar terus-menerus
- **Susanoo Hijau** aura glow di balik kalkulator, animasi napas halus
- **Uchiwa Clan Symbol** (kipas Uchiha) di bagian bawah
- Tema gelap merah Uchiha, angka hijau Susanoo, tombol responsif instan
- Fungsi lengkap: `+ − × ÷ % ± AC ⌫` desimal, keyboard fisik support
- **Zero lag** — ketuk tombol respons instan tanpa delay

---

## 📱 Preview

| Fitur | Deskripsi |
|-------|-----------|
| **Mangekyou** | 3 tomoe putar 20s, pupil green glow |
| **Susanoo** | Radial gradient hijau, static opacity |
| **Uchiwa** | SVG kipas clan Uchiha, semi-transparan |
| **Kalkulator** | Card merah gelap, border merah, accent line |
| **Tombol** | 84–90px tinggi, font 30–32px, gap 16–18px |
| **Display** | 100–110px tinggi, font 56–60px monospace |

---

## 📂 Struktur Proyek

```
shisui-calc/
├── index.html          # UI + Mangekyou + Uchiwa SVG
├── css/style.css       # Tema Uchiha, Susanoo, responsive
├── js/script.js        # Logika kalkulator (zero lag)
├── config.xml          # Cordova config (com.sonytaka32.shisuicalc)
├── .github/workflows/build-apk.yml  # Auto-build APK
└── package.json        # Metadata
```

---

## 🚀 Build APK Otomatis (Gratis via GitHub Actions)

1. **Fork/Clone** repo ini
2. **Push ke branch `main`** — workflow jalan otomatis
3. **Tunggu 2–3 menit** (download SDK + Cordova + build)
4. **Download APK** di tab **Actions → Artifacts → shisui-calc-debug-apk**

> APK hasil: `app-debug.apk` (debug, unsigned — untuk penggunaan pribadi)

---

## ⚙️ Kustomisasi

Edit warna di `css/style.css`:
```css
:root {
  --green: #00ff88;    /* Susanoo */
  --red: #8b0000;      /* Uchiha */
}
```
Push ke `main` → build APK baru otomatis jalan.

---

## 📦 Install di Android

1. Transfer `app-debug.apk` ke HP
2. Buka via File Manager → **Install**
3. Izinkan "Install from unknown apps" jika diminta

---

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3 (CSS-only animations), Vanilla JS
- **Mobile**: Apache Cordova 12 + Android 13
- **CI/CD**: GitHub Actions (ubuntu-latest, free for public repos)
- **Build**: Gradle 8.7 + Java 17

---

## 📄 Lisensi

MIT License — bebas dipakai, dimodifikasi, didistribusikan.

---

**Dibuat dengan ❤️ untuk fans Uchiha & Shisui**  
*Mangekyou Sharingan — "Kotoamatsukami"*
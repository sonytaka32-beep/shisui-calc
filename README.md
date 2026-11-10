# Shisui Calc — Kalkulator Tema Mangekyou Shisui Uchiha

APK kalkulator Android (HTML/CSS/JS + Apache Cordova) dengan nuasa klan Uchiha:

- **Mangekyou Shisui** di atas layar, digambar dengan CSS murni (tidak perlu gambar eksternal), berputar terus-menerus.
- **Susanoo Hijau** sebagai aura/glow di balik kalkulator.
- Tampilan gelap merah Uchiha, angka hijau Susanoo, tombol berkilau saat disentuh.
- Hitung tambah, kurang, kali, bagi, %, +/-, dan desimal.

## ⚠️ Catatan Keamanan

Token GitHub sebelumnya telah dicabut dan diganti. **Jangan pernah bagikan token ke siapa pun**, termasuk AI. Token baru hanya digunakan untuk push otomatis ini.

## Isi Proyek

| File | Fungsi |
|------|--------|
| `index.html` | Antarmuka kalkulator + Mangekyou Shisui (CSS) |
| `css/style.css` | Desain Uchiha, Susanoo hijau, animasi |
| `js/script.js` | Logika kalkulator |
| `config.xml` | Konfigurasi Cordova (package `com.sonytaka32.shisuicalc`) |
| `.github/workflows/build-apk.yml` | Pipeline GitHub Actions gratis yang build APK |
| `package.json` | Metadata proyek |

## Langkah Jadi APK di GitHub (Gratis)

### 1. Buat repositori di GitHub
Login ke https://github.com dengan akun **sonytaka32-beep**, lalu buat repositori baru, misal:

- Nama: `shisui-calc`
- Visibility: **Public** (GitHub Actions gratis untuk public repo)
- Jangan inisialisasi README (karena folder ini sudah lengkap).

### 2. Unggah file ke repositori
Pilih salah satu:

**A. Via browser (termudah):** di halaman repositori baru, klik "uploading an existing file", seret semua file dalam folder `shisui-calc/` ini (termasuk `.github/` dan file hidden), lalu **Commit changes**.

**B. Via git (komputer/laptop):**
```bash
cd /path/to/shisui-calc
git init
git add .
git commit -m "First build: Shisui Calc APK"
git branch -M main
git remote add origin https://github.com/sonytaka32-beep/shisui-calc.git
git push -u origin main
```
(Gunakan token **baru** yang belum dicabut jika Git meminta autentikasi.)

### 3. Aktifkan GitHub Actions
Masuk ke tab **Actions** di repositori Anda. Klik tombol hijau **"I understand my workflows, go ahead and enable them."** (satu kali saja).

### 4. Jalankan build APK
Masuk ke tab **Actions**, pilih workflow **"Build APK — Shisui Calc"**, klik **Run workflow** → pilih branch `main** → **Run workflow**.

Tunggu sampai selesai (beberapa menit: unduh Android SDK + Cordova + build).

### 5. Unduh APK
Di halaman hasil workflow (run), lihat bagian **Artifacts** di kanan bawah → unduh `shisui-calc-debug-apk`. Berisi file `app-debug.apk`.

### 6. Pasang di Android
Pindahkan `app-debug.apk` ke HP, buka paket file Manager, ketuk file → pilih **Install**. Saat pertama kali, aktifkan opsi **"Install from unknown apps"** dari sumber aplikasi yang Anda gunakan (browser/file manager).

> Catatan: ini APK **debug (tidak ditandatangani)**, cukup untuk penggunaan pribadi. Untuk Publish ke Play Store diperlukan keystone penandatanganan (release build).

## Edit Tampilan
Ulangi warna di `css/style.css` (`--green` untuk Susanoo, `--red` untuk Uchiha) atau ubah teks di `index.html`, lalu push ulang ke branch `main` — build APK baru akan berjalan otomatis melalui GitHub Actions.

---

Dibuat dengan HTML/CSS/JS murni, dibungkus Cordova, build otomatis di GitHub Actions (gratis).
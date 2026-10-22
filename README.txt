WEBSITE ULI BAKAR BANG PAR PAR — VERSI TERBARU

Penyesuaian:
- WhatsApp bisnis: 0813-8961-6959 (kode di script.js: 6281389616959)
- Pembayaran: Tunai dan QRIS
- Struk bisa dicetak lewat dialog cetak browser

MENJALANKAN LOKAL
1. Ekstrak ZIP.
2. Buka folder uli_bakar_website di VS Code.
3. Buka index.html dengan Chrome atau gunakan Live Server.
4. Tambahkan menu, isi nama, pilih Tunai/QRIS, lalu tekan Kirim pesanan ke WhatsApp.
5. WhatsApp terbuka dengan pesan terisi; pengguna tetap harus menekan Kirim.

MEMBUAT ONLINE DENGAN NETLIFY
1. Buka https://app.netlify.com/ dan masuk/daftar.
2. Ekstrak ZIP terlebih dahulu.
3. Dari dashboard Netlify, gunakan opsi deploy manual / drag and drop.
4. Unggah folder yang berisi index.html, style.css, dan script.js (atau unggah isi folder tersebut sesuai instruksi Netlify).
5. Setelah deploy, Netlify memberi alamat publik. Buka alamat itu dari HP untuk mengetes.
6. Untuk update, deploy ulang versi folder terbaru.

PEMBAYARAN
- Tunai: bayar saat ambil/terima pesanan.
- QRIS: pilihan akan ikut tercantum pada pesan order, tetapi website belum memverifikasi pembayaran. Gunakan QRIS resmi usaha; jangan gunakan QRIS contoh.
- Harga menu yang tersedia masih contoh, silakan edit array products di script.js.

PRINTER THERMAL BLUETOOTH
1. Coba pairing printer dari Windows Settings > Bluetooth & devices > Add device.
2. Jika printer tampil sebagai printer di Windows, klik Cetak struk lalu pilih printer tersebut.
3. Pilih kertas 58 mm atau 80 mm sesuai model printer jika tersedia.
4. Jika tidak muncul sebagai printer, cari driver/aplikasi dari merek printer. Sebagian printer Bluetooth Classic/SPP tidak dapat dicetak langsung oleh browser.
5. Layout struk saat ini sekitar 72 mm dan mungkin perlu disesuaikan setelah model printer diketahui.

BATASAN
Website ini statis, belum menyimpan pesanan di database atau menyediakan dashboard kasir. Untuk otomatisasi penuh, stok, dan verifikasi pembayaran perlu backend/database dan integrasi yang sesuai.

FILE
- index.html: struktur website
- style.css: desain dan format cetak
- script.js: menu, keranjang, WhatsApp, struk

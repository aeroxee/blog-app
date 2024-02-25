# Blog Client dengan Next.js

Selamat datang di repository Blog Client menggunakan Next.js! Proyek ini dirancang untuk memberikan landasan awal bagi pembuatan blog modern menggunakan Next.js, sebuah framework React yang powerful dan efisien.

## Panduan Penggunaan

### Prasyarat

1. Pastikan Node.js dan npm telah terinstal di komputer Anda.
2. Clone repositori ini ke lokal komputer Anda.

```bash
git clone https://github.com/nama-akun-anda/blog-client-nextjs.git
```
3. Proyek ini membutuhkan Server API. Silahkan clone [repo saya berikut ini](https://github.com/Aeroxee/blog-api)

### Instalasi

1. Buat file `.env`

```env
SERVER_API_URL = "http://ip_address:8000"
SERVER_API_HOST = "ip_address"
```

Sesuaikan dengan IP address anda.

2. Install dependensi

```bash
npm install

# Lalu instakk ckeditor custom build
npm install file:./custom-build-ckeditor
```

3. Jalankan server API.

4. Lalu build terlebih dahulu.

```bash
npm run build
```

5. Jalankan server.

```bash
npm run start
```

Server akan berjalan pada  `http:localhost:8000`

### Struktur Proyek

- app/: Berisi halaman-halaman utama dari aplikasi Next.js.
- components/: Tempat untuk menyimpan komponen React yang digunakan di seluruh aplikasi.
- public/: Direktori yang berisi aset statis seperti gambar.
- libs/: Adalah kumpulan fungsi untuk mengambil data ke server API.

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, Anda dapat melakukan langkah-langkah berikut:

1. Fork repositori ini.
2. Lakukan perubahan pada forked repository Anda.
3. Submit pull request dengan deskripsi yang jelas tentang perubahan yang Anda lakukan.

## Lisensi

Proyek ini dilisensikan di bawah lisensi MIT - lihat file LICENSE untuk detailnya.

Terima kasih telah menggunakan Blog Client dengan Next.js! Semoga proyek ini bermanfaat untuk pengembangan aplikasi blog Anda. Jangan ragu untuk memberikan masukan atau melaporkan isu jika Anda menemui kendala. Selamat berkoding!
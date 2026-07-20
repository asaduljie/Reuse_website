# TestSprite Automated Test Suite: ReUse Circular Economy Platform

Dokumen ini berisi skrip skenario pengujian otomatis end-to-end (E2E) untuk platform **ReUse** menggunakan **TestSprite**. TestSprite dapat menggunakan skrip ini untuk menelusuri, mengeksekusi, dan memvalidasi seluruh fitur utama situs web baik pada tampilan desktop maupun mobile.

---

## 1. Konfigurasi Lingkungan Pengujian (Test Configurations)

*   **URL Target (Dev Local)**: `http://localhost:3000`
*   **URL Target (Production)**: `https://reuse-website.vercel.app` (Sesuaikan dengan domain Vercel Anda)
*   **Akun Uji Coba Default**:
    *   **Customer/Pembeli**:
        *   Email: `amanda@example.com`
        *   Password: `password123`
    *   **Seller/Penjual**:
        *   Email: `seller@example.com`
        *   Password: `password123`
    *   **Admin/Super Admin**:
        *   Email: `admin@example.com`
        *   Password: `password123`

---

## 2. Skenario Uji 1: Registrasi Akun & Pengalihan Peran (Role Switching)

### Tujuan
Menguji fitur pendaftaran akun baru dengan memilih peran (Role) yang tepat menggunakan switch geser horizontal.

### Langkah-Langkah
1.  Buka URL `/register`.
2.  Verifikasi elemen-elemen berikut ada di layar:
    *   Input `Nama Lengkap`
    *   Input `Email`
    *   Input `Nomor HP`
    *   Input `Password`
    *   Switch Geser Peran dengan opsi **Customer** di kiri dan **Seller** di kanan.
3.  Isi data pendaftaran:
    *   Nama: `Budi Hartono`
    *   Email: `budi.hartono@example.com`
    *   Nomor HP: `081234567890`
    *   Password: `budiSecurePassword`
4.  **Uji Switch Geser (Role Selector)**:
    *   Secara default, switch menunjuk ke **Customer** (tombol Customer aktif berwarna putih dengan latar hijau gelap).
    *   Klik tombol **Seller** pada sisi kanan switch.
    *   Verifikasi kapsul latar belakang hijau bergeser secara mulus ke kanan menutupi kata "Seller", dan warna teks "Customer" berubah menjadi abu-abu.
5.  Klik tombol **Daftar Akun**.
6.  Verifikasi bahwa popup alert berbunyi `"Registrasi berhasil. Silakan login."` muncul dan pengguna diarahkan ke `/login`.

---

## 3. Skenario Uji 2: Autentikasi Login & Sesi Pengguna

### Tujuan
Memvalidasi proses masuk akun bagi Customer dan Seller ke halaman yang sesuai.

### Langkah-Langkah
1.  Buka URL `/login`.
2.  Isi formulir login dengan kredensial Customer (`amanda@example.com` / `password123`).
3.  Klik tombol **Login**.
4.  Verifikasi bahwa sistem berhasil masuk dan pengguna dialihkan ke halaman Beranda (`/`).
5.  Uji coba menu navigasi atas (Navbar): Klik menu profil di sudut kanan atas, klik **Logout**.
6.  Verifikasi sesi telah berakhir dan pengguna diarahkan kembali ke `/login`.

---

## 4. Skenario Uji 3: Penjelajahan Katalog, Pencarian & Filter Produk

### Tujuan
Memastikan pengguna dapat mencari, memfilter berdasarkan kategori, dan mengurutkan produk di katalog dengan benar.

### Langkah-Langkah
1.  Buka halaman katalog utama `/products`.
2.  Verifikasi input pencarian, dropdown kategori, dan dropdown urutan harga tampil dengan baik.
3.  **Pengujian Filter & Pencarian**:
    *   Ketik `"Sneakers"` pada input pencarian dan tekan **Enter** (atau tunggu filter bekerja).
    *   Verifikasi daftar produk yang muncul hanya produk yang mengandung kata "Sneakers".
    *   Pilih kategori `"Fashion"` pada dropdown kategori.
    *   Verifikasi katalog diperbarui dan hanya menampilkan produk kategori Fashion.
4.  **Pengujian Urutan (Sorting)**:
    *   Pilih opsi urutan `"Harga Terendah"`. Verifikasi urutan harga produk tampil dari yang paling murah ke yang paling mahal.
    *   Pilih opsi urutan `"Harga Tertinggi"`. Verifikasi urutan harga produk tampil dari yang paling mahal ke yang paling murah.
5.  **Pengujian Pagination**:
    *   Jika produk lebih dari 8, verifikasi tombol halaman `2`, `Next`, dan `Previous` aktif dan dapat diklik dengan perpindahan halaman yang tepat.

---

## 5. Skenario Uji 4: Halaman Detail Produk, AI Chatbot CS, & Wishlist

### Tujuan
Menguji fitur detail produk, interaksi widget asisten AI CS, dan penyimpanan item favorit ke wishlist.

### Langkah-Langkah
1.  Klik salah satu kartu produk di katalog (misalnya: `/products/3` - "Retro Sneakers Classy").
2.  Verifikasi informasi produk lengkap: Judul, kategori, harga, deskripsi, dan status ketersediaan.
3.  **Pengujian AI Chatbot CS (Asisten AI ReUse)**:
    *   Klik ikon mengambang AI Chatbot di sudut kanan bawah layar untuk membuka overlay widget chat.
    *   Ketik pesan: `"Apakah sepatu Retro Sneakers Classy ini kondisinya masih bagus?"` lalu kirim.
    *   Verifikasi AI memberikan balasan yang relevan secara otomatis.
    *   Klik ikon **Hapus Riwayat Chat** (tong sampah) di header chat. Verifikasi riwayat chat dibersihkan.
    *   Tutup widget chat AI.
4.  **Pengujian Wishlist (Tombol Love Bawah)**:
    *   Klik tombol **Wishlist** (berikon Love di samping tombol keranjang/beli).
    *   Verifikasi tombol berubah status menjadi aktif (berwarna merah menyala dengan tulisan **"Di Wishlist"**).
    *   Buka halaman `/wishlist` atau `/profile/wishlist`.
    *   Verifikasi bahwa produk "Retro Sneakers Classy" kini **berhasil tersimpan dan muncul** di dalam daftar wishlist Anda.
    *   Kembali ke halaman detail produk tadi, lalu klik kembali tombol **Di Wishlist**. Verifikasi tombol kembali berwarna abu-abu (tidak aktif).
    *   Buka kembali halaman `/wishlist`, verifikasi produk tersebut kini telah terhapus dari daftar.

---

## 6. Skenario Uji 5: Siklus Keranjang Belanja (Shopping Cart) & Transaksi

### Tujuan
Menguji penambahan produk ke keranjang, verifikasi ringkasan belanja, pengosongan keranjang, dan pengalihan checkout.

### Langkah-Langkah
1.  Buka detail produk dan klik tombol **Keranjang**.
2.  Verifikasi lencana hijau bertuliskan `"✓ Added"` atau ikon centang hijau muncul menandakan produk sukses masuk keranjang.
3.  Buka halaman keranjang belanja di `/cart`.
4.  Verifikasi item yang Anda pilih muncul di kolom daftar belanjaan lengkap dengan nama, gambar, harga satuan, dan subtotal.
5.  **Pengujian Ringkasan Belanja (Order Summary)**:
    *   Verifikasi perhitungan Total Item, Subtotal, Ongkir (Gratis), dan Total Harga bernilai benar sesuai produk di dalam keranjang.
6.  **Pengujian Checkout**:
    *   Klik tombol **Checkout**.
    *   Verifikasi sistem mengarahkan Anda ke halaman `/checkout`.
7.  **Pengujian Kosongkan Keranjang**:
    *   Kembali ke `/cart`. Klik tombol **Kosongkan Keranjang**.
    *   Verifikasi keranjang langsung dikosongkan secara instan, memicu tampilan `"Keranjang Masih Kosong"` dengan ilustrasi ikon troli kosong.

---

## 7. Skenario Uji 6: Dashboard Penjual (Seller Dashboard) & Kelola Produk

### Tujuan
Menguji fitur manajemen toko bagi penjual, mulai dari penambahan barang hingga pelacakan status pesanan.

### Langkah-Langkah
1.  Login menggunakan akun Seller (`seller@example.com` / `password123`).
2.  Arahkan peramban ke `/dashboard/seller`.
3.  Verifikasi grafik performa toko (Order Status Chart, Revenue Chart) dimuat dengan benar.
4.  **Tambah Produk Baru**:
    *   Klik menu **Kelola Produk** di sidebar, lalu klik tombol **Tambah Produk**.
    *   Isi nama produk: `"Vintage Leather Jacket Premium"`.
    *   Pilih kategori: `"Fashion"`.
    *   Masukkan harga: `350000`, stok: `1`, deskripsi lengkap produk.
    *   Unggah file gambar produk.
    *   Klik tombol **Simpan Produk**.
    *   Verifikasi produk baru tampil di tabel daftar produk.
5.  **Kelola Pesanan & Invoice Tanpa Pajak**:
    *   Klik menu **Kelola Pesanan** di sidebar.
    *   Pilih salah satu pesanan aktif, lalu klik tombol **Detail / Invoice**.
    *   Verifikasi tampilan pratinjau cetak invoice bersih: **TIDAK ada baris atau kolom Pajak (Tax = 0% atau dihapus sepenuhnya)**. Hanya menampilkan Subtotal, Ongkos Kirim, dan Total Pembayaran.
    *   Klik tombol **Ubah Status Pesanan** (Ubah menjadi "Diproses" atau "Dikirim"). Verifikasi status pesanan berhasil diperbarui secara instan.

---

## 8. Skenario Uji 7: Pemeriksaan Responsivitas Tampilan Mobile (Mobile Audit)

### Tujuan
Melakukan audit visual otomatis pada perangkat mobile (resolusi lebar layar 320px, 375px, dan 414px) untuk mendeteksi kegagalan tata letak (*offside*).

### Parameter Penilaian Keberhasilan (Assertions)
*   [ ] **Tidak Ada Luapan Horizontal (No Horizontal Scroll)**: Layar peramban mobile tidak boleh bergeser ke kanan. Semua elemen harus terbungkus rapi di dalam lebar viewport (`100vw`).
*   [ ] **Aesthetic Hamburger Sidebar Drawer**: Saat hamburger menu Navbar diklik di mobile, menu drawer hijau emerald harus muncul lancar dari sisi kanan/kiri tanpa merusak konten di belakangnya.
*   [ ] **Pusat Tombol Detail Produk**: Tiga tombol aksi di halaman detail produk (Wishlist, Keranjang, WhatsApp) harus tertumpuk rapi secara vertikal (`flex-col`), dengan ikon dan teks tepat berada di tengah tombol (*centered aligning*).
*   [ ] **AI Chatbot CS Scaling**: Kontainer obrolan AI CS pada mobile harus berukuran dinamis mengikuti viewport (`w-[calc(100vw-2.5rem)]`) sehingga tidak ada bagian teks chat atau tombol input yang meluber keluar layar ponsel.
*   [ ] **Frequently Bought Together Alignment**: Grid rekomendasi AI di bagian bawah keranjang belanja dan halaman detail harus tersusun rapat dalam format 2 kolom (`grid-cols-2`) yang proporsional di HP, bukan 1 kolom raksasa atau meluber ke samping.
*   [ ] **Seller Banner Card**: Banner "Punya Barang Layak Pakai?" di bagian bawah katalog harus menyusun teks dan gambarnya secara vertikal, teks rata tengah (*centered text*), dengan padding yang aman (`px-6 py-10`), dan ilustrasi gambar tidak menindih teks tombol aksi.

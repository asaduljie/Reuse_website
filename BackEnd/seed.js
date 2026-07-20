const { faker } = require("@faker-js/faker");
const db = require("./config/db");

// Categories list
const CATEGORIES = [
  { id: 1, name: "Elektronik" },
  { id: 2, name: "Fashion" },
  { id: 3, name: "Furniture" },
  { id: 4, name: "Accessories" },
  { id: 5, name: "Book" },
  { id: 6, name: "Sport" }
];

// Preloved-themed products generator
const PRODUCT_TEMPLATES = [
  { name: "iPhone 12 Pro Max 256GB Bekas", categoryId: 1, categoryName: "Elektronik", priceRange: [9000000, 11000000], desc: "Kondisi mulus 95%, Battery Health 82%, FaceID lancar, TrueTone aktif. Kelengkapan fullset oem." },
  { name: "MacBook Air M1 2020 Gray", categoryId: 1, categoryName: "Elektronik", priceRange: [8500000, 9500000], desc: "RAM 8GB, SSD 256GB. Kondisi mulus no minus layar jernih bebas whitespot. Battery Cycle Count 150." },
  { name: "Kamera Sony A6000 Mirrorless", categoryId: 1, categoryName: "Elektronik", priceRange: [4500000, 5200000], desc: "Fungsi normal 100%, autofokus lancar. Kelengkapan body, lensa kit, charger oem, strap, tas kamera." },
  { name: "iPad Air 4 64GB WiFi Only", categoryId: 1, categoryName: "Elektronik", priceRange: [5500000, 6200000], desc: "Kondisi fisik 90% bekas pemakaian wajar, icloud aman bebas riset. Tombol power & touchID aktif." },
  { name: "Jaket Parka Vintage Dickies", categoryId: 2, categoryName: "Fashion", priceRange: [180000, 320000], desc: "Size M fit L, warna hijau army pekat, saku aman semua. Bahan tebal tanpa sobek atau lubang." },
  { name: "Sepatu Converse Chuck 70s Black", categoryId: 2, categoryName: "Fashion", priceRange: [350000, 500000], desc: "Original size 41. Kondisi tapak tebal, minus pemakaian wajar di bagian insole. Tanpa box bawaan." },
  { name: "Kaos Oversize Uniqlo Airism Original", categoryId: 2, categoryName: "Fashion", priceRange: [80000, 120000], desc: "Warna putih bersih, size L. Kondisi terawat tanpa noda membandel atau robek. Jarang dipakai." },
  { name: "Kacamata Hitam RayBan Aviator", categoryId: 2, categoryName: "Fashion", priceRange: [600000, 900000], desc: "Kondisi 9/10, lensa bening tanpa baret. Kelengkapan leather case original & kain pembersih." },
  { name: "Meja Belajar Lipat Minimalis Kayu", categoryId: 3, categoryName: "Furniture", priceRange: [120000, 250000], desc: "Bahan kayu jati belanda kokoh. Kaki meja lipat besi stabil. Cocok untuk laptop dan belajar anak." },
  { name: "Kursi Kantor Ergonomis Informa", categoryId: 3, categoryName: "Furniture", priceRange: [400000, 650000], desc: "Busa tebal anti kempes, hidrolik naik turun berfungsi normal, roda lancar berputar. Sedikit debu pemakaian." },
  { name: "Rak Buku Kayu 4 Tingkat", categoryId: 3, categoryName: "Furniture", priceRange: [150000, 300000], desc: "Bahan kayu partikel tebal, kondisi 85% masih kokoh. Cocok untuk pajangan ruang tamu atau kamar." },
  { name: "Sofa Minimalis 2 Seater Cream", categoryId: 3, categoryName: "Furniture", priceRange: [900000, 1500000], desc: "Bahan kain kanvas berserat halus. Rangka kayu kokoh, kaki sofa kayu jati. Minus noda samar pemakaian." },
  { name: "Tas Ransel Kulit Fossil Bekas", categoryId: 4, categoryName: "Accessories", priceRange: [800000, 1400000], desc: "Kulit asli sangat lentur dan tebal. Zipper lancar, bagian dalam bersih tanpa robek. Produk autentik." },
  { name: "Jam Tangan Casio G-Shock DW-5600", categoryId: 4, categoryName: "Accessories", priceRange: [450000, 700000], desc: "Kondisi normal, water resistant aktif, tombol empuk, bezel original ada baret halus pemakaian." },
  { name: "Dompet Lipat Kulit Coach Leather", categoryId: 4, categoryName: "Accessories", priceRange: [500000, 850000], desc: "Model bifold leather warna coklat tua. Jahitan kokoh rapi, slot kartu aman tidak melar." },
  { name: "Novel Bumi Manusia - Pramoedya Ananta Toer", categoryId: 5, categoryName: "Book", priceRange: [40000, 75000], desc: "Penerbit Lentera Dipantara, kondisi kertas agak menguning wajar, halaman lengkap tanpa coretan." },
  { name: "Buku Sapiens Sejarah Singkat Manusia", categoryId: 5, categoryName: "Book", priceRange: [60000, 95000], desc: "Kondisi mulus bersampul mika plastik. Halaman bersih bebas lipatan atau coretan pena." },
  { name: "Kamus Bahasa Inggris Oxford Learner's", categoryId: 5, categoryName: "Book", priceRange: [100000, 180000], desc: "Edisi lengkap hardback. Kondisi sangat terawat, tebal tanpa robekan." },
  { name: "Raket Bulutangkis Yonex Voltric", categoryId: 6, categoryName: "Sport", priceRange: [300000, 550000], desc: "Tarikan senar 24 lbs. Kondisi frame aman no retak, hanya paintchip wajar pemakaian." },
  { name: "Sepeda Gunung Wimcycle 26 Inch", categoryId: 6, categoryName: "Sport", priceRange: [1200000, 1800000], desc: "Frame alloy ringan, gigi 21 speed operan lancar, rem pakem. Ban tebal siap gowes." },
  { name: "Jersey Vintage Manchester United 98/99", categoryId: 6, categoryName: "Sport", priceRange: [400000, 800000], desc: "Size L original Umbro, kondisi sponsor agak crack wajar usia, kain mulus tanpa pulls/snags." }
];

async function seed() {
  console.log("Memulai proses seeding database...");

  // Helpers to wrap query in Promise
  const queryAsync = (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  };

  try {
    // 1. Truncate tables using PostgreSQL cascade method
    console.log("Mengosongkan tabel lama...");
    await queryAsync("TRUNCATE TABLE order_items, orders, products RESTART IDENTITY CASCADE;");
    console.log("Tabel berhasil dikosongkan.");

    // 2. Seed Products
    console.log("Membuat data produk preloved...");
    for (let i = 0; i < PRODUCT_TEMPLATES.length; i++) {
      const template = PRODUCT_TEMPLATES[i];
      const price = faker.number.int({ min: template.priceRange[0], max: template.priceRange[1] });
      const slug = template.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      
      const insertSql = `
        INSERT INTO products (name, slug, description, price, stock, sold, image, category, status, seller_id, category_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      // Stock is always 1 for preloved items
      const stock = 1;
      const sold = faker.number.int({ min: 0, max: 1 });
      const image = `product${(i % 4) + 1}.jpg`; // maps to public/images/product1-4.jpg
      const status = sold === 1 ? "inactive" : "active"; // if sold, set inactive
      
      await queryAsync(insertSql, [
        template.name,
        slug,
        template.desc,
        price,
        stock,
        sold,
        image,
        template.categoryName,
        status,
        3, // Default seller_id
        template.categoryId
      ]);
    }
    console.log(`Berhasil menyisipkan ${PRODUCT_TEMPLATES.length} produk.`);

    // 3. Seed Orders & Order Items
    console.log("Membuat simulasi pesanan pelanggan...");
    
    // We will insert 5 mock orders
    for (let i = 1; i <= 5; i++) {
      const customerName = faker.person.fullName();
      const phone = faker.phone.number({ style: "national" });
      const address = faker.location.streetAddress() + ", " + faker.location.city();
      const note = faker.helpers.arrayElement(["Tolong dibungkus bubble wrap tebal.", "Kirim sore hari ya.", "Mohon dicek kembali sebelum dikirim.", ""]);
      
      // Pick a random product for this order
      const prodIndex = faker.number.int({ min: 0, max: PRODUCT_TEMPLATES.length - 1 });
      const prodTemplate = PRODUCT_TEMPLATES[prodIndex];
      const prodPrice = faker.number.int({ min: prodTemplate.priceRange[0], max: prodTemplate.priceRange[1] });
      
      const status = faker.helpers.arrayElement(["Completed", "Processing", "Pending"]);
      
      const insertOrderSql = `
        INSERT INTO orders (customerName, phone, address, note, total, totalItem, status, customer_id, seller_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const orderResult = await queryAsync(insertOrderSql, [
        customerName,
        phone,
        address,
        note,
        prodPrice, // total
        1, // totalItem
        status,
        4, // default customer_id
        3  // default seller_id
      ]);
      
      const orderId = orderResult.insertId;
      
      const insertOrderItemSql = `
        INSERT INTO order_items (order_id, product_id, name, price, qty, seller_id, category_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      await queryAsync(insertOrderItemSql, [
        orderId,
        prodIndex + 1, // product_id
        prodTemplate.name,
        prodPrice,
        1, // qty is locked to 1
        3, // seller_id
        prodTemplate.categoryId
      ]);
    }
    
    console.log("Simulasi pesanan berhasil dibuat.");
    console.log("PROSES SEEDING BERHASIL! Database ReUse terisi dengan data preloved canggih.");
    
  } catch (error) {
    console.error("Gagal melakukan seeding:", error);
  } finally {
    // Terminate mysql pool connection
    db.end();
  }
}

seed();

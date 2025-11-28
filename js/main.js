
// Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });


document.body.classList.add("skeleton-active");

// Buat skeleton otomatis untuk gambar & teks utama
const skeletonize = () => {
  document.querySelectorAll("img, h1, h2, h3, p, .product-card, .about-image, .testimonial-card, .contact-form")
    .forEach(el => {
      const skeleton = document.createElement("div");
      skeleton.className = "skeleton-box";
      skeleton.style.width = `${el.offsetWidth || 100}px`;
      skeleton.style.height = `${el.offsetHeight || 20}px`;
      el.style.visibility = "hidden";
      el.parentNode.insertBefore(skeleton, el);
    });
};

// Hapus skeleton setelah semua asset selesai load
window.addEventListener("load", () => {
  document.body.classList.remove("skeleton-active");
  document.querySelectorAll(".skeleton-box").forEach(s => {
    s.classList.add("skeleton-fade-out");
    setTimeout(() => s.remove(), 400);
  });
  document.querySelectorAll("img, h1, h2, h3, p, .product-card, .about-image, .testimonial-card, .contact-form")
    .forEach(el => el.style.visibility = "visible");
});

window.addEventListener("DOMContentLoaded", skeletonize);


        
        // Product filtering functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Here you would typically filter products
                // This is just a placeholder for the functionality
                console.log('Filtering by: ' + button.textContent);
            });
        });

        
// ====== MULTI SELECT + QUANTITY PER PRODUK ======
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("subject");
  const resultBox = document.querySelector(".product-search-results");
  const selectedContainer = document.getElementById("selectedProducts");
  const selectedItems = new Map(); // { namaProduk: quantity }

  // Ambil semua produk dari web
  const products = Array.from(document.querySelectorAll(".product-card")).map(card => {
    const title = card.querySelector(".product-title")?.textContent.trim();
    const img = card.querySelector("img")?.getAttribute("src");
    return { title, img };
  });

  // Menampilkan hasil pencarian
  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    resultBox.innerHTML = "";

    if (!query) {
      resultBox.style.display = "none";
      return;
    }

    const filtered = products.filter(p => p.title.toLowerCase().includes(query));
    if (filtered.length === 0) {
      resultBox.innerHTML = `<div class="product-result-item">No products found</div>`;
      resultBox.style.display = "block";
      return;
    }

    filtered.forEach(p => {
      const div = document.createElement("div");
      div.className = "product-result-item";
      div.innerHTML = `<img src="${p.img}" alt="${p.title}"><span>${p.title}</span>`;
      div.addEventListener("click", () => selectProduct(p.title));
      resultBox.appendChild(div);
    });

    resultBox.style.display = "block";
  });

  // Pilih produk dan tambahkan ke daftar
  function selectProduct(name) {
    if (selectedItems.has(name)) return; // hindari duplikat
    selectedItems.set(name, 1); // default quantity 1

    const tag = document.createElement("div");
    tag.className = "selected-tag";
    tag.innerHTML = `
      <span>${name}</span>
      <input type="number" min="1" value="1">
      <button type="button">&times;</button>
    `;

    // ubah quantity
    const qtyInput = tag.querySelector("input");
    qtyInput.addEventListener("input", () => {
      let val = parseInt(qtyInput.value);
      if (isNaN(val) || val < 1) val = 1;
      qtyInput.value = val;
      selectedItems.set(name, val);
    });

    // hapus produk
    tag.querySelector("button").addEventListener("click", () => {
      selectedItems.delete(name);
      tag.remove();
    });

    selectedContainer.appendChild(tag);
    input.value = "";
    resultBox.style.display = "none";
  }

  // Tutup hasil saat klik di luar
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".product-multiselect")) {
      resultBox.style.display = "none";
    }
  });

 // Fungsi untuk mendapatkan nomor telepon (dengan enkripsi sederhana) 6281319574154
  function getPhoneNumber() {
    // Enkripsi: base64 dari string yang dibalik
    const encoded = "NDUxNDc1OTEzMTgyNg==";
    return atob(encoded).split('').reverse().join('');
  }

  // Kirim ke WhatsApp
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all fields");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      const phoneNumber = getPhoneNumber(); // Ambil nomor telepon dari fungsi
      const productLines = Array.from(selectedItems.entries())
        .map(([product, qty]) => `- ${product}: ${qty} pcs`)
        .join("\n") || "Tidak ada produk dipilih";

      const whatsappMessage = 
`Halo! Saya ${name}.
Email: ${email}
Pesanan:
${productLines}

Alamat / Catatan:
${message}`;

      const encoded = encodeURIComponent(whatsappMessage);
      const waURL = `https://wa.me/${phoneNumber}?text=${encoded}`;
      window.open(waURL, "_blank");

      contactForm.reset();
      selectedContainer.innerHTML = "";
      selectedItems.clear();
    });
  }
});



        
        // Newsletter subscription
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = this.querySelector('input[type="email"]').value;
                
                if (!email) {
                    alert('Please enter your email address');
                    return;
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address');
                    return;
                }
                
                // If validation passes, show success message
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            });
        }


// Filter Script
const filterBtns = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const target = btn.getAttribute("data-target");

    productCards.forEach(card => {
      const tag = card.getAttribute("data-tag");

      if (target === "all" || target === tag) {
        // tampilkan
        card.classList.remove("hidden");
        setTimeout(() => card.classList.remove("hiding"), 10);
      } else {
        // sembunyikan dengan animasi
        card.classList.add("hiding");
        card.addEventListener(
          "transitionend",
          () => {
            if (card.classList.contains("hiding")) {
              card.classList.add("hidden");
            }
          },
          { once: true }
        );
      }
    });
  });
});

// search bar product
document.addEventListener("DOMContentLoaded", function () {
  const searchToggle = document.querySelector(".search-toggle");
  const searchBar = document.querySelector(".search-bar");
  const searchInput = document.getElementById("searchInput");
  const searchClose = document.getElementById("searchClose");
  const searchResults = document.getElementById("searchResults");
  const productCards = document.querySelectorAll(".product-card");
  const productSection = document.getElementById("products");

  // Toggle search bar
  searchToggle.addEventListener("click", function (e) {
    e.preventDefault();
    if (searchBar.style.display === "none" || searchBar.style.display === "") {
      searchBar.style.display = "block";
      searchInput.focus();
    } else {
      hideSearchBar();
    }
  });

  // Close button
  searchClose.addEventListener("click", hideSearchBar);

  function hideSearchBar() {
    searchBar.style.display = "none";
    searchInput.value = "";
    searchResults.innerHTML = "";
  }

  // Render results
  function renderResults(query) {
    searchResults.innerHTML = "";
    if (!query) return;

    let found = 0;
    productCards.forEach((card) => {
      const title = card.querySelector(".product-title").textContent;
      const desc = card.querySelector(".product-desc").textContent;
      const imgSrc = card.querySelector("img").getAttribute("src");
      const match =
        title.toLowerCase().includes(query) || desc.toLowerCase().includes(query);

      if (match) {
        found++;
        const item = document.createElement("div");
        item.classList.add("result-item");
        item.innerHTML = `
          <img src="${imgSrc}" alt="${title}">
          <span>${title}</span>
        `;
        item.addEventListener("click", () => {
          hideSearchBar();
          card.scrollIntoView({ behavior: "smooth", block: "center" });
          card.classList.add("highlight");
          setTimeout(() => card.classList.remove("highlight"), 1500);
        });
        searchResults.appendChild(item);
      }
    });

    if (found === 0) {
      searchResults.innerHTML =
        `<div class="result-item"><span>No products found</span></div>`;
    }
  }

  // Typing filter
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    renderResults(query);
  });

  // Enter hides bar & scrolls
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      hideSearchBar();
      if (productSection) {
        productSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// footer data target
document.addEventListener("DOMContentLoaded", () => {
  const footerLinks = document.querySelectorAll('.footer-links a[data-target]');

  footerLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const targetTag = link.dataset.target.toLowerCase(); // bikin lowercase biar gak sensitif
      const product = document.querySelector(`.product-card[data-tag="${targetTag}"]`);

      if (product) {
        const yOffset = -80; // offset kalau ada header fixed
        const y = product.getBoundingClientRect().top + window.pageYOffset + yOffset;

        // Scroll halus ke produk
        window.scrollTo({
          top: y,
          behavior: "smooth"
        });

        // Efek highlight produk biar jelas
        product.classList.add("highlight");
        setTimeout(() => product.classList.remove("product-card.highlight"), 1500);
      } else {
        console.warn(`Produk dengan data-tag="${targetTag}" tidak ditemukan.`);
      }
    });
  });
});





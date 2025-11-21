// Product filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Show/hide products based on filter
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Product detail modals (would be implemented in a real application)
    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach(image => {
        image.addEventListener('click', () => {
            // In a real application, this would open a modal with product details
            const productName = image.closest('.product-card').querySelector('h3').textContent;
            showNotification(`Viewing details for ${productName}`);
        });
    });
});



// dark sistem muncul ke permukaan web

document.addEventListener('DOMContentLoaded', () => {
  // ambil tombol yang data-target="ds"
  const button = document.querySelector('.filter-btn[data-target="ds"]');

  // kalau tombol ditemukan
  if (button) {
    button.addEventListener('click', () => {
      // ambil semua elemen yang punya data-tag="ds"
      const dsItems = document.querySelectorAll('[data-tag="ds"]');

      // loop tiap elemen dan tampilkan (hapus atribut hidden)
      dsItems.forEach(item => {
        item.removeAttribute('hidden');
      });

      // opsional: sembunyikan tombol setelah diklik
      // button.hidden = true;
    });
  }
});


// warning ABV for Product
document.querySelectorAll('.product-badge-ABV').forEach(badge => {
  const abv = parseFloat(badge.dataset.abv);
  
  if (abv <= 4) {
    badge.classList.add('abv-low');
  } else if (abv <= 5.5) {
    badge.classList.add('abv-medium');
  } else {
    badge.classList.add('abv-high');
  }
});




// testimonial js
const track = document.querySelector(".testimonial-track");
const cards = document.querySelectorAll(".testimonial-card");
const dotsContainer = document.querySelector(".dots");

let index = 0;
const total = cards.length;

/* Create dots */
cards.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => moveTo(i));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

/* Update UI */
function updateSlider() {
    track.style.transform = `translateX(-${index * (cards[0].offsetWidth + 20)}px)`;

    cards.forEach((c, i) => c.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

/* Move to index */
function moveTo(i) {
    index = i;
    updateSlider();
}

/* Autoplay */
function autoPlay() {
    index = (index + 1) % total;
    updateSlider();
}

setInterval(autoPlay, 3000);  // 3 seconds autoplay

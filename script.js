// ============================================
// Page Title Scrolling Effect with Auto-Detection
// ============================================

// Function to detect which page we're on
function getPageTitle() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';

    // Map filenames to titles
    const titles = {
        'index.html': 'Welcome to my page! ',
        'about.html': 'About Me ',
        'blog.html': 'My Blog ',
        'contact.html': 'Contact Me ',
        'portfolio.html': 'My Portfolio ',
        'projects.html': 'My Projects ',
    };

    // Default fallback
    return titles[filename] || 'Carolyn Zeng';
}

let title = getPageTitle();
let position = 0;

function scrolltitle() {
    document.title = title.substring(position, title.length) + title.substring(0, position);
    position++;
    if (position > title.length) position = 0;
    titleScroll = window.setTimeout(scrolltitle, 170);
}

// ============================================
// Slideshow Functionality
// ============================================
let slideshowStates = {};

// Initialize all slideshows on the page
function initSlideshows() {
    const slideshows = document.querySelectorAll('.slideshow-container');
    slideshows.forEach(slideshow => {
        const id = slideshow.id;
        const slides = slideshow.querySelectorAll('.slide');
        if (slides.length > 0) {
            slideshowStates[id] = {
                currentIndex: 0,
                totalSlides: slides.length
            };
            // Hide all slides except first
            slides.forEach((slide, i) => {
                slide.style.display = i === 0 ? 'block' : 'none';
            });
            // Show caption for first slide
            updateCaption(id);
        }
    });
}

// Change slides for a specific slideshow
function changeSlides(slideshowId, n) {
    if (!slideshowStates[slideshowId]) {
        const slideshow = document.getElementById(slideshowId);
        const slides = slideshow.querySelectorAll('.slide');
        slideshowStates[slideshowId] = {
            currentIndex: 0,
            totalSlides: slides.length
        };
    }

    const state = slideshowStates[slideshowId];
    const slideshow = document.getElementById(slideshowId);
    const slides = slideshow.querySelectorAll('.slide');

    // Hide current slide
    slides[state.currentIndex].style.display = 'none';

    // Update index
    state.currentIndex += n;
    if (state.currentIndex >= state.totalSlides) state.currentIndex = 0;
    if (state.currentIndex < 0) state.currentIndex = state.totalSlides - 1;

    // Show new slide
    slides[state.currentIndex].style.display = 'block';

    // Update caption
    updateCaption(slideshowId);
}

// Update caption for a slideshow
function updateCaption(slideshowId) {
    const state = slideshowStates[slideshowId];
    const slideshow = document.getElementById(slideshowId);
    const slides = slideshow.querySelectorAll('.slide');
    const captionElement = document.getElementById(slideshowId + '-caption');

    if (captionElement && slides[state.currentIndex]) {
        const img = slides[state.currentIndex].querySelector('img');
        if (img && img.getAttribute('data-caption')) {
            captionElement.innerHTML = img.getAttribute('data-caption');
        } else if (img && img.alt) {
            captionElement.innerText = img.alt;
        }
    }
}

// ============================================
// Image Gallery Lightbox (for image-gallery class)
// ============================================
function openSlideshow(galleryId) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) {
        console.error('Gallery not found:', galleryId);
        return;
    }

    const images = gallery.querySelectorAll('img');
    if (images.length === 0) {
        console.error('No images in gallery:', galleryId);
        return;
    }

    let imageUrls = [];
    let imageAlts = [];
    images.forEach(img => {
        imageUrls.push(img.src);
        imageAlts.push(img.alt || 'Image');
    });

    let currentIndex = 0;

    // Create modal
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.95)';
    modal.style.zIndex = '9999';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';

    // Main image
    const mainImg = document.createElement('img');
    mainImg.src = imageUrls[currentIndex];
    mainImg.style.maxWidth = '90%';
    mainImg.style.maxHeight = '80%';
    mainImg.style.objectFit = 'contain';
    mainImg.style.margin = '20px';

    // Caption
    const caption = document.createElement('div');
    caption.textContent = imageAlts[currentIndex];
    caption.style.color = 'white';
    caption.style.marginTop = '10px';
    caption.style.fontFamily = 'sans-serif';
    caption.style.fontSize = '14px';
    caption.style.textAlign = 'center';
    caption.style.maxWidth = '80%';

    // Counter
    const counter = document.createElement('div');
    counter.textContent = `${currentIndex + 1} / ${imageUrls.length}`;
    counter.style.color = '#aaa';
    counter.style.marginTop = '8px';
    counter.style.fontSize = '12px';
    counter.style.fontFamily = 'sans-serif';

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '❮';
    prevBtn.style.position = 'absolute';
    prevBtn.style.left = '20px';
    prevBtn.style.fontSize = '40px';
    prevBtn.style.background = 'none';
    prevBtn.style.border = 'none';
    prevBtn.style.color = 'white';
    prevBtn.style.cursor = 'pointer';
    prevBtn.style.zIndex = '10000';
    prevBtn.style.padding = '20px';
    prevBtn.onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
        mainImg.src = imageUrls[currentIndex];
        caption.textContent = imageAlts[currentIndex];
        counter.textContent = `${currentIndex + 1} / ${imageUrls.length}`;
    };

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = '❯';
    nextBtn.style.position = 'absolute';
    nextBtn.style.right = '20px';
    nextBtn.style.fontSize = '40px';
    nextBtn.style.background = 'none';
    nextBtn.style.border = 'none';
    nextBtn.style.color = 'white';
    nextBtn.style.cursor = 'pointer';
    nextBtn.style.zIndex = '10000';
    nextBtn.style.padding = '20px';
    nextBtn.onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % imageUrls.length;
        mainImg.src = imageUrls[currentIndex];
        caption.textContent = imageAlts[currentIndex];
        counter.textContent = `${currentIndex + 1} / ${imageUrls.length}`;
    };

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✖';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '20px';
    closeBtn.style.right = '30px';
    closeBtn.style.fontSize = '30px';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.zIndex = '10000';
    closeBtn.onclick = () => modal.remove();

    // Keyboard navigation
    const keyHandler = (e) => {
        if (!modal.isConnected) {
            document.removeEventListener('keydown', keyHandler);
            return;
        }
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
            mainImg.src = imageUrls[currentIndex];
            caption.textContent = imageAlts[currentIndex];
            counter.textContent = `${currentIndex + 1} / ${imageUrls.length}`;
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % imageUrls.length;
            mainImg.src = imageUrls[currentIndex];
            caption.textContent = imageAlts[currentIndex];
            counter.textContent = `${currentIndex + 1} / ${imageUrls.length}`;
        } else if (e.key === 'Escape') {
            modal.remove();
        }
    };
    document.addEventListener('keydown', keyHandler);

    // Close modal when clicking background
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };

    modal.appendChild(closeBtn);
    modal.appendChild(prevBtn);
    modal.appendChild(nextBtn);
    modal.appendChild(mainImg);
    modal.appendChild(caption);
    modal.appendChild(counter);

    document.body.appendChild(modal);
}

// ============================================
// Scroll to Top Function
// ============================================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// Initialize Everything on Page Load
// ============================================
window.onload = function() {
    // Start the scrolling title effect
    scrolltitle();

    // Initialize all slideshows
    initSlideshows();
};
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const banners = document.querySelectorAll('.hero-banner');
let currentBannerIndex = 0;
let autoChangeInterval;
let restartTimeout; // To hold the timeout ID

function showBanner(index) {
  banners.forEach((banner, i) => {
    banner.classList.remove('active', 'zoomed'); // Remove both active and zoomed from all
    if (i === index) {
      banner.classList.add('active');
    }
  });
}

function nextBanner() {
  currentBannerIndex = (currentBannerIndex + 1) % banners.length;
  showBanner(currentBannerIndex);
  // Delay adding 'zoomed' until after the opacity transition has largely completed
  setTimeout(() => {
    banners[currentBannerIndex].classList.add('zoomed');
  }, 300); // 800ms, slightly less than the 1s opacity transition
}

function startAutoChange() {
  // Clear any existing interval before starting a new one
  clearInterval(autoChangeInterval);
  autoChangeInterval = setInterval(nextBanner, 7000);
}

function handleManualChange() {
  // Stop the automatic slide progression
  clearInterval(autoChangeInterval);
  // Clear any pending restart of auto-slide
  clearTimeout(restartTimeout);

  // Stop the zoom animation on the currently active banner immediately
  banners[currentBannerIndex].classList.remove('zoomed');

  // Restart the zoom animation on the current banner and auto-slide after 4 seconds
  restartTimeout = setTimeout(() => {
    banners[currentBannerIndex].classList.add('zoomed'); // Add zoomed back after pause
    startAutoChange();
  }, 4000); // Increased pause time for zoom effect and auto-slide
}

leftArrow.addEventListener('click', () => {
  currentBannerIndex = (currentBannerIndex - 1 + banners.length) % banners.length;
  showBanner(currentBannerIndex);
  handleManualChange(); // Handle the pause/resume logic
  leftArrow.classList.add('blink');
  setTimeout(() => {
    leftArrow.classList.remove('blink');
  }, 200);
});

rightArrow.addEventListener('click', () => {
  currentBannerIndex = (currentBannerIndex + 1) % banners.length;
  showBanner(currentBannerIndex);
  handleManualChange(); // Handle the pause/resume logic
  rightArrow.classList.add('blink');
  setTimeout(() => {
    rightArrow.classList.remove('blink');
  }, 200);
});

const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const menuToggle = document.getElementById('menu-toggle-sidebar');
const sidebarIcons = document.querySelectorAll('.sidebar-icon');

if (menuToggle && sidebar && mainContent) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('expanded');
    mainContent.classList.toggle('expanded');
  });
}

sidebarIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    // Only apply active class to desktop sidebar icons
    if (icon.closest('.sidebar')) {
      sidebarIcons.forEach(item => {
        if (item.closest('.sidebar')) {
          item.classList.remove('active');
        }
      });
      icon.classList.add('active');
    }
  });
});

// Set the first relevant sidebar icon (Home) as active on load for desktop sidebar
const homeIcon = document.querySelector('.sidebar .fa-home');
if (homeIcon) {
  homeIcon.closest('.sidebar-icon').classList.add('active');
}

// Show the first banner initially
showBanner(currentBannerIndex);
banners[currentBannerIndex].classList.add('zoomed'); // Add zoomed to the initial banner

// Start the automatic banner change
startAutoChange();

const newThisWeekArrow = document.querySelector('.new-this-week-arrow');
const newThisWeekRow = document.querySelector('.card-row');

if (newThisWeekArrow && newThisWeekRow) {
  newThisWeekArrow.addEventListener('click', () => {
    newThisWeekRow.scrollBy({ left: 400, behavior: 'smooth' });
  });
}

// Auto-scroll for card-row
const cardRow = document.querySelector('.card-row');

if (cardRow) {
  let scrollAmount = 0;
  const scrollStep = 200; // Adjust this value to control how much it scrolls each time
  let scrollInterval;

  const startScrolling = () => {
    clearInterval(scrollInterval);
    scrollAmount = cardRow.scrollLeft; // Initialize scrollAmount with current scroll position
    scrollInterval = setInterval(() => {
      scrollAmount += scrollStep;
      if (scrollAmount >= cardRow.scrollWidth - cardRow.clientWidth) {
        scrollAmount = 0; // Reset to beginning if end is reached
      }
      cardRow.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }, 2000); // Scroll every 2 seconds
  };

  const stopScrolling = () => {
    clearInterval(scrollInterval);
  };

  cardRow.addEventListener('mouseenter', stopScrolling);
  cardRow.addEventListener('mouseleave', startScrolling);
  cardRow.addEventListener('touchstart', stopScrolling); // Add for mobile
  cardRow.addEventListener('touchend', startScrolling);   // Add for mobile

  if (newThisWeekArrow) {
    newThisWeekArrow.addEventListener('mouseenter', stopScrolling);
    newThisWeekArrow.addEventListener('mouseleave', () => {
      startScrolling();
    });
  }

  startScrolling();
}

const categoryArrow = document.querySelector('.category-arrow');
const categoryGrid = document.querySelector('.category-grid');

if (categoryArrow && categoryGrid) {
    categoryArrow.addEventListener('click', () => {
        categoryGrid.scrollBy({ left: 400, behavior: 'smooth' });
    });
}

// Auto-scroll for category-grid (Ping-Pong style)
if (categoryGrid) {
    let scrollAmount = 0;
    const scrollStep = 600;
    let scrollInterval;
    let scrollDirection = 'forward'; // 'forward' or 'backward'

    const startScrolling = () => {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(() => {
            // Determine next scroll position based on direction
            if (scrollDirection === 'forward') {
                scrollAmount += scrollStep;
            } else {
                scrollAmount -= scrollStep;
            }

            // Reverse direction if boundaries are reached
            if (scrollAmount >= categoryGrid.scrollWidth - categoryGrid.clientWidth) {
                scrollAmount = categoryGrid.scrollWidth - categoryGrid.clientWidth; // Clamp to end
                scrollDirection = 'backward';
            } else if (scrollAmount <= 0) {
                scrollAmount = 0; // Clamp to start
                scrollDirection = 'forward';
            }

            categoryGrid.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }, 2000);
    };

    const stopScrolling = () => {
        clearInterval(scrollInterval);
    };

    categoryGrid.addEventListener('mouseenter', stopScrolling);
    categoryGrid.addEventListener('mouseleave', startScrolling);
    categoryGrid.addEventListener('touchstart', stopScrolling); // Add for mobile
    categoryGrid.addEventListener('touchend', startScrolling);   // Add for mobile

    if (categoryArrow) {
        categoryArrow.addEventListener('mouseenter', stopScrolling);
        categoryArrow.addEventListener('mouseleave', startScrolling);
    }

    startScrolling();
}

// Mobile Sidebar Logic
const menuIcon = document.getElementById("menu-icon");
const mobileSidebar = document.getElementById("mobile-sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const genre = document.getElementById("genre");

if (menuIcon && mobileSidebar && sidebarOverlay) {
    menuIcon.addEventListener("click", () => {
        mobileSidebar.classList.toggle("open");
        sidebarOverlay.classList.toggle("visible");
    });

    sidebarOverlay.addEventListener("click", () => {
        mobileSidebar.classList.remove("open");
        sidebarOverlay.classList.remove("visible");
    });
}

if (genre) {
    genre.addEventListener("click", (e) => {
        e.preventDefault();
        genre.classList.toggle("open");
    });
}

document.addEventListener("click", (e) => {
    if (mobileSidebar && menuIcon && sidebarOverlay) {
        if (mobileSidebar.classList.contains("open") && !mobileSidebar.contains(e.target) && !menuIcon.contains(e.target)) {
            mobileSidebar.classList.remove("open");
            sidebarOverlay.classList.remove("visible");
        }
    }
});

document.addEventListener('touchstart', (e) => {
    const rippleSize = Math.max(window.innerWidth, window.innerHeight) * 0.07; // Base size

    // Main ripple
    const mainRipple = document.createElement('div');
    mainRipple.classList.add('touch-ripple', 'main-ripple');
    document.body.appendChild(mainRipple);
    mainRipple.style.width = mainRipple.style.height = `${rippleSize}px`;
    mainRipple.style.left = `${e.touches[0].clientX - rippleSize / 2}px`;
    mainRipple.style.top = `${e.touches[0].clientY - rippleSize / 2}px`;
    mainRipple.addEventListener('animationend', () => {
        mainRipple.remove();
    });

    // Inner ripple (simulating a splash)
    const innerRipple = document.createElement('div');
    innerRipple.classList.add('touch-ripple', 'inner-ripple');
    document.body.appendChild(innerRipple);
    const innerRippleSize = rippleSize * 0.7; // Smaller
    innerRipple.style.width = innerRipple.style.height = `${innerRippleSize}px`;
    innerRipple.style.left = `${e.touches[0].clientX - innerRippleSize / 2}px`;
    innerRipple.style.top = `${e.touches[0].clientY - innerRippleSize / 2}px`;
    innerRipple.addEventListener('animationend', () => {
        innerRipple.remove();
    });
});

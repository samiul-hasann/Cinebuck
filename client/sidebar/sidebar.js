function initializeSidebar() {
    // Existing sidebar toggle logic
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const menuToggle = document.getElementById('menu-toggle-sidebar');
    if (menuToggle && sidebar && mainContent) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('expanded');
        mainContent.classList.toggle('expanded');
      });
    }

    // Existing active icon logic
    const sidebarIcons = document.querySelectorAll('.sidebar-icon');
    sidebarIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {
        if (e.currentTarget.classList.contains('genre-toggle') || e.currentTarget.classList.contains('search-container')) return;
        if (icon.closest('.sidebar')) {
          sidebarIcons.forEach(item => item.classList.remove('active'));
          icon.classList.add('active');
        }
      });
    });
    const homeIcon = document.querySelector('.sidebar .fa-home');
    if (homeIcon) {
      homeIcon.closest('.sidebar-icon').classList.add('active');
    }

    // --- NEW SEARCH LOGIC ---

    const desktopSearchInput = document.getElementById('sidebar-search-input');
    const desktopSuggestions = document.getElementById('desktop-search-suggestions');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const mobileSuggestions = document.getElementById('mobile-search-suggestions');

    // Debounce function
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const handleSearch = async (query, suggestionsContainer) => {
        if (!query) {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const results = await response.json();
            
            suggestionsContainer.innerHTML = '';
            if (results.length > 0) {
                results.forEach(movie => {
                    const a = document.createElement('a');
                    a.href = `/client/down/down.html?id=${movie.id}`;
                    a.textContent = movie.title;
                    suggestionsContainer.appendChild(a);
                });
                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.style.display = 'none';
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            suggestionsContainer.style.display = 'none';
        }
    };

    const debouncedSearch = debounce(handleSearch, 300);

    if (desktopSearchInput && desktopSuggestions) {
        desktopSearchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value, desktopSuggestions);
        });
    }

    if (mobileSearchInput && mobileSuggestions) {
        mobileSearchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value, mobileSuggestions);
        });
    }
    
    // Expand sidebar on search icon click
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer && sidebar) {
        searchContainer.addEventListener('click', () => {
            if (!sidebar.classList.contains('expanded')) {
                sidebar.classList.add('expanded');
                mainContent.classList.add('expanded');
                setTimeout(() => desktopSearchInput.focus(), 150);
            }
        });
    }

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (desktopSuggestions && !e.target.closest('.search-container')) {
            desktopSuggestions.style.display = 'none';
        }
        if (mobileSuggestions && !e.target.closest('.mobile-search-container')) {
            mobileSuggestions.style.display = 'none';
        }
    });


    // --- END OF NEW SEARCH LOGIC ---

    // Existing mobile sidebar logic
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
            if (e.target.closest('a').parentElement.id === 'genre') {
              e.preventDefault();
              genre.classList.toggle("open");
            }
        });
    }
}
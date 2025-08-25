document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    if (searchQuery) {
        const normalizedQuery = searchQuery.toLowerCase().trim();
        const movieItems = document.querySelectorAll('.movie-item');
        
        movieItems.forEach(item => {
            const movieTitleElement = item.querySelector('p');
            if (movieTitleElement) {
                const movieTitle = movieTitleElement.innerText.toLowerCase();
                if (movieTitle.includes(normalizedQuery)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    }
});
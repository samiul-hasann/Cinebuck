document.addEventListener('DOMContentLoaded', () => {
    const watchOnlineBtn = document.getElementById('watch-online-btn');
    const watchTrailerBtn = document.getElementById('watch-trailer-btn');
    const modal = document.getElementById('video-modal');
    const closeBtn = document.querySelector('.close-button');
    const videoPlayer = document.getElementById('video-player');
    const localPlayerContainer = document.getElementById('local-player-container');
    const youtubePlayerContainer = document.getElementById('youtube-player-container');

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        videoPlayer.pause();
        youtubePlayerContainer.innerHTML = ''; // Remove iframe to stop video
    }

    if (watchOnlineBtn) {
        watchOnlineBtn.addEventListener('click', (e) => {
            e.preventDefault();
            youtubePlayerContainer.style.display = 'none';
            localPlayerContainer.style.display = 'block';
            openModal();
        });
    }

    if (watchTrailerBtn) {
        watchTrailerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localPlayerContainer.style.display = 'none';
            youtubePlayerContainer.style.display = 'block';
            
            const iframe = document.createElement('iframe');
            iframe.setAttribute('width', '100%');
            iframe.setAttribute('height', '450');
            iframe.setAttribute('src', 'https://www.youtube.com/embed/RGaW82k4dK4?autoplay=1&controls=1');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            
            youtubePlayerContainer.innerHTML = ''; // Clear previous iframe
            youtubePlayerContainer.appendChild(iframe);
            
            openModal();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModal();
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    fetch('sidebar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            if (html.trim().length > 0) {
                document.body.insertAdjacentHTML('afterbegin', html);
                if (typeof initializeSidebar === 'function') {
                    initializeSidebar();
                } else {
                    console.error('Sidebar initialization function not found. Make sure sidebar.js is loaded correctly.');
                }
            } else {
                console.error('Fetched sidebar.html is empty.');
            }
        })
        .catch(error => {
            console.error('Failed to fetch sidebar:', error);
        });
});

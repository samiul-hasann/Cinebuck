document.addEventListener('DOMContentLoaded', () => {
  const sidebarContainer = document.getElementById('sidebar-container');
  if (sidebarContainer) {
    let sidebarPath = 'client/sidebar/sidebar.html';
    if (window.location.pathname.includes('/client/')) {
      sidebarPath = '../sidebar/sidebar.html';
    }
    fetch(sidebarPath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        sidebarContainer.innerHTML = data;
        if (typeof initializeSidebar === 'function') {
          initializeSidebar();
        }
      })
      .catch(error => {
        console.error('Error fetching sidebar:', error);
      });
  }
});
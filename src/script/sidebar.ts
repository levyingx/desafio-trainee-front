const iconContainer = document.querySelector('.icon-container') as HTMLElement
const sidebar = document.getElementById('sidebar') as HTMLElement
const overlay = document.getElementById('sidebar-overlay') as HTMLElement

function toggleSidebar() {
    if (window.screen.height <= 768) {
        sidebar.classList.toggle('active')
        overlay.classList.toggle('active')
    }
}

iconContainer?.addEventListener('click', toggleSidebar)
overlay?.addEventListener('click', toggleSidebar)
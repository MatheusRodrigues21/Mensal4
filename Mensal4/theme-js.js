class ThemeService {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.initTheme();
    }

    initTheme() {
        document.body.classList.toggle('dark-theme', this.currentTheme === 'dark');
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', this.currentTheme);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const themeService = new ThemeService();
    
    // Adicione um botão de alternância de tema em suas páginas
    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            themeService.toggleTheme();
        });
    }
});

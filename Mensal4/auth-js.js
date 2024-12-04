class AuthService {
    constructor() {
        this.apiBaseUrl = 'URL_DO_SEU_BACKEND'; // Substitua pela URL real
    }

    async login(email) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (data.token) {
                // Salva o token no localStorage
                localStorage.setItem('userToken', data.token);
                // Redireciona para o dashboard
                window.location.href = '/pages/dashboard.html';
            } else {
                throw new Error('Falha na autenticação');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            alert('Não foi possível fazer login. Verifique suas credenciais.');
        }
    }

    logout() {
        localStorage.removeItem('userToken');
        window.location.href = '/index.html';
    }

    isAuthenticated() {
        return !!localStorage.getItem('userToken');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const authService = new AuthService();
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('email');
        await authService.login(emailInput.value);
    });
});

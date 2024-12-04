class BoardService {
    constructor() {
        this.apiBaseUrl = 'URL_DO_SEU_BACKEND'; // Substitua pela URL real
        this.token = localStorage.getItem('userToken');
    }

    async fetchBoards() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/boards`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Falha ao carregar quadros');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar quadros:', error);
            alert('Não foi possível carregar os quadros');
            return [];
        }
    }

    async fetchBoardColumns(boardId) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/boards/${boardId}/columns`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Falha ao carregar colunas');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar colunas:', error);
            alert('Não foi possível carregar as colunas');
            return [];
        }
    }

    async createColumn(boardId, columnName) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/boards/${boardId}/columns`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ name: columnName })
            });
            
            if (!response.ok) {
                throw new Error('Falha ao criar coluna');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao criar coluna:', error);
            alert('Não foi possível criar a coluna');
        }
    }

    async deleteColumn(columnId) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/columns/${columnId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Falha ao excluir coluna');
            }

            return true;
        } catch (error) {
            console.error('Erro ao excluir coluna:', error);
            alert('Não foi possível excluir a coluna');
            return false;
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const authService = new AuthService();
    const boardService = new BoardService();

    // Verifica autenticação
    if (!authService.isAuthenticated()) {
        window.location.href = '/index.html';
        return;
    }

    // Botão de logout
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
        authService.logout();
    });

    // Carrega lista de quadros
    const boardList = document.getElementById('board-list');
    const boards = await boardService.fetchBoards();

    boards.forEach(board => {
        const option = document.createElement('option');
        option.value = board.id;
        option.textContent = board.name;
        boardList.appendChild(option);
    });

    // Evento de seleção de quadro
    boardList.addEventListener('change', async (event) => {
        const boardId = event.target.value;
        const columnsContainer = document.getElementById('columns-container');
        columnsContainer.innerHTML = ''; // Limpa colunas anteriores

        const columns = await boardService.fetchBoardColumns(boardId);
        
        columns.forEach(column => {
            const columnElement = document.createElement('div');
            columnElement.classList.add('column');
            columnElement.innerHTML = `
                <h3>${column.name}</h3>
                <div class="tasks" data-column-id="${column.id}"></div>
                <button class="add-task" data-column-id="${column.id}">+ Nova Tarefa</button>
            `;
            columnsContainer.appendChild(columnElement);
        });

        // Adicionar evento para botões de nova tarefa
        document.querySelectorAll('.add-task').forEach(button => {
            button.addEventListener('click', () => {
                const columnId = button.dataset.columnId;
                openTaskModal(columnId);
            });
        });
    });
});

function openTaskModal(columnId) {
    const modal = document.getElementById('task-modal');
    modal.style.display = 'block';
    
    // Configurar formulário para nova tarefa
    const taskForm = document.getElementById('task-form');
    taskForm.dataset.columnId = columnId;
}

// Fechar modal
document.querySelector('.close').addEventListener('click', () => {
    const modal = document.getElementById('task-modal');
    modal.style.display = 'none';
});

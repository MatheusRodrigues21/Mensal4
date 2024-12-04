class TaskService {
    constructor() {
        this.apiBaseUrl = 'URL_DO_SEU_BACKEND'; // Substitua pela URL real
        this.token = localStorage.getItem('userToken');
    }

    async fetchColumnTasks(columnId) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/columns/${columnId}/tasks`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Falha ao carregar tarefas');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
            alert('Não foi possível carregar as tarefas');
            return [];
        }
    }

    async createTask(columnId, taskData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/columns/${columnId}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(taskData)
            });
            
            if (!response.ok) {
                throw new Error('Falha ao criar tarefa');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            alert('Não foi possível criar a tarefa');
        }
    }

    async updateTask(taskId, taskData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(taskData)
            });
            
            if (!response.ok) {
                throw new Error('Falha ao atualizar tarefa');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            alert('Não foi possível atualizar a tarefa');
        }
    }

    async deleteTask(taskId) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Falha ao excluir tarefa');
            }

            return true;
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
            alert('Não foi possível excluir a tarefa');
            return false;
        }
    }

    async moveTask(taskId, newColumnId) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/tasks/${taskId}/move`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ columnId: newColumnId })
            });
            
            if (!response.ok) {
                throw new Error('Falha ao mover tarefa');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao mover tarefa:', error);
            alert('Não foi possível mover a tarefa');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const taskService = new TaskService();

    // Evento de submissão do formulário de tarefa
    const taskForm = document.getElementById('task-form');
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const columnId = taskForm.dataset.columnId;
        const taskTitle = document.getElementById('task-title').value;
        const taskDescription = document.getElementById('task-description').value;

        const taskData = {
            title: taskTitle,
            description: taskDescription
        };

        // Lógica para criar ou editar tarefa
        if (taskForm.dataset.taskId) {
            // Edição de tarefa existente
            const taskId = taskForm.dataset.taskId;
            await taskService.updateTask(taskId, taskData);
        } else {
            // Criação de nova tarefa
            await taskService.createTask(columnId, taskData);
        }

        // Fechar modal e atualizar lista de tarefas
        document.getElementById('task-modal').style.display = 'none';
        
        // Atualizar lista de tarefas da coluna
        const tasksContainer = document.querySelector(`.tasks[data-column-id="${columnId}"]`);
        await loadColumnTasks(columnId, tasksContainer);
    });

    // Função para carregar tarefas de uma coluna
    async function loadColumnTasks(columnId, tasksContainer) {
        tasksContainer.innerHTML = ''; // Limpa tarefas anteriores
        const tasks = await taskService.fetchColumnTasks(columnId);

        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.innerHTML = `
                <h4>${task.title}</h4>
                <p>${task.description}</p>
                <div class="task-actions">
                    <button class="edit-task" data-task-id="${task.id}">Editar</button>
                    <button class="delete-task" data-task-id="${task.id}">Excluir</button>
                </div>
            `;
            tasksContainer.appendChild(taskElement);

            // Adicionar eventos de edição e exclusão
            taskElement.querySelector('.edit-task').addEventListener('click', () => {
                openTaskModal(columnId, task);
            });

            taskElement.querySelector('.delete-task').addEventListener('click', async () => {
                await taskService.deleteTask(task.id);
                tasksContainer.removeChild(taskElement);
            });
        });
    }

    // Função para abrir modal de tarefa para edição
    function openTaskModal(columnId, task = null) {
        const modal = document.getElementById('task-modal');
        const taskForm = document.getElementById('task-form');
        const titleInput = document.getElementById('task-title');
        const descriptionInput = document.getElementById('task-description');

        modal.style.display = 'block';
        taskForm.dataset.columnId = columnId;

        if (task) {
            // Modo de edição
            titleInput.value = task.title;
            descriptionInput.value = task.description;
            taskForm.dataset.taskId = task.id;
        } else {
            // Modo de criação
            titleInput.value = '';
            descriptionInput.value = '';
            delete taskForm.dataset.taskId;
        }
    }
});

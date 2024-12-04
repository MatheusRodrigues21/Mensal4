// Verifica login
window.onload = () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      window.location.href = 'login.html';
    } else {
      document.getElementById('logout-btn').textContent = `Sair (${userEmail})`;
    }
  
    // Restaurar Tema
    if (localStorage.getItem('theme')) {
      currentTheme = localStorage.getItem('theme');
      document.body.className = currentTheme;
    }
  };
  
  // Dados do sistema (Mock API)
  const boards = []; // Quadros dinâmicos
  const columns = {}; // Colunas associadas aos quadros
  const tasks = {}; // Tarefas associadas às colunas
  let selectedBoard = null;
  let currentTheme = 'light';
  
  // Alternar Tema
  document.getElementById('theme-toggle').addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.className = currentTheme;
    localStorage.setItem('theme', currentTheme); // Salvar no navegador
  });
  
  // Logout
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('userEmail');
    window.location.href = 'login.html';
  });
  
  // Carregar Quadros
  function loadBoards() {
    const boardList = document.getElementById('boards');
    boardList.innerHTML = '';
  
    if (boards.length === 0) {
      boardList.innerHTML = '<p>Nenhum quadro disponível.</p>';
      return;
    }
  
    boards.forEach(board => {
      const li = document.createElement('li');
      li.textContent = board.name;
      li.addEventListener('click', () => selectBoard(board.id));
      boardList.appendChild(li);
    });
  }
  
  // Selecionar Quadro
  function selectBoard(boardId) {
    selectedBoard = boardId;
    const boardTitle = boards.find(board => board.id === boardId).name;
    document.getElementById('board-title').textContent = boardTitle;
    loadColumns();
  }
  
  // Adicionar Quadro
  document.getElementById('add-board').addEventListener('click', () => {
    const boardName = prompt('Digite o nome do novo quadro:');
    if (boardName) {
      const newBoard = { id: Date.now(), name: boardName };
      boards.push(newBoard);
      columns[newBoard.id] = [];
      loadBoards();
    }
  });
  
  // Carregar Colunas
  function loadColumns() {
    const columnsContainer = document.getElementById('columns');
    columnsContainer.innerHTML = '';
  
    if (!columns[selectedBoard] || columns[selectedBoard].length === 0) {
      columnsContainer.innerHTML = '<p>Nenhuma coluna disponível.</p>';
      return;
    }
  
    columns[selectedBoard].forEach(column => {
      const columnDiv = document.createElement('div');
      columnDiv.className = 'column';
      columnDiv.innerHTML = `<h3>${column.name}</h3><button class="add-task-btn">+ Tarefa</button>`;
      columnDiv.dataset.columnId = column.id;
  
      // Adicionar Tarefas
      const taskList = document.createElement('div');
      (tasks[column.id] || []).forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.textContent = task.name;
        taskDiv.className = 'task';
        taskList.appendChild(taskDiv);
      });
  
      columnDiv.appendChild(taskList);
  
      // Adicionar botão de nova tarefa
      columnDiv.querySelector('.add-task-btn').addEventListener('click', () => {
        const taskName = prompt('Digite o nome da nova tarefa:');
        if (taskName) {
          const newTask = { id: Date.now(), name: taskName };
          tasks[column.id] = tasks[column.id] || [];
          tasks[column.id].push(newTask);
          loadColumns();
        }
      });
  
      columnsContainer.appendChild(columnDiv);
    });
  }
  
  // Adicionar Coluna
  document.getElementById('add-column-btn').addEventListener('click', () => {
    if (!selectedBoard) {
      alert('Selecione um quadro antes de adicionar colunas.');
      return;
    }
  
    const columnName = prompt('Digite o nome da nova coluna:');
    if (columnName) {
      const newColumn = { id: Date.now(), name: columnName };
      columns[selectedBoard] = columns[selectedBoard] || [];
      columns[selectedBoard].push(newColumn);
      loadColumns();
    }
  });
  
  // Inicializar Aplicação
  loadBoards();
  
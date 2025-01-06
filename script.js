let todos = [];

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        todos.push(todo);
        input.value = '';
        renderTodos();
    }
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        const newText = prompt('Edit task:', todo.text);
        if (newText !== null && newText.trim() !== '') {
            todo.text = newText.trim();
            renderTodos();
        }
    }
}

function deleteTodo(id) {
    const todoElement = document.querySelector(`.todo-item[data-id="${id}"]`);
    todoElement.style.transform = 'translateX(-100px)';
    todoElement.style.opacity = '0';
    
    setTimeout(() => {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
    }, 300);
}

function updateProgress() {
    const totalTasks = todos.length;
    const completedTasks = todos.filter(todo => todo.completed).length;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    
    const progressRing = document.querySelector('.progress-ring');
    const progressText = document.querySelector('.progress-circle span');
    
    progressRing.style.transform = `rotate(${(progress * 3.6) - 90}deg)`;
    progressText.textContent = `${progress}%`;

    const completionMessage = document.getElementById('completionMessage');
    completionMessage.style.display = totalTasks > 0 && completedTasks === totalTasks ? 'block' : 'none';
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', todo.id);
        
        li.innerHTML = `
            <div class="todo-checkbox" onclick="toggleTodo(${todo.id})"></div>
            <span class="todo-text">${todo.text}</span>
            <div class="todo-actions">
                <i class="fas fa-pen" onclick="editTodo(${todo.id})"></i>
                <i class="fas fa-trash" onclick="deleteTodo(${todo.id})"></i>
            </div>
        `;
        
        todoList.appendChild(li);
    });
    
    updateProgress();
}

document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

renderTodos();
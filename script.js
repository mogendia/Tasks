const taskInput = document.getElementById('taskInput');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskList = document.getElementById('taskList');
        const messageBox = document.getElementById('messageBox');

        function showMessage(message, isError = false) {
            messageBox.textContent = message;
            messageBox.style.display = 'block';
            if (isError) {
                messageBox.classList.add('error');
            } else {
                messageBox.classList.remove('error');
            }
            setTimeout(() => {
                messageBox.style.display = 'none';
                messageBox.classList.remove('error');
            }, 3000); 
        }

        function createTodoItem(taskText) {
            const li = document.createElement('li');
            li.className = 'todo-item';

            const span = document.createElement('span');
            span.className = 'task-text';
            span.textContent = taskText;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '&#x2715;';
            deleteBtn.title = 'Delete task';

            li.appendChild(span);
            li.appendChild(deleteBtn);

            return li;
        }

        function addTask() {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                showMessage("Task cannot be empty!", true);
                return;
            }

            const newTodoItem = createTodoItem(taskText);
            taskList.appendChild(newTodoItem);
            taskInput.value = ""; 
            taskInput.focus(); 
        }

        function saveTasks() {
            const tasks = [];
            document.querySelectorAll('.todo-item .task-text').forEach(task => {
                tasks.push({
                    text: task.textContent,
                    completed: task.closest('.todo-item').classList.contains('completed')
                });
            });
            localStorage.setItem('todoTasks', JSON.stringify(tasks));
        }

        function loadTasks() {
            const tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
            tasks.forEach(task => {
                const newTodoItem = createTodoItem(task.text);
                if (task.completed) {
                    newTodoItem.classList.add('completed');
                }
                taskList.appendChild(newTodoItem);
            });
        }

        addTaskBtn.addEventListener('click', () => {
            addTask();
            saveTasks();
        });

        taskInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                addTask();
            }
        });

        taskList.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('delete-btn')) {
                const todoItem = target.closest('.todo-item');
                if (todoItem) {
                    todoItem.remove();
                }
            } 
            
            else if (target.classList.contains('task-text')) {
                const todoItem = target.closest('.todo-item');
                if (todoItem) {
                    todoItem.classList.toggle('completed');
                }
            }

            saveTasks();
        });

        window.addEventListener('load', loadTasks);

// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')
// eventListeners

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('change', filterTodo)
document.addEventListener('DOMContentLoaded', getTodos)
// functions

function addTodo(event) {
  event.preventDefault();

  const todoDiv = document.createElement('div');
  todoDiv.classList.add("todo")

  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //adding todo to local storage

  saveLocalTodos(todoInput.value);

  const completedBtn = document.createElement('button');
  completedBtn.innerHTML = '<i class="fas fa-check"></i>'
  completedBtn.classList.add("completed-btn")
  todoDiv.appendChild(completedBtn)

  const trashBtn = document.createElement('button');
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
  trashBtn.classList.add("trash-btn")
  todoDiv.appendChild(trashBtn)

  todoList.appendChild(todoDiv);
  todoInput.value = '';
}

function deleteCheck(event) {
  const item = event.target;
  const todo = item.parentElement;
  if (item.classList[0] === "trash-btn") {
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', () => {
      todo.remove();
    })
  }

  if (item.classList[0] === "completed-btn") {
    todo.classList.toggle('completed')
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch(event.target.value){
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = "none";
        };
        break;
      case 'uncompleted':
        if (!todo.classList.contains("completed")) {
            todo.style.display = 'flex';
        } else {
          todo.style.display = "none";
        };
        break;
    }
  })
}

function saveLocalTodos(todo){
 //check
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(todo){
 //check
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo")

    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>'
    completedBtn.classList.add("completed-btn")
    todoDiv.appendChild(completedBtn)

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>'
    trashBtn.classList.add("trash-btn")
    todoDiv.appendChild(trashBtn)

    todoList.appendChild(todoDiv);
  })
}

function removeLocalTodos(todo){
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todos.indexOf(todo.children[0].innerText)
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos))
}


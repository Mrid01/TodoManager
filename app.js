//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter-todo");

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", todoItemStatus);
todoFilter.addEventListener("click", filterTodo);

//FUNCTIONS

function addTodo(event) {
  //preventing default page refresh on form submission
  event.preventDefault();

  //creating Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");
  //creating Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;

  //Adding Todo-items to the local storage
  saveLocalTodos(todoInput.value);

  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // completedButton.Text = "todo-items";
  // newTodo.classList.add("todo-item");
  // todoDiv.appendChild(newTodo);

  //creating check mark button for completed tasks
  const checkButton = document.createElement("button");
  checkButton.innerHTML = "<i class='fas fa-check'></i>";
  checkButton.classList.add("check-btn");
  todoDiv.appendChild(checkButton);
  //creating trash button to delete tasks
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //appending everything to the List
  todoList.appendChild(todoDiv);
  //clearing todo-input last typed value
  todoInput.value = "";
}

function todoItemStatus(event) {
  const item = event.target;
  //deleted item
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //delete transition
    todo.classList.add("deletedTask");

    removeLocalTodos(todo);
    todo.addEventListener("transitionend", (event) => {
      todo.remove();
    });
  }
  //completed item
  if (item.classList[0] === "check-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completedTask");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";

        break;
      case "completed":
        if (todo.classList.contains("completedTask")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completedTask")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      // default:
      //   todo.style.display = "flex";
      //   break;
    }
  });
}

function saveLocalTodos(todo) {
  //checking with the local storage for the existing Todos

  let todoAry;
  if (localStorage.getItem("todoAry") === null) {
    todoAry = [];
  } else {
    todoAry = JSON.parse(localStorage.getItem("todoAry"));
  }

  todoAry.push(todo);
  localStorage.setItem("todoAry", JSON.stringify(todoAry));
}

function removeLocalTodos(todo) {
  let todoAry;

  if (localStorage.getItem("todoAry") === null) {
    todoAry = [];
  } else {
    todoAry = JSON.parse(localStorage.getItem("todoAry"));
  }
  const todoIndex = todo.children[0].innerText;
  todoAry.splice(todoAry.indexOf(todoIndex), 1);
  localStorage.setItem("todoAry", JSON.stringify(todoAry));
}

function getTodos() {
  let todoAry;

  if (localStorage.getItem("todoAry") === null) {
    todoAry = [];
  } else {
    todoAry = JSON.parse(localStorage.getItem("todoAry"));
  }
  todoAry.forEach(function (todo) {
    //creating Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    //creating Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //creating check mark button for completed tasks
    const checkButton = document.createElement("button");
    checkButton.innerHTML = "<i class='fas fa-check'></i>";
    checkButton.classList.add("check-btn");
    todoDiv.appendChild(checkButton);
    //creating trash button to delete tasks
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //appending everything to the List
    todoList.appendChild(todoDiv);
  });
}

//JUMP BUTTON
//Get the button
var jumpButton = document.getElementById("jumpBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    jumpButton.style.display = "block";
  } else {
    jumpButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function backToTop() {
  document.body.scrollTop = 0;
  // document.body.scrollTop.behaviour = smooth;
  document.documentElement.scrollTop = 0;
}

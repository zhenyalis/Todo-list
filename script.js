const root = document.querySelector(".root");
const wraper = document.createElement("div");
const main = document.createElement("div");

wraper.className = "wraper";
main.className = "main";
root.append(wraper);

const date = new Date().toLocaleDateString();
const todos = [];

const TodoConstructor = function (todoText, todoId, isChecked, date) {
  this.todoText = todoText;
  this.todoId = todoId;
  this.isChecked = isChecked;
  this.date = date;
};
//  Header

const header = document.createElement("div");
const btnDelete = document.createElement("button");
const btnText = document.createTextNode("Delete All");
const inputEnter = document.createElement("input");
inputEnter.placeholder = "Enter todo ...";
const addBtn = document.createElement("button");
const textBtn = document.createTextNode("Add");

header.className = "header";
btnDelete.className = "delete_btn";
inputEnter.className = "header_input";
addBtn.className = "add_btn";

wraper.append(header);
header.append(btnDelete, inputEnter, addBtn);
btnDelete.append(btnText);
addBtn.append(textBtn);

const generateTodo = (todoText, todoId, isChecked = false) => {
  const form = document.createElement("div");
  const btnCheckbox = document.createElement("input");
  const textTodo = document.createElement("p");
  const text = document.createTextNode(todoText);
  const container = document.createElement("div");
  const cancelBtn = document.createElement("button");
  const cancelIcon = document.createTextNode("X");
  const formData = document.createElement("p");
  const dateText = document.createTextNode("");

  btnCheckbox.className = "checkbox";
  container.className = "container";
  cancelBtn.className = "icon_cancel";
  formData.className = "data";
  textTodo.className = "todoText";

  main.append(form);
  wraper.append(main);
  textTodo.append(text);
  formData.append(dateText, date);
  form.append(btnCheckbox, textTodo, container);
  cancelBtn.append(cancelIcon);
  container.append(cancelBtn, formData);

  btnCheckbox.type = "checkbox";
  form.dataset.todoId = todoId;
  btnCheckbox.checked = isChecked;
  form.className = isChecked ? "form green" : "form";

  return form;
};

main.addEventListener("click", (event) => {
  const item = event.target;

  if (item.type === "checkbox") {
    item.parentElement.classList.toggle("green");
    item.nextElementSibling.classList.toggle("activate");
    console.log(item.closest(".form").dataset.todoId);
    const selectedTodo = todos.find(
      (todo) => +todo.todoId === +item.closest(".form").dataset.todoId
    );
    console.log(selectedTodo);
    selectedTodo.isChecked = !selectedTodo.isChecked;
    localStorage.setItem("todos", JSON.stringify(todos));

    return;
  }

  if (item === item.closest(".form").lastElementChild.firstChild) {
    let selectedTodoDelete = todos.findIndex(
      (todo) => +todo.id === +event.target.closest(".form").dataset.todoId
    );
    item.closest(".form").remove();
    todos.splice(selectedTodoDelete);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});

addBtn.addEventListener("click", () => {
  if (!inputEnter.value) {
    return;
  }
  const todoId = Date.now();
  const todo = new TodoConstructor(inputEnter.value, todoId, false, date);
  main.append(generateTodo(inputEnter.value, todoId, false));
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  inputEnter.value = "";
});

btnDelete.addEventListener("click", () => {
  main.innerHTML = "";
  localStorage.removeItem("todos");
});

const todosFromStorage = JSON.parse(localStorage.getItem("todos"));
if (todosFromStorage?.length) {
  todosFromStorage.forEach((todo) => {
    main.append(generateTodo(todo.todoText, todo.todoId, todo.isChecked));
    todos.push(todo);
  });
}

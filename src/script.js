//colocar data
let date = new Date();
let options = { weekday: "long", month: "long", day: "numeric" };
let today = document.querySelector(".date");
today.innerHTML = date.toLocaleDateString("pt-BR", options);

//selecionar os items
let input = document.querySelector("#todo");
let list = document.querySelector("#list");
let buttonAdd = document.querySelector(".add");
let element = document.getElementsByTagName("li");
let trashBtn = document.getElementsByClassName("fa-trash");

ShowTasks();
//adicionar elementos
buttonAdd.addEventListener("click", () => {
  let txt = input.value;
  if (txt === "") {
    alert("Escreva algo");
  } else {
    //local Storage
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage === null) {
      todos = [];
    } else {
      todos = JSON.parse(getLocalStorage);
    }
    todos.push(txt);
    localStorage.setItem("New Todo", JSON.stringify(todos));
  }
  ShowTasks();
});

//deletar itens depois de um dia
function deleteAtMidnight() {
  let day = new Date();
  let midnightHour = day.getHours();
  let midnightMinutes = day.getMinutes();

  if (midnightHour === 00 || midnightMinutes === 59) {
    let getLocalStorage = localStorage.getItem("New Todo");
    todos = JSON.parse(getLocalStorage);
    todos.splice(0);
    localStorage.setItem("New Todo", JSON.stringify(todos));
  }
}

function ShowTasks() {
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage === null) {
    todos = [];
  } else {
    todos = JSON.parse(getLocalStorage);
  }
  let newLiTag = "";
  todos.forEach((element, index) => {
    newLiTag += `<li>
        <p class="valueToDo ${index}">${element}</p> 
        <div class="btns">       
         <i class="fa fa-check" aria-hidden="true" onclick="completed(${index})"></i>
         <i class="fa fa-trash" aria-hidden="true" onclick="deleted(${index})"></i>
        </div>
        </li>`;
  });
  list.innerHTML = newLiTag;
  //limpar o input após adicionar item
  input.value = "";
  deleteAtMidnight();
}

//item concluido
function completed(index) {
  let toDoText = document.querySelectorAll(".valueToDo");
  toDoText = toDoText[index];
  toDoText.classList.toggle("completed");
}

//deletar item
function deleted(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  todos = JSON.parse(getLocalStorage);
  todos.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(todos));
  ShowTasks();
}

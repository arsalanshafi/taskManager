const addTaskBtn = document.querySelector(".addTaskBtn");
const dialog = document.querySelector(".addTask");
const add = document.querySelector(".add");


addTaskBtn.addEventListener("click", () => {
    dialog.classList.add("show");
})

add.addEventListener("click", () => {
    dialog.classList.remove("show");
})
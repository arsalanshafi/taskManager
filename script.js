const addTaskBtn = document.querySelector(".addTaskBtn");
const dialog = document.querySelector(".addTask");
const add = document.querySelector(".add");
const container = document.querySelector(".tasks");
const cancelBtn = document.querySelector(".cancel")


window.onload = () => {
    displayTasks(); 
}


cancelBtn.addEventListener("click",() => {
    dialog.classList.remove("show");
})

addTaskBtn.addEventListener("click", () => {
    clearForm();
    dialog.classList.add("show");
})

add.addEventListener("click", () => {
    dialog.classList.remove("show");
    addTask();
    displayTasks();
})


function addTask(){
    let taskTitle = document.querySelector('.title').value;
    let taskCategory = document.querySelector(".category").value;

    let task = `${taskTitle},${taskCategory}`
    let count = localStorage.getItem("taskCount");
    count = Number(count) + 1;
    localStorage.setItem("taskCount",count);
    console.log(count);
    localStorage.setItem(`task${count}`,task);
}



function displayTasks(){

    container.innerHTML = "";
    for(let i = 1;i <= Number(localStorage.taskCount);i++){

        let data = localStorage.getItem(`task${i}`).split(",")
        const task = document.createElement("div");
        task.classList.add("task");
        task.innerHTML = `<input type="checkbox" name="" id="" class="check">
        <div class="taskInfo">
            <div class="taskName">${data[0]}</div>
            <div class="dd">12-10-2024</div>
            <div class="icon">jj</div>
        </div>`
        container.appendChild(task);
    }

}

function clearForm(){
    document.querySelector(".title").value = "";
    document.querySelector(".category").value = "";
}


/* <div class="task">
        <input type="checkbox" name="" id="" class="check">
        <div class="taskInfo">
            <div class="taskName">Task name</div>
            <div class="dd">12-10-2024</div>
            <div class="icon">jj</div>
        </div>
</div> */
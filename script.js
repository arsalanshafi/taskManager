const addTaskBtn = document.querySelector(".addTaskBtn");
const dialog = document.querySelector(".addTask");
const add = document.querySelector(".add");
const container = document.querySelector(".tasks");
const cancelBtn = document.querySelector(".cancel")
let str = "";


window.onload = () => {
    displayTasks();
}


cancelBtn.addEventListener("click", () => {
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


function addTask() {
    let taskTitle = document.querySelector('.title').value;
    let taskCategory = document.querySelector(".category").value;
    let taskStatus = false;

    if (localStorage.getItem("value") === null || localStorage.getItem("value") === "") {
        str = str + `${taskTitle},${taskCategory},${taskStatus}`
    } else {
        str = str + `,${taskTitle},${taskCategory},${taskStatus}`
    }


    localStorage.setItem("value", str)
}



function displayTasks() {

    container.innerHTML = "";
    if (localStorage.getItem("value") === null || localStorage.getItem("value") === "") {
        localStorage.clear();
        return;
    }

    let arr = localStorage.getItem("value").split(",");
    // console.log(arr);
    console.log(arr)
    for (let i = 0; i < arr.length; i += 3) {
        let ele = document.createElement("div");
        ele.classList.add("task");
        if (arr[i + 2] === "true") {
            ele.innerHTML = `<input type="checkbox" data-num = ${i} id="" class="check" onclick = checkTask(this) checked>
        <div class="taskInfo">
            <div class="taskName">
                <div style = "text-decoration:line-through;">${arr[i]}</div>
                <div class="category">${arr[i + 1]}</div>
            </div>
            <div class="dd">12-10-2024</div>
            <div class="icon" style="cursor:pointer;" data-num = ${i} onclick = deletetask(this)>&#10006</div>
        </div>`
        } else {

            ele.innerHTML = `<input type="checkbox" data-num = ${i} id="" class="check" onclick = checkTask(this)>
            <div class="taskInfo">
                <div class="taskName">
                    <div>${arr[i]}</div>
                    <div class="category">${arr[i + 1]}</div>
                </div>
                <div class="dd">12-10-2024</div>
                <div class="icon" style="cursor:pointer;" data-num = ${i} onclick = deletetask(this)>&#10006</div>
            </div>`
        }

        container.appendChild(ele);
    }



}



function clearForm() {
    document.querySelector(".title").value = "";
    document.querySelector(".category").value = "";
}


function deletetask(target) {
    let num = target.getAttribute("data-num");
    let arr = localStorage.getItem("value").split(",");
    arr.splice(num, 3);
    str = arr.join();
    localStorage.setItem("value", str);
    displayTasks();

}

function checkTask(target) {
    if (target.checked) {
        let arr = localStorage.getItem("value").split(",");
        let num = Number(target.getAttribute("data-num"));
        arr[num + 2] = "true";
        let str = arr.join();
        localStorage.setItem("value", str);
        target.nextElementSibling.firstElementChild.firstElementChild.style.textDecoration = "line-through";
        return;
    }

    let arr = localStorage.getItem("value").split(",");
    let num = Number(target.getAttribute("data-num"));
    arr[num + 2] = "false";
    let str = arr.join();
    localStorage.setItem("value", str);
    target.nextElementSibling.firstElementChild.firstElementChild.style.textDecoration = "none";
    return;

}

/* <div class="task">
        <input type="checkbox" name="" id="" class="check">
        <div class="taskInfo">
            <div class="taskName">Task name</div>
            <div class="dd">12-10-2024</div>
            <div class="icon">jj</div>
        </div>
</div> */
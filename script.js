const addTaskBtn = document.querySelector(".addTaskBtn");
const dialog = document.querySelector(".addTask");
const add = document.querySelector(".add");
const container = document.querySelector(".tasks");
const cancelBtn = document.querySelector(".cancel");
const search = document.querySelector("#search");



window.onload = () => {
    displayTasks();
    setDate();
}

search.addEventListener("input", e => {
    let index = searchByCategory(e.target.value);
    showSearchResults(index);
})
search.addEventListener("blur",displayTasks);


cancelBtn.addEventListener("click", () => {
    dialog.classList.remove("show");
})

addTaskBtn.addEventListener("click", () => {
    clearForm();
    dialog.classList.add("show");
})

add.addEventListener("click", (e) => {
    if(!validateForm()){
        showErrorMsg("all fields are mandatory");
        return;
    };
    e.target.disabled = true;
    dialog.classList.remove("show");
    addTask();
    displayTasks();
})


function addTask() {
    let taskTitle = document.querySelector('.title').value;
    let taskCategory = document.querySelector(".category").value;
    let day = document.querySelector(".day").value;
    let month = document.querySelector(".month").value;
    let year = document.querySelector(".year").value;
    let taskStatus = false;

    if (localStorage.getItem("value") === null || localStorage.getItem("value") === "") {
        let str = "";
        str = str + `${taskTitle},${taskCategory},${taskStatus},${day},${month},${year}`
        localStorage.setItem("value", str)
    } else {
        let str = localStorage.getItem("value");
        str = str + `,${taskTitle},${taskCategory},${taskStatus},${day},${month},${year}`
        localStorage.setItem("value", str)
    }


    
}



function displayTasks() {

    container.innerHTML = "";
    if (localStorage.getItem("value") === null || localStorage.getItem("value") === "") {
        localStorage.clear();
        return;
    }


    let arr = localStorage.getItem("value").split(",");
    // console.log(arr);
    for (let i = 0; i < arr.length; i += 6) {
        let ele = document.createElement("div");
        ele.classList.add("task");
        if (arr[i + 2] === "true") {
            ele.innerHTML = `<input type="checkbox" data-num = ${i} id="" class="check" onclick = checkTask(this) checked>
        <div class="taskInfo">
            <div class="taskName">
                <div style = "text-decoration:line-through;">${arr[i]}</div>
                <div class="category">${arr[i + 1]}</div>
            </div>
            <div class="dd">${arr[i+3]}-${arr[i+4]}-${arr[i+5]}</div>
            <div class="icon" style="cursor:pointer;" data-num = ${i} onclick = deletetask(this)>&#10006</div>
        </div>`
        } else {

            ele.innerHTML = `<input type="checkbox" data-num = ${i} id="" class="check" onclick = checkTask(this)>
            <div class="taskInfo">
                <div class="taskName">
                    <div>${arr[i]}</div>
                    <div class="category">${arr[i + 1]}</div>
                </div>
                <div class="dd">${arr[i+3]}-${arr[i+4]}-${arr[i+5]}</div>
                <div class="icon" style="cursor:pointer;" data-num = ${i} onclick = deletetask(this)>&#10006</div>
            </div>`
        }

        container.appendChild(ele);
    }



}



function clearForm() {
    add.disabled = false;
    document.querySelector(".errmsg").classList.remove("bb");
    document.querySelector(".title").value = "";
    document.querySelector(".category").value = "";
}


function deletetask(target) {
    let num = target.getAttribute("data-num");
    let arr = localStorage.getItem("value").split(",");
    arr.splice(num, 6);
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


function validateForm(){
    let taskTitle = document.querySelector('.title').value;
    let taskCategory = document.querySelector(".category").value;
    let day = document.querySelector(".day").value;
    let month = document.querySelector(".month").value;
    let year = document.querySelector(".year").value;


    if(!taskTitle || !taskCategory || !day || !month || !year) return false;


    return true;
}

function setDate(){
    let obj = new Date();
    document.querySelector(".day").value = obj.getDate();
    document.querySelector(".month").value = obj.getMonth()+1;
}

function showErrorMsg(name){
    let ele = document.querySelector(".errmsg");
    ele.innerHTML = name;
    ele.classList.add("bb");
}

function searchByCategory(category){
    let arr = localStorage.getItem("value").split(",");
    let index = [];

    for(let i =1;i<arr.length;i += 6){
        if(arr[i].toLowerCase().includes(category.toLowerCase())) index.push(i-1);
    }
    return index;
}



function showSearchResults(localArr){
    container.innerHTML = "";
    let arr = localStorage.getItem("value").split(",");

    localArr.forEach(i => {
        let ele = document.createElement("div");
        ele.classList.add("task");
        if (arr[i + 2] === "true") {
            ele.innerHTML = `<input type="checkbox" data-num = ${i} id="" class="check" onclick = checkTask(this) checked>
        <div class="taskInfo">
            <div class="taskName">
                <div style = "text-decoration:line-through;">${arr[i]}</div>
                <div class="category">${arr[i + 1]}</div>
            </div>
            <div class="dd">${arr[i+3]}-${arr[i+4]}-${arr[i+5]}</div>
            <div class="icon" style="cursor:pointer;" data-num = ${i} onclick = deletetask(this)>&#10006</div>
        </div>`
        } else {

            ele.innerHTML = `<input type="checkbox" data-num = ${i} id="" class="check" onclick = checkTask(this)>
            <div class="taskInfo">
                <div class="taskName">
                    <div>${arr[i]}</div>
                    <div class="category">${arr[i + 1]}</div>
                </div>
                <div class="dd">${arr[i+3]}-${arr[i+4]}-${arr[i+5]}</div>
                <div class="icon" style="cursor:pointer;" data-num = ${i} onclick = deletetask(this)>&#10006</div>
            </div>`
        }

        container.appendChild(ele);
    })
}
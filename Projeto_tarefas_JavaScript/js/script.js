
function addtask(){
    const taskTitle = document.querySelector("#task-title").value;

    if (taskTitle){
        var template = document.querySelector(".template");

        var newTask = template.cloneNode(true);

        // add titulo a tarefa 
        newTask.querySelector(".task-title").textContent = taskTitle;

        // removendo as classes desnecessarias
        newTask.classList.remove("template");
        newTask.classList.remove("hide");

        var list = document.querySelector("#task-list");
        list.appendChild(newTask);

        // Remover Tarefa
        const removebtn = newTask.querySelector(".remove-btn").addEventListener("click", function(){
            removeTask(this);
        });

        // add evento de adicionar tarefa 

        var donebtn = newTask.querySelector(".done-btn").addEventListener("click", function(){
            completeTask(this);

        })


        // Limpar texto
        document.querySelector("#task-title").value = "";

    }
}

// função de remover tarefa

function removeTask(task){
    task.parentNode.remove(true);
}

// função de add tarefa

function completeTask(task){
    var taskToComplete = task.parentNode;

    taskToComplete.classList.toggle("done");
}

var addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", function(e){
    e.preventDefault();
    addtask();

})
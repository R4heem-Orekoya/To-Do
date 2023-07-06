const input = document.querySelector('.input');
const addBtn = document.querySelector('.circle');
const todos = document.querySelector('.to-dos');
const left = document.querySelector('.remaining');
const clearBtn = document.querySelector('.clear');
const actions = document.querySelectorAll('.action');

let toDoList = [];



const addTodo = () =>{
    if(input.value.length === 0) return;
    const li = `
        <li class="to-do active" draggable='true'>

                <div class="check-box">
                    <img src="Images/icon-check.svg" alt="...">
                </div>
                <span class="to-do-text">${input.value}</span>

            <div class="cancel-btn">
                <img src="Images/icon-cross.svg" alt="...">
            </div>

        </li>
    `;

    toDoList.push(input.value);
    todos.innerHTML += li;
    console.log(todos.childElementCount)
    input.value = '';
    // console.log(document.querySelectorAll('.to-do.done'))

    updateNumberOfToDoLeft();
    deleteToDo();
    checkToDo();
    // filter();
    // console.log(toDoList)
}

const deleteToDo = () =>{
    let currentToDo = document.querySelectorAll('.cancel-btn');

    for(var i = 0; i < currentToDo.length; i++){
        currentToDo[i].onclick = function(){
            this.parentNode.remove();
            console.log(todos.childElementCount)
            updateNumberOfToDoLeft();
        }
    }
}

const checkToDo = ()=>{

    let currentCheckbox = document.querySelectorAll('.check-box');

    currentCheckbox.forEach(checkbox =>{

        checkbox.addEventListener('click', ()=>{

            checkbox.parentNode.classList.toggle('done')
            checkbox.parentNode.classList.toggle('active');
            filterToDo();

        })

    })

}

const clearToDo = ()=>{
    let completedToDo = document.querySelectorAll('.to-do.done');
    completedToDo.forEach(completed =>{
        completed.remove();
    })
    // todos.innerHTML = "";
    left.innerText = `${todos.childElementCount} items left`;
}

const filterToDo = ()=>{

    actions.forEach(action =>{

        action.addEventListener('click', ()=>{

            let completedToDo = document.querySelectorAll('.to-do.done');
            let uncompletedToDo = document.querySelectorAll('.to-do.active');

            document.querySelector(".action.current").classList.remove('current');
            action.classList.add('current');

            if(action.classList.contains('all') && action.classList.contains('current')){

                let allTodo = document.querySelectorAll('.to-do');
                allTodo.forEach(todo =>{
                    todo.style.display = 'flex';
                })
                left.innerText = `${allTodo.length} items left`;

            }
            else if(action.classList.contains('active') && action.classList.contains('current')){

                completedToDo.forEach(completed =>{

                    completed.style.display = 'none';

                })

                uncompletedToDo.forEach(uncompleted =>{

                    uncompleted.style.display = 'flex';

                })

                left.innerText = `${uncompletedToDo.length} active tasks`;

            }
            else if(action.classList.contains('completed') && action.classList.contains('current')){

                uncompletedToDo.forEach(uncompleted =>{

                    uncompleted.style.display = 'none';

                })

                completedToDo.forEach(completed =>{

                    completed.style.display = 'flex';

                })

                left.innerText = `${completedToDo.length} completed tasks`;

            }

        })

    })

}
filterToDo();

const dragToDo = e =>{
    e.preventDefault(); 
    const toDoItem = document.querySelectorAll('.to-do');
    const draggingItem = todos.querySelector('.dragging');


    toDoItem.forEach(toDo =>{
        toDo.addEventListener('dragstart', () =>{
            setTimeout(() => toDo.classList.add('dragging'), 0)
        });

    toDo.addEventListener('dragend', () => toDo.classList.remove('dragging'))
    })

    const siblings = [...todos.querySelectorAll('.to-do:not(.dragging)')];

    let nextSibling = siblings.find(sibling =>{
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    })

    todos.insertBefore(draggingItem, nextSibling);

}

todos.addEventListener('dragover', dragToDo)
todos.addEventListener('dragend', e => e.preventDefault())



addBtn.addEventListener('click', addTodo);
clearBtn.addEventListener('click', clearToDo);
input.addEventListener('keyup', e=>{
    if(e.key == 'Enter'){
        addTodo();
    }
})

const updateNumberOfToDoLeft = ()=>{
        left.innerText = `${todos.childElementCount} items left`;
}
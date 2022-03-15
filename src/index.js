import './styles.css';


//Global Declarations

let addItem = document.getElementById('add-item');
let addProject = document.getElementById('add-project');
let newItemForm = document.getElementById('new-item');
let newProjectForm = document.getElementById('new-project');
let closeItemForm = document.getElementById('close-item-form');
let closeProjectForm = document.getElementById('close-project-form');

function toggle(){
    newItemForm.classList.add('none');
    newProjectForm.classList.add('none');
    if(this.id === 'add-item'){
        newItemForm.classList.toggle('none');
    }if(this.id === 'add-project'){
        newProjectForm.classList.toggle('none');
    }
    // console.log(this.innerHTML);
}
function close(event){
    event.preventDefault();
    if(this.id === 'close-project-form'){
        newProjectForm.classList.add('none');
    }
    if(this.id === 'close-item-form'){
        newItemForm.classList.add('none');
    }
}
addItem.addEventListener('click',toggle);
addProject.addEventListener('click',toggle);
closeItemForm.addEventListener('click',close);
closeProjectForm.addEventListener('click',close);
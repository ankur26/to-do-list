import './styles.css';


//Global Declarations

let addItemButton = document.getElementById('add-item');
let addProjectButton = document.getElementById('add-project');
let newItemFormDiv = document.getElementById('new-item');
let newProjectFormDiv = document.getElementById('new-project');
let closeItemFormButton = document.getElementById('close-item-form');
let closeProjectForm = document.getElementById('close-project-form');
let itemForm = document.getElementById('item-form');
let projectForm = document.getElementById('project-form');
let errorDiv = document.getElementById('error-div');
let projectList = document.querySelector('.projects');
let projects = [];
let items = [];
let selectedProjectIndex = 0;
//DOM functions
function removeForms(){
    newItemFormDiv.classList.add('none');
    newProjectFormDiv.classList.add('none');
}

function toggle(){
    removeForms();
    if(this.id === 'add-item'){
        newItemFormDiv.classList.toggle('none');
    }if(this.id === 'add-project'){
        newProjectFormDiv.classList.toggle('none');
    }
    // console.log(this.innerHTML);
}
function resetForms(){
    itemForm.reset();
    projectForm.reset();
}
function close(event){
    event.preventDefault();
    resetForms();
    if(this.id === 'close-project-form'){
        newProjectFormDiv.classList.add('none');
    }
    if(this.id === 'close-item-form'){
        newItemFormDiv.classList.add('none');
    }
}

function showInvalidErrorMessage(message){
    errorDiv.textContent = message;
    errorDiv.classList.remove('none');
    setTimeout(() => {
        errorDiv.classList.add('none');
    }, 2500);
}
function getFormData(form){
    let inputs = [...form.querySelectorAll('.input-div>input')];
    let output = {}
    inputs.forEach(input=>{
        output[input.id] = input.value;
    });
    return output;
}
function addItemToProject(event){
    event.preventDefault();
    if(projects.length === 0){
        showInvalidErrorMessage("Please add a project first before adding an item to it.");
        return;
    }
    console.log(event.target);
    removeForms();
}

function addNewProject(event){
    event.preventDefault();
    let project = getFormData(projectForm);
    projects.push(project);
    refreshProjectList();
    removeForms();

}
function deleteProject(){
    let index = parseInt(this.value);
    console.log(index);
}

function renderProjectDiv(projectObject,index){
    let div = document.createElement('div');
    div.classList.add('project');
    let h3 = document.createElement('h3');
    h3.textContent = projectObject['project-name'];
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('value',`${index}`);
    deleteButton.addEventListener('click',deleteProject);
    div.append(h3);
    div.append(deleteButton);
    return div;
}

function refreshProjectList(){
    projectList.innerHTML = '';
    projects.forEach((project,index)=>{
        let div = renderProjectDiv(project,index);
        projectList.append(div);
    })
}

//Event Listeners
addItemButton.addEventListener('click',toggle);
addProjectButton.addEventListener('click',toggle);
closeItemFormButton.addEventListener('click',close);
closeProjectForm.addEventListener('click',close);

itemForm.addEventListener('submit',addItemToProject);
projectForm.addEventListener('submit',addNewProject);

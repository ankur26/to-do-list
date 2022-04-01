import './reset.css';
import './styles.css';
import { ProjectFunctions } from './projectFunctions';
import { ItemFunctions } from './itemFunctions';

export const domController = (() => {
	let mainDiv = document.querySelector('main');
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
	let itemList = document.querySelector('.items');
	let projectListDiv = document.querySelector('.project-list');
	let itemListDiv = document.querySelector('.project-item-list');
	let projectItemListHeader = document.querySelector('.project-item-list>h2');
	let priorityInput = document.getElementById('priority');
	let priorityDisplay = document.getElementById('priority-value');
	let priorities = ['Low','Normal','High','Very High'];

	const renderFunctions =( () => {

		/*
		This function is used to render an item. 
		Takes an input as an item object present in ItemFunctions 
		*/
		const renderItem = (item) => {
			let div = document.createElement('div');
			let contentDiv = document.createElement('div');
			let title = document.createElement('h3');
			let dueDate = document.createElement('p');
			let priority = document.createElement('p');
			let description = document.createElement('p');
			let buttonDiv = document.createElement('div');
			let viewItemButton = document.createElement('button');
			let deleteItemButton = document.createElement('button');
			// let markCompleteButton = document.createElement('button');

			title.textContent = `${item.getTitle()}`;
			dueDate.textContent = `${item.getDueDate()}`;
			priority.textContent = `${priorities[parseInt(item.getPriority())-1]}`;
			description.textContent = `${item.getDescription()}`;
			viewItemButton.innerText = 'View Item Description';
			deleteItemButton.innerText = 'Delete Item';

			div.classList.add('item');
			contentDiv.classList.add('content');
			buttonDiv.classList.add('item-buttons');
			title.classList.add('title');
			dueDate.classList.add('dueDate');
			priority.classList.add('priority');
			description.classList.add('description');
			description.classList.add('none');
			

			buttonDiv.dataset.id = `${item.getId()}`;
			priority.dataset.priority = `${item.getPriority()}`;
			div.dataset.priority = `${item.getPriority()}`;

			
			viewItemButton.addEventListener('click', viewItem);
			deleteItemButton.addEventListener('click', deleteItem);

			buttonDiv.append(viewItemButton);
			buttonDiv.append(deleteItemButton);
			contentDiv.append(title);
			contentDiv.append(dueDate);
			contentDiv.append(priority);
			contentDiv.append(description);
			div.append(contentDiv);
			div.append(buttonDiv);
			
			return div;
		};

		const renderProjectDiv = (projectObject, index, selected) => {
			let div = document.createElement('div');
			let h3 = document.createElement('h3');
			let deleteButton = document.createElement('button');
			let viewButton = document.createElement('button');
			h3.textContent = projectObject.getname();
			deleteButton.textContent = 'Delete';
			deleteButton.dataset.id = projectObject.getId();
			deleteButton.setAttribute('value', `${index}`);
			deleteButton.addEventListener('click', deleteProject);
			viewButton.textContent = 'View';
			viewButton.dataset.id = projectObject.getId();
			viewButton.setAttribute('value', `${index}`);
			viewButton.addEventListener('click', viewProject);
			div.classList.add('project');
			if(selected){
				div.classList.add('selected');
				selectedProjectIndex = index;
				refreshItemList(projectObject)
			}
			div.append(h3);
			div.append(viewButton);
			div.append(deleteButton);
			return div;
		};
		return {renderItem,renderProjectDiv};
	}) ();

	// let items = [];
	let selectedProjectIndex = 0;
	function removeForms() {
		newItemFormDiv.classList.add('none');
		newProjectFormDiv.classList.add('none');
		projectListDiv.classList.remove('none');
		itemListDiv.classList.remove('none');
		mainDiv.dataset.display = 'list';
	}

	function toggle() {
		removeForms();
		if (this.id === 'add-item') {
			newItemFormDiv.classList.toggle('none');
		}
		if (this.id === 'add-project') {
			newProjectFormDiv.classList.toggle('none');
		}
		projectListDiv.classList.toggle('none');
		itemListDiv.classList.toggle('none');
		mainDiv.dataset.display = 'form';

		// console.log(this.innerHTML);
	}
	function resetForms() {
		itemForm.reset();
		projectForm.reset();
	}
	function close(event) {
		event.preventDefault();
		resetForms();
		removeForms();
	}

	function showInvalidErrorMessage(message) {
		errorDiv.textContent = message;
		errorDiv.classList.remove('none');
		setTimeout(() => {
			errorDiv.classList.add('none');
		}, 2500);
	}
	function getFormData(form) {
		let inputs = [ ...form.querySelectorAll('.input-div>input') ];
		let output = {};
		inputs.forEach((input) => {
			output[input.id] = input.value;
		});
		return output;
	}
	function addItemToProject(event) {
		event.preventDefault();
		let projects = ProjectFunctions.viewProjects();
		if (projects.length === 0) {
			showInvalidErrorMessage('Please add a project first before adding an item to it.');
			return;
		}
		// console.log(event.target);
		// let item = { id: idGenerator(), ...getFormData(itemForm), projectId: projects[selectedProjectIndex].getId() };
		// items.push(item);
		let formData = { ...getFormData(itemForm) };

		ItemFunctions.addItem(
			formData.title,
			formData.duedate,
			formData.priority,
			formData.description,
			projects[selectedProjectIndex].getId()
		);
		resetForms();
		removeForms();
		refreshProjectList();
	}

	function addNewProject(event) {
		event.preventDefault();
		let projectName = document.getElementById('project-name');
		ProjectFunctions.addProject(projectName.value);
		refreshProjectList();
		resetForms();
		removeForms();
	}
	function deleteProject() {
		let index = parseInt(this.value);
		if (selectedProjectIndex === index) {
			selectedProjectIndex = 0;
		}
		ProjectFunctions.deleteProject(this.dataset.id);
		refreshProjectList();
	}

	function viewProject() {
		let index = parseInt(this.value);
		selectedProjectIndex = index;
		refreshProjectList();
	}

	function viewItem() {
		let desc = this.parentNode.parentNode.querySelector('.none.description') || this.parentNode.parentNode.querySelector('.description');
		// console.log(this);
		if (this.parentNode.parentNode.querySelector('.none.description')) {
			this.innerHTML = 'Close Item Description';
		} else {
			this.innerHTML = 'View Item Description';
		}
		desc.classList.toggle('none');
	}

	function deleteItem() {
		let id = this.parentNode.dataset.id;
		ItemFunctions.deleteItem(id);
		refreshProjectList();
	}

	function showPriorityMessage(){
		console.log(this.value)
		priorityDisplay.textContent = priorities[parseInt(this.value)-1];
		priorityDisplay.dataset.priority = `${this.value}`;
	}

	function refreshItemList(project) {
		let projects = ProjectFunctions.viewProjects();
		itemList.innerHTML = '';
		if (project) {
			let name = project.getname();
			let items = ItemFunctions.viewItems(project.getId());
			items.forEach((i) => {
				let itemDiv = renderFunctions.renderItem(i);
				itemList.append(itemDiv);
			});
			projectItemListHeader.textContent = `Items for ${name}`;
		} else {
			if (projects.length === 0) {
				projectItemListHeader.textContent = `No projects defined, please create one`;
			}
		}
	}

	function refreshProjectList() {
		projectList.innerHTML = '';
		let projects = ProjectFunctions.viewProjects();
		if (projects.length > 0) {
			addItemButton.removeAttribute('disabled');
			if (selectedProjectIndex > 0 && projects.length === 1) {
				selectedProjectIndex = 0;
				refreshItemList(projects[0]);
			}
			projects.forEach((project, index) => {
				let div = renderFunctions.renderProjectDiv(project, index,selectedProjectIndex === index);
				projectList.append(div);
			});
		} else {
			addItemButton.setAttribute('disabled', '');
			refreshItemList();
		}
	}

	//Event Listeners
	function initialize() {
		addItemButton.addEventListener('click', toggle);
		addProjectButton.addEventListener('click', toggle);
		closeItemFormButton.addEventListener('click', close);
		closeProjectForm.addEventListener('click', close);

		itemForm.addEventListener('submit', addItemToProject);
		projectForm.addEventListener('submit', addNewProject);
		priorityInput.addEventListener('input',showPriorityMessage);

		refreshProjectList();
	}

	return { initialize };
})();

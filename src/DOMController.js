
import './reset.css';
import './styles.css';

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
	let projects = [];
	let items = [];
	let selectedProjectIndex = 0;

	function idGenerator() {
		let id = `${Math.floor(Math.random() * 10000000) + 1}${new Date().toDateString()}`;
		return id;
	}
	function removeForms() {
		newItemFormDiv.classList.add('none');
		newProjectFormDiv.classList.add('none');
		projectListDiv.classList.remove('none');
		itemListDiv.classList.remove('none');
		mainDiv.dataset.display = "list";
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
		mainDiv.dataset.display = "form";

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
		if (projects.length === 0) {
			showInvalidErrorMessage('Please add a project first before adding an item to it.');
			return;
		}
		console.log(event.target);
		let item = { id: idGenerator(), ...getFormData(itemForm), projectId: projects[selectedProjectIndex].id };
		items.push(item);
		resetForms();
		removeForms();
		refreshProjectList();
	}

	function addNewProject(event) {
		event.preventDefault();
		let project = { id: idGenerator(), ...getFormData(projectForm) };
		projects.push(project);
		refreshProjectList();
		resetForms();
		removeForms();
	}
	function deleteProject() {
		let index = parseInt(this.value);
		if (selectedProjectIndex === index) {
			selectedProjectIndex = 0;
		}
		projects.splice(index, 1);
		refreshProjectList();
	}

	function viewProject() {
		let index = parseInt(this.value);
		selectedProjectIndex = index;
		refreshProjectList();
	}

	function viewItem() {
		let desc = this.parentNode.querySelector('.none.description') || this.parentNode.querySelector('.description');
		console.log(this);
		if (this.parentNode.querySelector('.none.description')) {
			this.innerHTML = 'Close Item Description';
		} else {
			this.innerHTML = 'View Item Description';
		}
		desc.classList.toggle('none');
	}

	function deleteItem() {
		let id = this.dataset.id;
		items = items.filter((i) => i.id !== id);
		refreshProjectList();
	}

	function renderItem(item) {
		let div = document.createElement('div');
		let titlePriorityDate = document.createElement('h3');
		let description = document.createElement('p');
		let viewItemButton = document.createElement('button');
		let deleteItemButton = document.createElement('button');

		titlePriorityDate.textContent = `${item.title} Due:${item.date} Priority:${item.priority}`;
		description.textContent = `${item.description}`;
		viewItemButton.innerText = 'View Item Description';
		viewItemButton.dataset.id = `${item.id}`;
		viewItemButton.addEventListener('click', viewItem);
		deleteItemButton.innerText = 'Delete Item';
		deleteItemButton.dataset.id = `${item.id}`;
		deleteItemButton.addEventListener('click', deleteItem);

		div.classList.add('item');
		description.classList.add('none');
		description.classList.add('description');

		div.append(titlePriorityDate);
		div.append(description);
		div.append(viewItemButton);
		div.append(deleteItemButton);

		return div;
	}

	function refreshItemList(project) {
		if (project) {
			itemList.innerHTML = '';
			let id = project.id;
			let name = project['project-name'];
			items.forEach((i) => {
				if (i.projectId == id) {
					let itemDiv = renderItem(i);
					itemList.append(itemDiv);
				}
			});
			projectItemListHeader.textContent = `Items for ${name}`;
		} else {
			if (projects.length === 0) {
				projectItemListHeader.textContent = `No projects defined, please create one`;
			}
		}
	}

	function renderProjectDiv(projectObject, index) {
		let div = document.createElement('div');
		let h3 = document.createElement('h3');
		let deleteButton = document.createElement('button');
		let viewButton = document.createElement('button');
		h3.textContent = projectObject['project-name'];
		deleteButton.textContent = 'Delete';
		deleteButton.dataset.id = projectObject.id;
		deleteButton.setAttribute('value', `${index}`);
		deleteButton.addEventListener('click', deleteProject);
		viewButton.textContent = 'View';
		viewButton.dataset.id = projectObject.id;
		viewButton.setAttribute('value', `${index}`);
		viewButton.addEventListener('click', viewProject);
		div.classList.add('project');
		div.append(h3);
		div.append(viewButton);
		div.append(deleteButton);
		return div;
	}

	function refreshProjectList() {
		projectList.innerHTML = '';

		if (projects.length > 0) {
			addItemButton.removeAttribute('disabled');
			if (selectedProjectIndex > 0 && projects.length === 1) {
				selectedProjectIndex = 0;
				refreshItemList(project[0]);
			}
			projects.forEach((project, index) => {
				let div = renderProjectDiv(project, index);
				if (index === selectedProjectIndex) {
					div.classList.add('selected');
					refreshItemList(project);
				}
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

		refreshProjectList();
	}

	return { initialize };
})();

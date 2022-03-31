import { v4 as uuidv4 } from 'uuid';

const ItemFunctions = ( ()=>{
    let items = [];
    const item = (title,duedate,priority,description,projectId) => {
        let id = uuidv4();
        const getId = () => id;
        const getTitle = () =>  title;
        const setTitle = (newTitle) => {title  = newTitle};
        const getPriority = () => priority;
        const setPriority = (newPriority) => {priority = newPriority};
        const getDueDate = () => duedate;
        const setDueDate = (newDueDate) => {duedate = newDueDate};
        const getDescription = () => description;
        const setDescription = (newDescription) => {description = newDescription};
        const getProjectId = () => projectId;
        
        return {getId,getTitle,setTitle,getPriority,setPriority,getDueDate,setDueDate,getDescription,setDescription,getProjectId};
    };

    const renderItem = (item) => {
		let div = document.createElement('div');
		let titlePriorityDate = document.createElement('h3');
		let description = document.createElement('p');
		let viewItemButton = document.createElement('button');
		let deleteItemButton = document.createElement('button');

		titlePriorityDate.textContent = `${item.getTitle()} Due:${item.getDueDate()} Priority:${item.getPriority()}`;
		description.textContent = `${item.getDescription()}`;
		viewItemButton.innerText = 'View Item Description';
		viewItemButton.dataset.id = `${item.getId()}`;
		viewItemButton.addEventListener('click', viewItem);
		deleteItemButton.innerText = 'Delete Item';
		deleteItemButton.dataset.id = `${item.getId()}`;
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
    const addItem = (title,duedate,priority,description,projectId) =>{
        items.push(item(title,duedate,priority,description,projectId));
    }

    const updateItem = (id,title,duedate,priority,description) => {
        items.forEach(i=>{
            if (i.getId() === id){
                i.setTitle(title);
                i.setDueDate(duedate);
                i.setDescription(description);
                i.setPriority(priority);
            }
        });
    };

    const deleteItem = (id) => {
        items = items.filter(i=>i.getId()!=id);
    }

    const viewItems = (projectId) => {
        return items.filter(i => i.getProjectId() === projectId);
    }

    return {addItem,updateItem,deleteItem,viewItems,renderItem};
} )();

export { ItemFunctions };
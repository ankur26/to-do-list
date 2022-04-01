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

    return {addItem,updateItem,deleteItem,viewItems};
} )();

export { ItemFunctions };
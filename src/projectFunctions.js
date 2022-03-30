import { v4 as uuidv4 } from 'uuid';

const ProjectFunctions = ( ()=>{
    
    let projects = [];
    
    const project = (name)=>{
        const id = uuidv4();
        const getId = () => id;
        const getname = () => name;
        const setname = (newName) => { name = newName;};
        return {getname,setname,getId}; 
    };
    const viewProjects = () => {
        return projects;
    };
    const addProject = ( name ) => {
        projects.push(project(name));
    };
    const deleteProject = ( id ) => {
        projects = projects.filter(p=>p.getId()!=id);
    };
    const updateProject = ( id,name ) => {
        if (id && name){
            projects.forEach(p=>{
                if(p.getId() === id){
                    p.setname(name);
                }
            });
        }
    };
    return {viewProjects,addProject,deleteProject,updateProject};
})();

export {ProjectFunctions};

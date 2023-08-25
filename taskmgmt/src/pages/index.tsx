import TaskList from "../component/TaskList";
import Header from "../component/Header";
import CreateTaskForm from "../component/CreateTaskForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEditForm ,getToastMessage } from "../utils/storeReducer";

export default function Home() {

  const [formVisible, SetFormVisible] = useState(false);
  const [editTaskId, SetEditTaskId] = useState(null);
  const [notification, setNotification] = useState(null);

  let editTask = useSelector(getEditForm);
  let toastMessage = useSelector(getToastMessage);

  useEffect(() => {
    if(toastMessage!=null){
      console.log("TASK",toastMessage);
      // SetFormVisible(true);
    }
  },[toastMessage]);

  const openCreateForm = () => {
    SetFormVisible(true);
    SetEditTaskId(null);
  };

  const closeCreateForm = () => {
    SetFormVisible(false);
    SetEditTaskId(null);
  }

  const editButtonClick = (taskId:any) => {
    SetFormVisible(true);
    SetEditTaskId(taskId);
  }

  return (
    <div>
      <Header onCreateButtonClick={openCreateForm}></Header>
      <div className="grid">
        <div className="row-start-1 col-span-1 h-[60vh]"></div>
        <div className="row-start-1 col-span-1 h-[60vh]">
         
          <TaskList onEditClick={editButtonClick}></TaskList>
          
          <div className={`${formVisible ? '' : 'hidden'}`}>
            
            <CreateTaskForm editTaskId={editTaskId} onCloseButtonClick={closeCreateForm}></CreateTaskForm>
            
          </div>
        </div>
        <div className="row-start-1 col-span-1 h-[60vh]"></div>
      </div>

      {notification && (
        <div id="toast-top-right" className="fixed flex items-center w-full max-w-xs p-4 space-x-4 bg-green divide-x divide-gray-200 rounded-lg shadow top-5 right-5 space-x 
        ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }" role="alert">
          <div className="text-sm font-normal text-white">Top right positioning.</div>
        </div>
      )}


          

    </div>
    
  );
}


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCreateFormStatus  , getEditFormData} from '../utils/storeReducer';
import taskService  from '../services/task.service';

const CreateTaskForm: React.FC = ({editTaskId,onCloseButtonClick}) => {

    let taskApi = new taskService();
    let getEditForm = useSelector(getEditFormData);

    const [formData, setFormData] = useState({
        Title : '',
        Description : '',
        StartDate : '',
        EndDate : '',
        CreatedDate : new Date(),
        AssignedTo : '',
        TaskId : Math.floor(Math.random() * 10000),
        Status : '',
        CreatedBy: 'ashish'
      });

    useEffect(() => {
        if(editTaskId!=null){
            taskApi.getTask(editTaskId);
        }
      }, [editTaskId]); 

      useEffect(() => {
        if(getEditForm != null){
            setFormData({
                Title : getEditForm.Title,
                Description : getEditForm.Description,
                StartDate : getEditForm.StartDate?setInputDate(new Date(getEditForm.StartDate.seconds * 1000)):'',
                EndDate : getEditForm.EndDate?setInputDate(new Date(getEditForm.EndDate.seconds * 1000)):'',
                CreatedDate : new Date(getEditForm.CreatedDate.seconds * 1000),
                AssignedTo : getEditForm.AssignedTo,
                TaskId : getEditForm.TaskId,
                Status : getEditForm.Status,
                CreatedBy : 'ashish',
            });
        }
      }, [getEditForm]); 

      function setInputDate(date:any){
        var now = new Date(date);
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var inputDate = now.getFullYear()+"-"+(month)+"-"+(day) ;
        return inputDate;
      }


      const handleChange = (event:any) => {
        const { name, value ,type} = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const onFormSubmit = (event:any) => {
        event.preventDefault();
        let finalForm = formData;
        if(finalForm.StartDate){
            finalForm.StartDate = new Date(formData.StartDate);
        }
        if(finalForm.EndDate){
            finalForm.EndDate = new Date(formData.EndDate);
        }
        if(editTaskId){
            taskApi.editTask(finalForm,editTaskId);
        }else{
            taskApi.addTask(finalForm);
        }

        taskApi.getTaskList();
        onCloseButtonClick();
      }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white pt-5 rounded-lg shadow-lg z-10 w-80">
                <div
                  id="defaultModal"
                  aria-hidden="true"
                  className=" p-0 overflow-x-hidden overflow-y-auto "
                >
                  <div className="relative ">
                    <form id="taskForm">
                      <div
                        className="w-80 inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all "
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                      >
                        <div className="bg-white px-4 ">
                          <div className="mb-6">
                              <label className="block mb-2 font-medium ">
                                Task Name:
                                <input
                                  name="Title"
                                  value={formData.Title}
                                  onChange={handleChange}
                                  className="border rounded-lg  block w-full p-2.5 "
                                  type="text"
                                />
                              </label>
                          </div>
                          <div className="mb-6">
                            <label className="block mb-2 font-medium ">
                                Description:
                                <input
                                  name="Description"
                                  value={formData.Description}
                                  onChange={handleChange}
                                  className="border rounded-lg  block w-full p-2.5 "
                                  type="text"
                                />
                              </label>
                          </div>
                          <div className="mb-6">
                            <label className="block mb-2 font-medium ">
                                Start Date:
                                <input
                                  name="StartDate"
                                  value={formData.StartDate}
                                  onChange={handleChange}
                                  className="border rounded-lg  block w-full p-2.5 "
                                  type="date"
                                />
                              </label>
                          </div>
                          <div className="mb-6">
                            <label className="block mb-2 font-medium ">
                                Due Date:
                                <input
                                  name="EndDate"
                                  value={formData.EndDate}
                                  onChange={handleChange}
                                  className="border rounded-lg  block w-full p-2.5 "
                                  type="date"
                                />
                              </label>
                          </div>
                          <div className="mb-6">
                            <label className="block mb-2 font-medium ">
                                Assign To:
                                <input
                                  name="AssignedTo"
                                  value={formData.AssignedTo}
                                  onChange={handleChange}
                                  className="border rounded-lg  block w-full p-2.5 "
                                  type="text"
                                />
                              </label>
                          </div>
                        </div>
                        <div className="mb-6">
                          <p className="block text-center w-full mb-2  font-medium  text-red-600 dark:text-red-500">
                            {/* Error Message here */}
                          </p>
                        </div>
                        <div className="bg-gray-200 px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={onCloseButtonClick}
                            className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2">
                            <i className="fas fa-times"></i> Cancel
                          </button>
                          <button
                            type="submit"
                            onClick={onFormSubmit}
                            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2">
                            <i className="fas fa-plus"></i> Create
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
  );
};

export default CreateTaskForm;

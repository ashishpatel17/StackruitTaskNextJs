/* eslint-disable react/jsx-key */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEditForm , getTaskList } from '../utils/storeReducer';
import taskService  from '../services/task.service';

const TaskList: React.FC = ({onEditClick}) => {
    let src = new taskService();
    let dispatch = useDispatch();
    let taskLists = [];
    taskLists = useSelector(getTaskList);

    
    useEffect(() => {
        const fetchData = async () => {
            await src.getTaskList();
        }
        fetchData();
    },[])

    const formatDate = (date:any) => {
        let conDate = new Date(date.seconds * 1000);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        const formattedDate = conDate.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    const deleteTask = async (taskId:any) =>{
        src.deleteTask(taskId);
        await src.getTaskList();
    }

    const editTask = async (taskId:any) =>{
        onEditClick(taskId);
    }

    const onStatusChange = async (event:any,id:any)=>{
        src.editTask({Status:event.target.value},id);
        // await src.getTaskList();
    }

   

  return (
    <div>
        
      {taskLists.map((item:any, index:any) => (
        <div>
            <br></br>
            <div className="block min-w-full max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="grid font-bold tracking-tight text-gray-900 dark:text-white border-b-2 border-blue-500 pb-5">
                    <div className="row-start-1 col-span-7">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.Title}
                        </h5>
                        <p  className="font-normal text-gray-700 dark:text-gray-400">
                            Description : {item.Description}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Created by : {item.CreatedBy}
                        </p>
                    </div>
                    <div className="row-start-1 col-span-1">
                        <div className="flex space-between ">
                            <div className="w-1/2 mt-4  text-right"> 
                                Status : 
                            </div>
                            <div className="w-4/5">
                                <select  id="taskStatus" 
                                value = {item.Status}
                                onChange = {(e)=>onStatusChange(e,item.id)}
                            className="float-right bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="ideal">-- select status --</option>
                            <option value="pending">Pending</option>
                            <option value="inprogress">In-progress</option>
                            <option value="complete">Complete</option>
                        </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div  className="pt-2 mx-auto font-normal text-gray-700 dark:text-gray-400 ">
                    <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-6">
                        <div  className="flex"><label >Created Date :  {item.CreatedDate ? formatDate(item.CreatedDate):''} </label></div>
                        <div  className="flex"><label >Start Date :  {item.StartDate ? formatDate(item.StartDate):''} </label></div>
                        <div  className="flex"><label >Due Date :  {item.EndDate ? formatDate(item.EndDate):''} </label></div>
                        <div className="flex justify-end">
                            <button  onClick={() => editTask(item.id)}>
                                <svg className="mr-2 cursor-ponter" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" ><circle cx="75.5" cy="27.5" r="8.5" fill="#4b4dff"/><path fill="#4343bf" d="M75.5,39c-6.341,0-1.622-1.271-1.622-7.612c0-3.729-8.076-10.925-5.316-13.028 C70.495,16.888,72.889,16,75.5,16C81.841,16,87,21.159,87,27.5c0,2.708-0.733,5.493-2.514,7.274C84.114,35.146,79.132,39,75.5,39z M75.5,22c-3.032,0-5.5,2.468-5.5,5.5s2.468,5.5,5.5,5.5s5.5-2.468,5.5-5.5S78.532,22,75.5,22z"/><rect width="13.435" height="59" x="43.282" y="20.5" fill="#4b4dff" transform="rotate(45.001 50 50)"/><path fill="#4343bf" d="M36.967,82.032L19.998,66.071L68.49,18.42l15.17,16.306L36.967,82.032z M28.646,65.968l8.164,7.682 l38.551-39.057l-7.118-7.687L28.646,65.968z"/><polygon fill="#3abcf8" points="40.992,77.954 33.983,70.946 70.327,34.602 61.342,25.412 68.49,18.42 84.486,34.774"/><polygon fill="#ff8405" points="20,66 20,82 37,82"/></svg>
                            </button>
                            <button  onClick={() => deleteTask(item.id)}>
                                <svg className="cursor-ponter" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" ><path fill="#f37e98" d="M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30"/><path fill="#f15b6c" d="M65 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S65 36.35 65 38zM53 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S53 36.35 53 38zM41 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S41 36.35 41 38zM77 24h-4l-1.835-3.058C70.442 19.737 69.14 19 67.735 19h-35.47c-1.405 0-2.707.737-3.43 1.942L27 24h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h54c1.657 0 3-1.343 3-3S78.657 24 77 24z"/><path fill="#1f212b" d="M66.37 83H33.63c-3.116 0-5.744-2.434-5.982-5.54l-3.645-47.383 1.994-.154 3.645 47.384C29.801 79.378 31.553 81 33.63 81H66.37c2.077 0 3.829-1.622 3.988-3.692l3.645-47.385 1.994.154-3.645 47.384C72.113 80.566 69.485 83 66.37 83zM56 20c-.552 0-1-.447-1-1v-3c0-.552-.449-1-1-1h-8c-.551 0-1 .448-1 1v3c0 .553-.448 1-1 1s-1-.447-1-1v-3c0-1.654 1.346-3 3-3h8c1.654 0 3 1.346 3 3v3C57 19.553 56.552 20 56 20z"/><path fill="#1f212b" d="M77,31H23c-2.206,0-4-1.794-4-4s1.794-4,4-4h3.434l1.543-2.572C28.875,18.931,30.518,18,32.265,18h35.471c1.747,0,3.389,0.931,4.287,2.428L73.566,23H77c2.206,0,4,1.794,4,4S79.206,31,77,31z M23,25c-1.103,0-2,0.897-2,2s0.897,2,2,2h54c1.103,0,2-0.897,2-2s-0.897-2-2-2h-4c-0.351,0-0.677-0.185-0.857-0.485l-1.835-3.058C69.769,20.559,68.783,20,67.735,20H32.265c-1.048,0-2.033,0.559-2.572,1.457l-1.835,3.058C27.677,24.815,27.351,25,27,25H23z"/><path fill="#1f212b" d="M61.5 25h-36c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h36c.276 0 .5.224.5.5S61.776 25 61.5 25zM73.5 25h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5S73.776 25 73.5 25zM66.5 25h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S66.776 25 66.5 25zM50 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v25.5c0 .276-.224.5-.5.5S52 63.776 52 63.5V38c0-1.103-.897-2-2-2s-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2v-3.5c0-.276.224-.5.5-.5s.5.224.5.5V73C53 74.654 51.654 76 50 76zM62 76c-1.654 0-3-1.346-3-3V47.5c0-.276.224-.5.5-.5s.5.224.5.5V73c0 1.103.897 2 2 2s2-.897 2-2V38c0-1.103-.897-2-2-2s-2 .897-2 2v1.5c0 .276-.224.5-.5.5S59 39.776 59 39.5V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C65 74.654 63.654 76 62 76z"/><path fill="#1f212b" d="M59.5 45c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2C60 44.776 59.776 45 59.5 45zM38 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C41 74.654 39.654 76 38 76zM38 36c-1.103 0-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2V38C40 36.897 39.103 36 38 36z"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      ))}
    
  </div>

  );
};

export default TaskList;

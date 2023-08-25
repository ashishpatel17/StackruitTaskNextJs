import {getFirestore,collection,getDoc,doc,getDocs,addDoc,deleteDoc,updateDoc} from 'firebase/firestore'
import {initializeApp} from 'firebase/app'
import firebaseConfig from '../firebase';
import {setTaskList,setEditFormData,setToastMessage} from  '../utils/storeReducer';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../firebase';

class taskService {
    db:any;
    colRef:any;
    dispatch = useDispatch();
    constructor(){
        // Initialize Firebase
        initializeApp(firebaseConfig);
        this.db = getFirestore();
        this.colRef = collection(this.db,'TaskManagement');
    }

    async getTaskList(){
        let allTodos = await getDocs(this.colRef);
        let allTasks:any = [];
        allTodos.forEach((doc)=>{
            allTasks.push({ ...doc.data() , id : doc.id});
        })
        this.dispatch(setTaskList({taskList:allTasks}));
    }

    async getTask(taskId:any){
        const docRef = doc(this.db, "TaskManagement", taskId);
        const itemRef = await getDoc(docRef);
        this.dispatch(setEditFormData({editFormData:itemRef.data()}));
    }

    async editTask(taskObj:any,editTaskId:any){
        const docToUpdate= doc(this.db,'TaskManagement',editTaskId);
        try{
            let constResult = await updateDoc(docToUpdate,taskObj);
            this.dispatch(setToastMessage({type:"success",message:"task details updated"}));
        }catch(e){
            this.dispatch(setToastMessage({type:"error",message:"failed to update task"}));
        }
    }

    async addTask(newTaskObj:any){
        try{
            let newTaskRes = await addDoc(this.colRef,newTaskObj);
            this.dispatch(setToastMessage({type:"success",message:"new task created"}));
        }catch(e){
            this.dispatch(setToastMessage({type:"error",message:"failed to create task"}));
        }
    }


    async deleteTask(taskId:any){
        const docToDelete = doc(this.db,'TaskManagement',taskId);
        try{
            let taskDeleted = await deleteDoc(docToDelete);
            this.dispatch(setToastMessage({type:"success",message:"task deleted"}));
        }catch(e){
            this.dispatch(setToastMessage({type:"error",message:"failed to delete task"}))
        }
    }
}

export default taskService;
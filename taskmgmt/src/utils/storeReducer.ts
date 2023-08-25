import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import taskService  from '../services/task.service';

const initialState = {
  showForm : false,
  editForm : null,
  editFormData : null,
  toastMessage : null,
  taskList : []
} as const;

export const appStoreSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCreateForm: (state,action) => {
      state.showForm = action.payload.showForm;
    },
    setEditForm: (state,action) => {
        state.editForm = action.payload.editForm;
    },
    setEditFormData: (state,action) => {
        state.editFormData = action.payload.editFormData;
    },
    setTaskList: (state,action) => {
        state.taskList = action.payload.taskList;
    },
    setToastMessage: (state,action) => {
        state.toastMessage = action.payload.toastMessage;
    }
  },
});

// Selectors
export const getCreateFormStatus = (state:any) => state.stateStore.showForm;
export const getTaskList = (state:any) => state.stateStore.taskList;
export const getEditForm = (state:any) => state.stateStore.editForm;
export const getEditFormData = (state:any) => state.stateStore.editFormData;
export const getToastMessage = (state:any) => state.stateStore.toastMessage;

// Reducers and actions
export const { setCreateForm , setTaskList , setEditForm , setEditFormData , setToastMessage } = appStoreSlice.actions;

export default appStoreSlice.reducer;
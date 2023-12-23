import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState={
    loading:false,
    error:false,
    tasksArray:[],
    inputModal:'',
    selectedPriority:'',
    
    
   


}
export const taskFetch=createAsyncThunk('tasks',async(url)=>
 {
    const res= await axios.get(url)
    
    return res?.data
   
   
})

const formSlice=createSlice(
    {
        name:'form',
        initialState,
        reducers:
        {
            setInputModal(state, action) {
                state.inputModal = action.payload
              },
              setSelectedPriority(state, action) {
                state.selectedPriority = action.payload
              },
              addTask(state, action) {
                const newTask = { ...action.payload, status: 'To Do', progress: null }

                state.tasksArray.push(newTask)
              },
              deleteTask(state,action)
              {
                state.tasksArray = state.tasksArray.filter((task) => task.id !== action.payload)
              },
              updateTask(state, action) {
                const { id, data } = action.payload;
                return {
                  ...state,
                  tasksArray: state.tasksArray.map(task => {
                    if (task.id === id) {
                      
                      return {
                        ...task,
                        ...data 
                      };
                    }
                    return task; 
                  })
                };
              },
              AddProgressStatus(state, action) {
                const { taskId, status, progress } = action.payload;
                const taskToUpdate = state.tasksArray.find(task => task.id === taskId);
              
                if (taskToUpdate) {
                  taskToUpdate.status = status;
                  taskToUpdate.progress = progress;
                }
              }
              
              
             
              
              },
        extraReducers:(builder)=>{
            builder
            .addCase(taskFetch.pending ,(state,action)=>
            {
                state.error=null
                state.isloading=true
            })
            .addCase(taskFetch.fulfilled ,(state,action)=>
            {
                
                state.error=false
                state.tasksArray=action.payload
                
                state.loading=false
            })
            
            .addCase(taskFetch.rejected ,(state,action)=>
            {
                
                state.error=true
                state.loading=false
            },

)}}

    
)
export  const {setInputModal,setSelectedPriority,addTask,updateTask,deleteTask,AddProgressStatus}=formSlice.actions
export default formSlice.reducer
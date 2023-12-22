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
                state.tasksArray.push(action.payload)
              },
              deleteTask(state,action)
              {
                state.tasksArray = state.tasksArray.filter((task) => task.id !== action.payload);
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

)}

    }
)
export  const {setInputModal,setSelectedPriority,addTask,updateTask,deleteTask}=formSlice.actions
export default formSlice.reducer
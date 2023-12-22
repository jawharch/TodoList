import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import ToDoList from './components/toDoList';
import './App.css'

function App() {
  
  return (
    <div className='mx-auto max-w-full px-4 sm:px-6 lg:px-8 w-full md:max-w-3xl'>
      <div className='my-12'>
      <div className='flex items-center justify-between'>
        <h2 className='text-0a1629 text-4xl font-bold'>Task List</h2>
        <button className='bg-[#713fff] text-white rounded-lg shadow-md hover:shadow-lg focus:outline-none px-8 py-3 font-semibold cursor-pointer text-base '>
          
            <AddIcon />


          
          Add Task
        </button>

      </div>
      

      <div className='my-12'>
        <ToDoList/>
        <ToDoList/>
        <ToDoList/>
        <ToDoList/>
        <ToDoList/>
        
        

      </div>
      </div>
    </div>
  )
}

export default App

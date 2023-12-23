import { useState,useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import ToDoList from './components/toDoList';
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from './redux/modalSlice';
import { setInputModal, setSelectedPriority, taskFetch,addTask,updateTask,AddProgressStatus } from './redux/formSlice';
import { closedeletedModal } from './redux/deletemodalSlice';
import axios from 'axios'
import { deleteTask } from './redux/formSlice';
function App() {

  const dispatch=useDispatch()
  const {showModal,ModalType,taskIdToUpdate}=useSelector(state=>state.modal)
  const {selectedPriority,inputModal,tasksArray}=useSelector(state=>state.form)
  const {showdeleteModal,taskIdToDelete}=useSelector(state=>state.deletemodal)


  const handlePriorClick=(value)=>
  {
    
    dispatch(setSelectedPriority(value))

  }
  const handleAddClick=async(e)=>
  {
    
    dispatch(
      AddProgressStatus({
        taskId: taskIdToUpdate,
        stat: 'To Do',
        prog: null,
      }))
    
    e.preventDefault()
    const data={
      task_name: inputModal, 
      priority: selectedPriority
    }
    try {
      const res=await axios.post('http://localhost:3000/api/create-task',data)
      dispatch(addTask(res.data))
      
      dispatch(closeModal())
      dispatch(setInputModal(''))
      
      
      dispatch(setSelectedPriority('low'))
      


      
    } catch (error) {
      console.log(error.message)
      
    }
  }
  useEffect(() => {
    const url='http://localhost:3000/api/tasks'
  
   dispatch(taskFetch(url))
  }, [dispatch])

  const handleDeleteTask=async()=>
  {

    try {
      const res=await axios.delete(`http://localhost:3000/api/delete-task/${taskIdToDelete}`)
      console.log(res.data)
      dispatch(closedeletedModal())
      dispatch(deleteTask(taskIdToDelete))
      dispatch(setInputModal(""))



      
    } catch (error) {
      console.log(error.message)
      
    }

  }
  const handleEditClick=async(e)=>
  {
    
    e.preventDefault()

    const data={
      task_name: inputModal, 
      priority: selectedPriority
    }
    try {
      
      const res=await axios.put(`http://localhost:3000/api/update-task/${taskIdToUpdate}`,data)
      
      dispatch(updateTask({id:taskIdToUpdate,data:res.data}))
      dispatch(closeModal())
      const updatedTask = res.data; 

      dispatch(AddProgressStatus({
        taskIdToUpdate,
        status: updatedTask.status,
        progress: updatedTask.progress,
      }));
      
      

      
    } catch (error) {
      console.log(error)
      
    }

  }
  const handle=()=>
  {
    dispatch(openModal({type:'create'}))
    dispatch(setInputModal(''))



  }
 
  return (
    <div className='mx-auto max-w-full px-4 sm:px-6 lg:px-8 w-full md:max-w-3xl'>
      <div className='my-12'>
      <div className='flex items-center justify-between'>
        <h2 className='text-0a1629 text-4xl font-bold'>Task List</h2>
        <button onClick={handle
        } className='bg-[#713fff] text-white rounded-lg shadow-md hover:shadow-lg focus:outline-none px-8 py-3 font-semibold cursor-pointer text-base '>
          
            <AddIcon />


          
          Add Task
        </button>

      </div>
      

      <div className='my-12'>
       {
        tasksArray.length>0 ?(
          [...tasksArray].reverse().map((task,index)=>
         (
          <ToDoList key={index} task={task}  />
         ))

        ): 'NO TASKS :('
       
       }
        
        

      </div>
      </div>


      {
        showModal  && 
        (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
  <div className="bg-white rounded-2xl shadow-2xl py-8 px-10 sm:px-16 max-w-2xl w-full">
    <form>
      <div>
        <div className='flex justify-between items-center'>
          <span className='text-[#121212] text-3xl font-bold '>
            {ModalType==='create' ? 'Add Task':'Edit Task'}
          </span>
          <svg onClick={()=>dispatch(closeModal())} width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"  className='cursor-pointer'><path  d="M16.0456 0.716817C15.603 0.302896 14.9103 0.302151 14.4668 0.715119L8.49994 6.27064L2.53309 0.715122C2.08954 0.302153 1.39691 0.302898 0.954273 0.716819L0.898833 0.768663C0.41891 1.21745 0.419741 1.97264 0.900651 2.4204L6.76795 7.88323L0.900653 13.3461C0.419743 13.7938 0.418912 14.549 0.898835 14.9978L0.954275 15.0496C1.39691 15.4636 2.08955 15.4643 2.53309 15.0513L8.49994 9.49582L14.4668 15.0513C14.9103 15.4643 15.603 15.4636 16.0456 15.0496L16.101 14.9978C16.581 14.549 16.5801 13.7938 16.0992 13.3461L10.2319 7.88323L16.0992 2.4204C16.5801 1.97264 16.581 1.21745 16.101 0.768661L16.0456 0.716817Z" fill="#0A1629"></path></svg>
        </div>
        <div className="mt-4">
          <label className='text-[#7d8592] text-lg block font-bold mb-2'>Task</label>
          <input
            type="text"
            value={inputModal}
            placeholder="Type your task here..."
            className="bg-white border border-solid border-gray-300 rounded-lg shadow-sm font-normal outline-none px-4 py-4 w-full"
            onChange={(e)=>dispatch(setInputModal(e.target.value))}
            />
        </div>

        <div className='mt-5'>
          <span className='text-gray-700 text-sm font-semibold'>
          Priority
          </span>
          <ul className='flex gap-6 mt-5 justify-center'>
            <li  className= {`border border-solid border-red-500 text-red-500 rounded-lg cursor-pointer text-base font-medium py-2 px-4 text-center uppercase w-24 border border-solid border-gray-300 ${
              selectedPriority==='high' ? 'bg-red-600 text-white':''
            }`}  onClick={()=>handlePriorClick('high')} >high</li>
            <li  className={`border border-solid border-yellow-500 text-yellow-500 rounded-lg cursor-pointer text-base font-medium py-2 px-4 text-center uppercase w-24 border border-solid border-gray-300 ${
              selectedPriority==='medium' ? ' bg-yellow-500  text-[#ffff]': ''
            }`}
            onClick={()=>handlePriorClick('medium')}>medium</li>
            <li  className={`border border-solid border-green-500 text-green-500 rounded-lg cursor-pointer text-base font-medium py-2 px-4 text-center uppercase w-24 border border-solid border-gray-300
            ${
              selectedPriority==='low' ? 'bg-green-500 text-white ':''
            } 
            
            
            `} onClick={()=>handlePriorClick('low')}>low</li>
            </ul>


        </div>


        <div className='flex justify-end mt-12'>
          <button type='submit' onClick={ ModalType==='create'? handleAddClick:handleEditClick} disabled={!inputModal && ModalType==='create'} className='bg-purple-600 rounded-lg shadow-md text-white cursor-pointer text-base font-semibold outline-none py-3 px-8 disabled:cursor-not-allowed disabled:bg-[#7d8592]'>
          {ModalType==='create' ? 'Add ':'Edit '}

          </button>

        </div>
      </div>
    </form>
  </div>
</div>

        )
      }
      {
        showdeleteModal &&
       ( 
       <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50"'>
        <div className='bg-white rounded-3xl shadow-xl p-16 min-h-200px w-2/5 mx-auto my-24'>
          <div className='mx-auto max-w-300px'>
            <p className='text-black text-2xl font-semibold leading-6 text-center'>Are you sure you want to delete this task?</p>
            <div className='flex justify-center gap-6 mt-8'>
              <button onClick={handleDeleteTask} className='bg-[#713fff] rounded-lg shadow-md text-white cursor-pointer text-base font-semibold outline-none py-3 px-8'>Delete</button>
              
              <button onClick={()=>dispatch(closedeletedModal())} className=' rounded-lg border border-solid border-[#d8e0f0] text-[#7d8592] cursor-pointer  shadow-sm font-normal outline-none py-3 px-8'>Cancel</button>

            </div>

          </div>

        </div>

        </div>
        )
      }
      




    </div>
  )
}

export default App

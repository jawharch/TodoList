import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import ToDoList from './components/toDoList';
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from './components/redux/modalSlice';

function App() {
  
 
  
  const [selectedButton, setSelectedButton] = useState(2)
  const [Priority,setPriority]=useState("")
  const [inputModal,setinputModal]=useState('')
  const handlePriorClick=(index,value)=>
  {
    setSelectedButton(index)
    setPriority(value)

  }
  const dispatch=useDispatch()
  const {showModal,ModalType}=useSelector(state=>state.modal)
 
 
  return (
    <div className='mx-auto max-w-full px-4 sm:px-6 lg:px-8 w-full md:max-w-3xl'>
      <div className='my-12'>
      <div className='flex items-center justify-between'>
        <h2 className='text-0a1629 text-4xl font-bold'>Task List</h2>
        <button onClick={()=>dispatch(openModal('create'))} className='bg-[#713fff] text-white rounded-lg shadow-md hover:shadow-lg focus:outline-none px-8 py-3 font-semibold cursor-pointer text-base '>
          
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
          <svg onClick={()=>dispatch(closeModal())} width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"  className='cursor-pointer'><path fill-rule="evenodd" clip-rule="evenodd" d="M16.0456 0.716817C15.603 0.302896 14.9103 0.302151 14.4668 0.715119L8.49994 6.27064L2.53309 0.715122C2.08954 0.302153 1.39691 0.302898 0.954273 0.716819L0.898833 0.768663C0.41891 1.21745 0.419741 1.97264 0.900651 2.4204L6.76795 7.88323L0.900653 13.3461C0.419743 13.7938 0.418912 14.549 0.898835 14.9978L0.954275 15.0496C1.39691 15.4636 2.08955 15.4643 2.53309 15.0513L8.49994 9.49582L14.4668 15.0513C14.9103 15.4643 15.603 15.4636 16.0456 15.0496L16.101 14.9978C16.581 14.549 16.5801 13.7938 16.0992 13.3461L10.2319 7.88323L16.0992 2.4204C16.5801 1.97264 16.581 1.21745 16.101 0.768661L16.0456 0.716817Z" fill="#0A1629"></path></svg>
        </div>
        <div className="mt-4">
          <label className='text-[#7d8592] text-lg block font-bold mb-2'>Task</label>
          <input
            type="text"
            placeholder="Type your task here..."
            className="bg-white border border-solid border-gray-300 rounded-lg shadow-sm font-normal outline-none px-4 py-4 w-full"
            onChange={(e)=>setinputModal(e.target.value)}
            />
        </div>

        <div className='mt-5'>
          <span className='text-gray-700 text-sm font-semibold'>
          Priority
          </span>
          <ul className='flex gap-6 mt-5 justify-center'>
            <li  className= {`border border-solid border-red-500 text-red-500 rounded-lg cursor-pointer text-base font-medium py-2 px-4 text-center uppercase w-24 border border-solid border-gray-300 ${
              selectedButton===0 ? 'bg-red-600 text-white':''
            }`}  onClick={()=>handlePriorClick(0,'high')} >high</li>
            <li  className={` border border-solid border-yellow-500 text-yellow-500 rounded-lg cursor-pointer text-base font-medium py-2 px-4 text-center uppercase w-24 border border-solid border-gray-300 ${
              selectedButton===1 ? ' bg-yellow-500 text-[#fff]':''
            }` }
            onClick={()=>handlePriorClick(1,'medium')}>medium</li>
            <li  className={`border border-solid border-green-500 text-green-500 rounded-lg cursor-pointer text-base font-medium py-2 px-4 text-center uppercase w-24 border border-solid border-gray-300
            ${
              selectedButton===2 ? ' text-[#fff]  bg-green-500':''
            } 
            
            
            `} onClick={()=>handlePriorClick(2,'low')}>low</li>
            </ul>


        </div>


        <div className='flex justify-end mt-12'>
          <button disabled={!inputModal && ModalType==='create'} className='bg-purple-600 rounded-lg shadow-md text-white cursor-pointer text-base font-semibold outline-none py-3 px-8 disabled:cursor-not-allowed disabled:bg-[#7d8592]'>
          {ModalType==='create' ? 'Add ':'Edit '}

          </button>

        </div>
      </div>
    </form>
  </div>
</div>

        )
      }
    </div>
  )
}

export default App

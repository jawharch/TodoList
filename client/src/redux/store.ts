import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import formReducer from './formSlice';
import deleteModalReducer from './deletemodalSlice';
interface Task {
  id: string

}
interface ModalState {
  showModal: boolean
  ModalType: string
  taskIdToUpdate: string | null
}

interface FormState {
  loading: boolean
  error: boolean | null
  tasksArray: Task[]
  inputModal: string
  selectedPriority: string
  
}
interface DeleteModalState {
  showdeleteModal: boolean
  taskIdToDelete: string | null
}

interface RootState {
  modal: ModalState
  form: FormState
  deletemodal: DeleteModalState
}

const store = configureStore({
  reducer: {
    modal: modalReducer,
    form: formReducer,
    deletemodal: deleteModalReducer,
  },
})

export default store;


export type { RootState }

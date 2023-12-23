import { createSlice } from "@reduxjs/toolkit";


const initialState={
    showModal:false,
    ModalType:'',
    taskIdToUpdate:null,
    

}
const modalSlice=createSlice(
    {
        name:'modal',
        initialState,
        reducers:
        {
            openModal(state,action)
            {
                const {type,id}=action.payload
                
                state.showModal=true
                state.ModalType=type
                state.taskIdToUpdate=id
                

            },
            closeModal(state)
            {
                state.showModal=false
                state.ModalType=''
                state.taskIdToUpdate=null
                

            }
        }

    }
)
export  const {openModal,closeModal}=modalSlice.actions
export default modalSlice.reducer
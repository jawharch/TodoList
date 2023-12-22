import { createSlice } from "@reduxjs/toolkit";


const initialState={
    showModal:false,
    ModalType:''

}
const modalSlice=createSlice(
    {
        name:'modal',
        initialState,
        reducers:
        {
            openModal(state,action)
            {
                state.showModal=true
                state.ModalType=action.payload

            },
            closeModal(state)
            {
                state.showModal=false
                state.ModalType=''

            }
        }

    }
)
export  const {openModal,closeModal}=modalSlice.actions
export default modalSlice.reducer
import { createSlice } from "@reduxjs/toolkit";


const initialState={
    inputModal:'',
    selectedPriority:''

}
const formSlice=createSlice(
    {
        name:'form',
        initialState,
        reducers:
        {
            setInputModal(state, action) {
                state.inputModal = action.payload;
              },
              setSelectedPriority(state, action) {
                state.selectedPriority = action.payload;
              },
        }

    }
)
export  const {setInputModal,setSelectedPriority}=formSlice.actions
export default formSlice.reducer
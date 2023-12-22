import { createSlice } from "@reduxjs/toolkit";


const initialState={
    showdeleteModal:false,
    taskIdToDelete: null,
    

}
const deletemodalSlice=createSlice(
    {
        name:'deletemodal',
        initialState,
        reducers:
        {
            opendeletedModal(state,action)
            {
                state.showdeleteModal=true
                state.taskIdToDelete=action.payload
                

            },
            closedeletedModal(state)
            {
                state.showdeleteModal=false
                state.taskIdToDelete=null
                

            }
        }

    }
)
export  const {opendeletedModal,closedeletedModal}=deletemodalSlice.actions
export default deletemodalSlice.reducer
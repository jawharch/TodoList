import { createSlice } from "@reduxjs/toolkit";


const initialState={
    showdeleteModal:false,
    

}
const deletemodalSlice=createSlice(
    {
        name:'deletemodal',
        initialState,
        reducers:
        {
            opendeletedModal(state)
            {
                state.showdeleteModal=true
                

            },
            closedeletedModal(state)
            {
                state.showdeleteModal=false
                

            }
        }

    }
)
export  const {opendeletedModal,closedeletedModal}=deletemodalSlice.actions
export default deletemodalSlice.reducer
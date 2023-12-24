import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeleteModalState {
  showdeleteModal: boolean
  taskIdToDelete: string | null
}

const initialState: DeleteModalState = {
  showdeleteModal: false,
  taskIdToDelete: null,
};

const deletemodalSlice = createSlice({
  name: 'deletemodal',
  initialState,
  reducers: {
    opendeletedModal(state, action: PayloadAction<string>) {
      state.showdeleteModal = true
      state.taskIdToDelete = action.payload
    },
    closedeletedModal(state) {
      state.showdeleteModal = false
      state.taskIdToDelete = null
    },
  },
});

export const { opendeletedModal, closedeletedModal } = deletemodalSlice.actions
export default deletemodalSlice.reducer;

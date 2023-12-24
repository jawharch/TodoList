import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

interface Task {
  id: string
  status?: string
  progress?: number | null
}

interface FormState {
  loading: boolean;
  error: boolean | null
  tasksArray: Task[]
  inputModal: string
  selectedPriority: string
  
}

const initialState: FormState = {
  loading: false,
  error: false,
  tasksArray: [],
  inputModal: '',
  selectedPriority: '',
  
}

export const taskFetch = createAsyncThunk('tasks', async (url: string) => {
  const res = await axios.get<Task[]>(url)
  return res.data;
});

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setInputModal(state, action: PayloadAction<string>) {
      state.inputModal = action.payload
    },
    setSelectedPriority(state, action: PayloadAction<string>) {
      state.selectedPriority = action.payload
    },
    addTask(state, action: PayloadAction<Task>) {
      const newTask = { ...action.payload, status: 'To Do', progress: null }
      state.tasksArray.push(newTask)
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasksArray = state.tasksArray.filter(task => task.id !== action.payload)
    },
    updateTask(state, action: PayloadAction<{ id: string; data: Partial<Task> }>) {
      const { id, data } = action.payload
      state.tasksArray = state.tasksArray.map(task => {
        if (task.id === id) {
          return {
            ...task,
            ...data,
          };
        }
        return task;
      });
    },
    AddProgressStatus(state, action: PayloadAction<{ taskId: string; status: string; progress: number }>) {
      const { taskId, status, progress } = action.payload
      const taskToUpdate = state.tasksArray.find(task => task.id === taskId)

      if (taskToUpdate) {
        taskToUpdate.status = status;
        taskToUpdate.progress = progress;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(taskFetch.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(taskFetch.fulfilled, (state, action) => {
        state.error = false;
        state.tasksArray = action.payload;
        state.loading = false;
      })
      .addCase(taskFetch.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const {
  setInputModal,
  setSelectedPriority,
  addTask,
  updateTask,
  deleteTask,
  AddProgressStatus,
} = formSlice.actions;

export default formSlice.reducer;

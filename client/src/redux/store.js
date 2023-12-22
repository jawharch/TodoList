import {configureStore} from '@reduxjs/toolkit'
import modalreducer from './modalSlice';
import formreducer from './formSlice';
import deletemodalreducer from './deletemodalSlice';
const store=configureStore(
    {
        reducer:
        {
            modal:modalreducer,
            form:formreducer,
            deletemodal:deletemodalreducer

        }

    }
    
)
export default store;
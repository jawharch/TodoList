import {configureStore} from '@reduxjs/toolkit'
import modalreducer from './modalSlice';
const store=configureStore(
    {
        reducer:
        {
            modal:modalreducer

        }

    }
    
)
export default store;
const express=require('express')
const {createTask,getAllTasks,updateTask,deleteTask,getTaskById}=require('../controllers/task.controller')

const router=express.Router()
router.get('/tasks',getAllTasks )
router.post('/create-task',createTask)
router.delete('/delete-task/:id',deleteTask)
router.put('/update-task/:id',updateTask)
router.get('/gettask/:id',getTaskById)

module.exports=router
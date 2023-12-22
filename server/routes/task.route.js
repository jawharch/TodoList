const express=require('express')
const {createTask,getAllTasks,updateTask,deleteTask}=require('../controllers/task.controller')

const router=express.Router()
router.get('/tasks',getAllTasks )
router.post('/create-task',createTask)
router.delete('/delete-task/:id',deleteTask)
router.put('/update-task/:id',updateTask)

module.exports=router
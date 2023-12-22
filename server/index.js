const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const taskRouter=require('./routes/task.route')
const cors=require('cors')
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/',taskRouter)
const { sequelize } = require('./models/Task');
sequelize.sync().then((req)=>
{
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
      

})






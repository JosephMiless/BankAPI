import express from 'express';
import { createUserTable } from './user/userModel.js';
import { alterUserTable } from './user/userModel.js';
import { userRouter } from './user/usersRoutes.js';

const app = express();

app.use(express.json());

app.get('/', (req,res) =>{
    res.json({message: "Yo"});
});

app.use('/user', userRouter);

app.listen(5000, async() => {
    await createUserTable(), alterUserTable()
     console.log("Miles")
});
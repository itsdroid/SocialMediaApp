import express from 'express';
const app = express();
app.use(express.json());
import userRouter from '../routes/usersRouter.js';
import postRouter from '../routes/postRouter.js';
import likeRouter from '../routes/likeRouter.js';
import commentRouter from '../routes/commentRouter.js';
import relationshipRouter from '../routes/relationshipRouter.js';
import authRouter from '../routes/authRouter.js';

app.get('/', (req,res) => {
    res.send('working main route');
});

app.listen(3000 , () => {
    console.log('app running on port 3000');
});

app.use('/users' , userRouter);
app.use('/posts' , postRouter);
app.use('/auths' , authRouter);
app.use('/likes' , likeRouter);
app.use('/comments' , commentRouter);
app.use('/relationships' , relationshipRouter);
export default app;
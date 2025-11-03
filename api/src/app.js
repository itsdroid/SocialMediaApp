import express from 'express';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import cors from 'cors';

import userRouter from '../routes/usersRouter.js';
import postRouter from '../routes/postRouter.js';
import likeRouter from '../routes/likeRouter.js';
import commentRouter from '../routes/commentRouter.js';
import relationshipRouter from '../routes/relationshipRouter.js';
import authRouter from '../routes/authRouter.js';

import cookieParser from 'cookie-parser';
app.use(cookieParser());

app.use(cors());

import dotenv from "dotenv";
dotenv.config();

app.get('/', (req, res) => {
    res.send('working main route');
});

app.listen(3000, () => {
    console.log('app running on port 3000');
});

// Update route paths to include /api prefix
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);
app.use('/api/likes', likeRouter);
app.use('/api/comments', commentRouter);
app.use('/api/relationships', relationshipRouter);
export default app;
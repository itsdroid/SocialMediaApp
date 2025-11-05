import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Allow credentials and specific origin (client)
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}))

app.get('/', (req, res) => {
    res.send('working main route');
});

// mount routes (use /api prefix)
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);
app.use('/api/likes', likeRouter);
app.use('/api/comments', commentRouter);
app.use('/api/relationships', relationshipRouter);

// start server after routes are set up
app.listen(3000, () => {
    console.log('app running on port 3000');
});

export default app;
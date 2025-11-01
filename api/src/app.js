import express from 'express';
const app = express();
app.use(express.json());

app.get('/', (req,res) => {
    res.send('working main route');
});

app.listen(3000 , () => {
    console.log('app running on port 3000');
});


export default app;
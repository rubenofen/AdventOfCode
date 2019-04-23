import express from 'express';
import calcEx0 from './app-ex0';
import calcEx1 from './app-ex1';


const app = express();
app.get('/ex0', (req, res) => {
    res.send("Result: " + calcEx0);
});

app.get('/ex1', (req, res) => {
    res.send("Result: " + calcEx1());
});

app.listen(3000, () => {
    console.log('Listening in port 3000');
});
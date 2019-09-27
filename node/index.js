const express = require('express');
const app = express();

var usedNum = [];
var lastCombo = [];
//Most basic form of storing values just for demo. Will make proper in future
var p = 0;
var s = 0;
var e = 0;
var f = 0;
var i = 0;
let questions = require('./krisen.json');

app.get('/api/qcheck', (req,res) =>
{
    res.send(usedNum);

})
app.post('/api/qUpdate', (req,res) => 
{
    const value = req.body;

    usedNum.push(value);

})
app.get('/api/qfetch', (req,res) =>
{
    const qNum = req.body;
    res.send(questions[qNum])
})
app.get('/api/cCheck',(req,res) =>
{
    res.send(lastCombo);
})
app.post('/api/cUpdate',(req,res) =>
{
    const comboV = req.body;
    if(lastCombo.length == 3)
    {
        lastCombo[0] = lastCombo[1];
        lastCombo[1] = lastCombo[2];
        lastCombo[2] = comboV;
    }
    if(lastCombo.length  < 3)
    {
        var index = lastCombo.length;
        lastCombo[index] = comboV;
    }
})
app.post('api/total',(req,res) =>
{
    const values = req.body;
    switch(values[0])
    {
        case "Umwelt Krisen":
            e = e + values[1];
        case "Wirtschaftskrisen":
            f = f + values[1];
        case "Politische Krisen":
            p = p + values[1];
        case "Soziale Krisen":
            s = s + values[1];
        case "Individuelle Krisen":
            i = i + values[1];
    }
        
})


app.listen(3000,() => console.log("App is listening on Port 3000"))
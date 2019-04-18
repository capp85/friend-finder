const express = require("express");

const path = require('path');

const app = express ();


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'survey.html'));
});

//app.post("/api/survey", (req,res) => {
  //  const formValues = req.body;
    //res.json(formValues);
//});

const PORT = process.env.PORT || 8889;
app.listen(PORT, () => console.log("hey im connected"));


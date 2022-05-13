const express = require('express');
const fileUpload = require('express-fileupload');

const app = express()


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(fileUpload());

// Upload Api EndP 
app.post('/upload', (req, res, next) => {
    if(req.files === null) res.status(400).json({msg: 'Missing File'})
    const file = req.files.file; 

    file.mv(`${__dirname}/uploads/${file.name}`, err => {
        if(err) {
            console.log(err);
            return res.status(500).send(err); 
        }

        res.json({fileName: file.name, filePath: `/uploads/${file.name}`})
    })
})
 

app.listen(5000, () => {
    console.log(`[*] server running on PORT 5000`);
})


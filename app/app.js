const express = require('express');
const app = express();
const port = 3000

app.listen(port, () => {
    console.log(`API listenig on port ${port}`);
})

app.get('/', (req, res) =>{
    res.json({message: 'Hello world'});
})
require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const User = require('./model/user');

const app = express();

app.use(express.json());

// Register
app.post('/register', async (req,res) =>{
    try {
        // Get user input
        const {first_name, last_name, email, password} = req.body

        // Validate user input
        if(!(email && password && first_name && last_name)){
            res.status(400).send("All input is required");
        }

        //Check if user already exist
        //Validate if user exxxist in our database
        const oldUser = await User.findOne({email});

        if (oldUser){
            return res.status(409).send("User Already Exist. Plese Login");
        }

        // Encrypt user password
        encryptedPassword = await bcrypt.hash(password,10);

        // Create user in database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        });

        const token = jwt.sign(
            {user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn:"2h"
            }
        );

        // save user token
        user.token = token

        res.status(201).json(user);        
    } catch (error) {
        console.log(error);
    }
});

// Login
app.post('/login', (req, res) => {

});


module.exports = app;
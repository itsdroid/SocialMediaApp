import express from 'express';
import db from '../src/db/connect.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



// register 
async function register(req, res) {



    // check for user existance
    const chkuser = "SELECT * FROM users WHERE username = ?";
    db.query(chkuser, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists! ");



        // creating new user 
        // hashing password
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return res.status(500).json(err);

            bcrypt.hash(req.body.password, salt, function (err, hash) {
                if (err) return res.status(500).json(err);

                const iuser = "INSERT INTO users (`username` , `email` , `password` , `name` ) VALUES (?)";

                const values = [
                    req.body.username,
                    req.body.email,
                    hash,
                    req.body.name
                ];

                db.query(iuser, [values], (err, data) => {
                    if (err) return res.status(500).json(err)
                    return res.status(200).json("User has been created");
                })
            });


        });

    })
}





// login
async function login(req, res) {
    try {
        const loginUser = "SELECT * FROM users WHERE email = ?";

        db.query(loginUser, [req.body.email], async (err, data) => {
            if (err) return res.status(500).json(err);

            if (data.length > 0) {
                const user = data[0];

                // pass verify
                const isCorrectPass = await bcrypt.compare(req.body.password, user.password);

                if (!isCorrectPass) {
                    return res.status(401).json("Invalid email or password");
                }




                const token = jwt.sign(
                    { id: user.id, email: user.email }, process.env.JWT_KEY);





                // if pass correct
                console.log("✅ You logged in!");
                res.cookie("token", token);
                return res.status(200).json("Login success");


            } else {
                return res.status(404).json("User not found");
            }
        });
    } catch (err) {
        console.error("❌ Error in login:", err);
        return res.status(500).json("Internal server error");
    }
}








function logout(req, res) {
    const token = req.cookies.token;

    if (!token) return res.status(400).json('something went wrong');
    try {
        res.clearCookie("token");
        return res.status(200).json("Logged out successfully");
    }
    catch (err) {
        console.error("Logout error:", err);
        return res.status(403).json("something went wrong");
    }
}







export default {
    login,
    register,
    logout
};




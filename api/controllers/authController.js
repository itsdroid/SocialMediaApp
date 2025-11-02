import express from 'express';
import db from '../src/db/connect.js';

function register(req, res) {
    // check for user existance
    const chkuser = "SELECT * FROM users WHERE username = ?";
    db.query(chkuser, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists! ");

        // creating new user 
        const iuser = "INSERT INTO users (`username` , `email` , `password` , `name` ) VALUES (?)"
        const values = [req.body.username, req.body.email, req.body.password, req.body.name]
        db.query(iuser, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("User has been created.");
        })
    })
}

// login function
function login(req, res) {
    const loginUser = "SELECT * FROM users WHERE email = ?"

    db.query(loginUser, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) {
            const q = "SELECT * FROM users WHERE email = ? AND password = ?";
            db.query(q, [req.body.email , req.body.password], (err, data) => {
                if(err) return res.status(500).json(err);
                if (data.length > 0) {
                     return res.status(200).json("7 karod");
                }
                else {
                    return res.status(401).json("invalid email or password");
                }
            });
        }
        else {
            return res.status(404).json("User not found");
        }
    });
}

function logout() {


}

export default {
    login,
    register,
    logout
};


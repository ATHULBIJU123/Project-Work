const { error_function } = require('../utils/response-handler');
const { success_function} = require('../utils/response-handler');
const users = require("../db/models/users")
const { mongoose } = require('mongoose');
const bcrypt = require ('bcryptjs');
const express = require('express');
const set_password_template = require('../utils/email-templates/set-password').resetPassword;
const sendEmail = require('../utils/send-email').sendEmail;



exports.getUsers = async function (req, res) {
  try {
    const userData = await users.find();
    if (userData) {
      let response = success_function({
        statusCode: 200,
        data: userData,
        message: "Datas fetched successfully",
      })
      res.status(200).send(response);
      return;
    } else {
      let response = error_function({
        statusCode: 400,
        message: "Failed to get Data",
      })
      res.status(400).send(response);
      return;
    }

  } catch (error) {
    let response = error_function({
      statusCode: 400,
      message: "Something went wrong",
    })
    console.log("error : ", error);
    res.status(400).send(response);
    return;
  }
}

exports.addNewUser = async function (req, res) {
    try {
      // const authHeader = req.headers["authorization"];
      // const token = authHeader ? authHeader.split(" ")[1] : null;

      let email = req.body.email;
      let name = req.body.name;

      function generateRandomPassword(length) {
          let charset =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$";
          let password = "";

          for (var i = 0; i < length; i++) {
            var randomIndex = Math.floor(Math.random() * charset.length);
            password += charset.charAt(randomIndex);
          }
          return password;
        }

        var randomPassword = generateRandomPassword(12);
        //console.log(randomPassword);

        let salt = bcrypt.genSaltSync(10);
        let hashed_password = bcrypt.hashSync(randomPassword, salt);
      
      //Saving user details
      let new_user = users.create({
        name,
        email,
        password : hashed_password
      });

        let email_template = await set_password_template(
          name,
          email,
        randomPassword
      );

      await sendEmail(email, "Update Password", email_template);

      let response = success_function({
        statusCode : 201,
        data : new_user,
        message : "User created successfully",
      });
      res.status(response.statusCode).send(response);
      return;
              
    } catch (error) {
      console.log("error from catch block : ", error);
      if (process.env.NODE_ENV == "production") {
        let response = error_function({
          status: 400,
          message: error
            ? error.message
              ? error.message
              : error
            : "Something went wrong",
        });
  
        res.status(response.statusCode).send(response);
        return;
      } else {
        let response = error_function({ statusCode: 400, message: error });
        res.status(response.statusCode).send(response);
        return;
      }
    }
  };

// exports.createUser = async function (req, res) {
//   try {
//       const name = req.body.name;
//       const email = req.body.email;
//       const password = req.body.password;
//       console.log("password :", password);

//       //Validations
//       if(!name) {
//           let response = error_function ({
//               statusCode : 401,
//               message : "Name is required"
//           });

//           res.status(400).send(response);
//           return;
//       }
//       else if (!email){
//           let response = error_function ({
//               statusCode : 401,
//               message : "Email is required"
//           });

//           res.status(400).send(response);
//           return;
//       }
//       else if (!password) {
//           let response = error_function ({
//               statusCode : 401,
//               message : "Password is required"
//           });

//           res.status(400).send(response);
//           return;
//       }



//       let email_count = await users.countDocuments({email});

//       if(email_count >0) {

//           let response = error_function ({
//               statusCode : 401,
//               message : "Email alrady exists"
//           });

//           res.status(400).send(response);
//           return;
//       }

//       //Validating firstname

//       let name_regexp = /^[A-Z]([a-zA-Z]{2,30})?$/;
//       let validName = name_regexp.test(name);
//       console.log("validity of name: ", validName);

//       if(!validName) {
//           let response = error_function ({
//               statusCode : 401,
//               message : "Name is invalid"
//           });

//           res.status(400).send(response);
//           return;
//       }

//       if(name.length < 2){
//           let response = error_function ({
//               statusCode : 401,
//               message : "name is too short"
//           });

//           res.status(400).send(response);
//           return;
//       }
//       if(name.length > 30){
//           let response = error_function ({
//               statusCode : 401,
//               message : "name is too long"
//           });

//           res.status(400).send(response);
//           return;
//       }


//       //validating email
//       let email_regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//       let emailvalidity = email_regexp.test(email); 
//       console.log("validity of email: ", emailvalidity);
//       if(!emailvalidity){
//           let response = error_function ({
//               statusCode : 401,
//               message : "Invalid email"
//           });

//           res.status(400).send(response);
//           return;
//       }

//       //Validating password
//       let password_regex = /^(?=.*[a-z])(?=,*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
//       let passwordvalidity = password_regex.test(password); 
//       console.log("isPasswordvalid: ",passwordvalidity);

//       if(passwordvalidity){
//           let response = error_function ({
//               statusCode : 401,
//               message : "Invalid password"
//           });
//       }
      
//       let salt = await bcrypt.genSalt(10);
//       console.log("salt :",salt);

//       let hashed_password = bcrypt.hashSync(password,salt);
//       console.log("hashed_password : ", hashed_password);

//       const new_user = new users({
//           name : name,
//           email,
//           password : hashed_password,
//           user_type : "6668bcd7a10df1c8ac10c154"
//       });

//       const saved_user = await new_user.save();

//       if(saved_user) {
//           let response = success_function ({
//               statusCode : 200,
//               data : saved_user,
//               message : "User created successfully",
//           })
//           res.status(200).send(response);
//           return;
//       }else {
//           let response = error_function ({
//               statusCode : 400,
//               message : "User creation failed",
//           })
//           res.status(400).send(response);
//           return;
//       }


//   } catch (error) {
//       let response = error_function ({
//           statusCode : 400,
//           message : "Something went wrong",
//       })
//       console.log("error : ", error);
//       res.status(400).send(response);
//       return ;
//   }
// }
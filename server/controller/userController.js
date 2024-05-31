const { error_function } = require('../utils/response-handler');
const { success_function} = require('../utils/response-handler');
const users = require("../db/models/users")
const { get, default: mongoose } = require('mongoose');
const bcrypt = require ('bcryptjs');



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

exports.createUser = async function (req, res) {
  try {
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const email = req.body.email;
      const password = req.body.password;
      console.log("password :", password);

      //Validations
      if(!firstname) {
          let response = error_function ({
              statusCode : 401,
              message : "First Name is required"
          });

          res.status(400).send(response);
          return;
      }

      else if (!lastname){
          let response = error_function ({
              statusCode : 401,
              message : "Last Name is required"
          });

          res.status(400).send(response);
          return;
      }
      else if (!email){
          let response = error_function ({
              statusCode : 401,
              message : "Email is required"
          });

          res.status(400).send(response);
          return;
      }
      else if (!password) {
          let response = error_function ({
              statusCode : 401,
              message : "Password Name is required"
          });

          res.status(400).send(response);
          return;
      }

      let email_count = await users.countDocuments({email});

      if(email_count >0) {

          let response = error_function ({
              statusCode : 401,
              message : "Email alrady exists"
          });

          res.status(400).send(response);
          return;
      }

      //Validating firstname

      let firstname_regexp = /^[A-Z]([a-zA-Z]{2,30})?$/;
      let validFirstName = firstname_regexp.test(firstname);
      console.log("validity of firstname: ", validFirstName);

      if(!validFirstName) {
          let response = error_function ({
              statusCode : 401,
              message : "First name is invalid"
          });

          res.status(400).send(response);
          return;
      }

      if(firstname.length < 2){
          let response = error_function ({
              statusCode : 401,
              message : "Firstname is too short"
          });

          res.status(400).send(response);
          return;
      }
      if(firstname.length > 30){
          let response = error_function ({
              statusCode : 401,
              message : "Firstname is too long"
          });

          res.status(400).send(response);
          return;
      }


      //Validating lastname
      let lastname_regexp = /^[A-Z]([a-zA-Z]{2,30})?$/;
      let validLastName = lastname_regexp.test(lastname);
      console.log("validity of firstname: ", validLastName);

      if(!validLastName) {
          let response = error_function ({
              statusCode : 401,
              message : "Last name is invalid"
          });

          res.status(400).send(response);
          return;
      }

      if(lastname.length < 2){
          let response = error_function ({
              statusCode : 401,
              message : "Lasstname is too short"
          });

          res.status(400).send(response);
          return;
      }
      if(lastname.length > 30){
          let response = error_function ({
              statusCode : 401,
              message : "Lastname is too long"
          });

          res.status(400).send(response);
          return;
      }


      //validating email
      let email_regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      let emailvalidity = email_regexp.test(email); 
      console.log("validity of email: ", emailvalidity);
      if(!emailvalidity){
          let response = error_function ({
              statusCode : 401,
              message : "Invalid email"
          });

          res.status(400).send(response);
          return;
      }

      //Validating password
      let password_regex = /^(?=.*[a-z])(?=,*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
      let passwordvalidity = password_regex.test(password); 
      console.log("isPasswordvalid: ",passwordvalidity);

      if(passwordvalidity){
          let response = error_function ({
              statusCode : 401,
              message : "Invalid password"
          });
      }
      
      let salt = await bcrypt.genSalt(10);
      console.log("salt :",salt);

      let hashed_password = bcrypt.hashSync(password,salt);
      console.log("hashed_password : ", hashed_password);

      const new_user = new users({
          firstName : firstname,
          lastName : lastname,
          email,
          password : hashed_password,
      });

      const saved_user = await new_user.save();

      if(saved_user) {
          let response = success_function ({
              statusCode : 200,
              data : saved_user,
              message : "User created successfully",
          })
          res.status(200).send(response);
          return;
      }else {
          let response = error_function ({
              statusCode : 400,
              message : "User creation failed",
          })
          res.status(400).send(response);
          return;
      }


  } catch (error) {
      let response = error_function ({
          statusCode : 400,
          message : "Something went wrong",
      })
      console.log("error : ", error);
      res.status(400).send(response);
      return ;
  }
}
const success_function = require("../utils/response-handler").success_function;
const error_function = require("../utils/response-handler").error_function;
const users = require("../db/models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const set_password_template =
  require("../utils/email-templates/set-password").resetPassword;
const sendEmail = require("../utils/send-email").sendEmail;

exports.createUser = async function (req) {
    return new Promise(async (resolve, reject) => {
      try {
        const authHeader = req.headers["authorization"];
        const token = authHeader ? authHeader.split(" ")[1] : null;
        let decoded = jwt.decode(token);

        const employment_information_flag = req.body.employment_information_flag;


        if (employment_information_flag === "true") {
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
          let password = bcrypt.hashSync(randomPassword, salt);
  
          user_details["password"] = password;
        } else {
          reject({
            status: 422,
            message: "Employment information is required",
          });
          return;
        }
        
        //Saving user detals
        if (saved) {
            console.log("Reached saving user details...")

            let message = "User details saved successfully";

            if (employment_information_flag === "true") {
                let email_template = await set_password_template(
                    first_name,
                    official_email,
                    randomPassword
                );

                await sendEmail(official_email, "Update Password", email_template);
                
                message = message + " and login details send to official email";
            }
        }

      }
      catch (error){
        // console.log("Error : ", error);
      if (process.env.NODE_ENV == "production")
        reject({
          status: 400,
          message: error
            ? error.message
              ? error.message
              : error
            : "Something went wrong",
        });
      else reject({ status: 400, message: error });
      }
    });
}
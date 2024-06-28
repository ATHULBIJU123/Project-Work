const {success_function, error_function} = require('../utils/response-handler')
const users = require("../db/models/users")
let jwt = require('jsonwebtoken');
let bcrypt =require('bcryptjs');
let dotenv =require('dotenv');
dotenv.config();
const  {sendEmail}  = require('../utils/send-email');

const resetPassword = require("../utils/email-templates/resetPassword").resetPassword;

exports.login = async function (req, res) {
  try {
    let email = req.body.email;
    let password = req.body.password;

    if (email && password) {
      let user = await users.findOne({
        email: email
      })
      .populate("user_type")
        console.log("user :",user);

      if (!user) {
        let response = error_function({ statusCode: 400, message: "Email is invalid" });
        res.status(response.statusCode).send(response);
        return;
      }

      let user_type = user.user_type;
      if (user) {
        //verifying password
        bcrypt.compare(password, user.password, async (error, auth) => {
          if (auth === true) {

            let access_token = jwt.sign(
              { user_id: user._id },
              process.env.PRIVATE_KEY,
              { expiresIn: "10d" }
            );
            let response = success_function({
              statusCode: 200,
              data: access_token,
              message: "Login Successful",
            });

            response.user_type = user_type;
            res.status(response.statusCode).send(response);
            return;
          } else {
            let response = error_function({
              statusCode: 401,
              message: "Invalid Credentials",
            });

            res.status(response.statusCode).send(response);
            return;
          }
        });
      } else {
        let response = error_function({
          statusCode: 401,
          message: "Invalid Credentials",
        });
        res.status(response.statusCode).send(response);
        return;
      }
    } else {
      if (!email) {
        let response = error_function({
          statusCode: 422,
          message: "Email is required",
        });
        res.status(response.statusCode).send(response);
        return;
      }
      if (!password) {
        let response = error_function({
          statusCode: 422,
          message: "Password is required",
        });
        res.status(response.statusCode).send(response);
        return;
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV == "production") {
      let response = error_function({
        statusCode: 400,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });

      res.status(response.statusCode).send(response);
      return;
    } else {
      let response = error_function({ 
      statusCode: 400,
      message: error.message ? error.message : error,
     });
      res.status(response.statusCode).send(response);
      return;
    }
  }
};

exports.forgotPasswordController = async function (req, res) {
  try {
    let email = req.body.email;

    if (email) {
      let user = await users.findOne ({email : email});
      if (user) {
        let reset_token = jwt.sign(
          {user_id : user._id},
          process.env.PRIVATE_KEY,
          { expiresIn : "10m"}
        );
        let data = await users.updateOne(
          { email: email },
          { $set: { password_token: reset_token } }
        );
        if (data.matchedCount === 1 && data.modifiedCount == 1) {
          let reset_link = `${process.env.FRONTEND_URL}/reset-password?token=${reset_token}`;
          let email_template = await resetPassword(user.name, reset_link);
          sendEmail(email, "Forgot password", email_template);

          let response = success_function({
            statusCode: 200,
            message: "Email sent successfully",
          });
          res.status(response.statusCode).send(response);
          return;

        } else if (data.matchedCount === 0) {

          let response = error_function({
            statusCode: 404,
            message: "User not found",
          });

          res.status(response.statusCode).send(response);
          return;
        } else {
          let response = error_function({
            statusCode: 400,
            message: "Password reset failed",
          });
          res.status(response.statusCode).send(response);
          return;
        }
      }else {
        let response = error_function({ statusCode: 403, message: "Forbidden" });
        res.status(response.statusCode).send(response);
        return;
      }
    } else {
      let response = error_function({
        statusCode: 422,
        message: "Email is required",
      });
      res.status(response.statusCode).send(response);
      return;
    }
    
  } catch (error) {
    if (process.env.NODE_ENV == "production") {
      let response = error_function({
        statusCode: 401,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });

      res.status(response.statusCode).send(response);
      return;
    } else {
      console.log("Error", error)
      let response = error_function({ statusCode: 405, message: error });
      res.status(response.statusCode).send(response);
      return;
    }
  }
};

exports.passwordResetController = async function (req, res) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      const response = error_function({
        statusCode: 401,
        message: "Authorization header is missing",
      });
      res.status(response.statusCode).send(response);
      return;
    }
    console.log(authHeader)
    const token = authHeader.split(" ")[1];
    console.log("token :",token)

    let {password, confirmpassword} = req.body;
    console.log("req.body", req.body)

    if (!password || !confirmpassword) {
      const response = error_function({
        statusCode: 400,
        message: "Password and confirm password are required",
      });
      res.status(response.statusCode).send(response);
      return;
    }

    if (password !== confirmpassword) {
      const response = error_function({
        statusCode: 400,
        message: "Password and confirm password do not match",
      });
      res.status(response.statusCode).send(response);
      return;
    }

    decoded = jwt.decode(token);
    console.log("user_id : ", decoded.user_id);
    console.log("Token : ", token);
    let user = await users.findOne({
      $and: [{ _id: decoded.user_id }, { password_token: token }],
    });
    if (user) {
      let salt = bcrypt.genSaltSync(10);
      let password_hash = bcrypt.hashSync(password, salt);
      let data = await users.updateOne(
        { _id: decoded.user_id },
        { $set: { password: password_hash, password_token: null } }
      );
      if (data.matchedCount === 1 && data.modifiedCount == 1) {
        let response = success_function({
          statusCode: 200,
          message: "Password changed successfully",
        });
        res.status(response.statusCode).send(response);
        return;
      } else if (data.matchedCount === 0) {
        let response = error_function({
          statusCode: 404,
          message: "User not found",
        });
        res.status(response.statusCode).send(response);
        return;
      } else {
        let response = error_function({
          statusCode: 400,
          message: "Password reset failed",
        });
        res.status(response.statusCode).send(response);
        return;
      }
    } else {
      let response = error_function({ 
        statusCode: 403, 
        message: "Forbidden" });
      res.status(response.statusCode).send(response);
      return;
    }
  } catch (error) {
    console.log(error)
    if (process.env.NODE_ENV == "production") {
      let response = error_function({
        statusCode: 400,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });

      res.status(response.statusCode).send(response);
      return;
    } else {
      let response = error_function({ 
        statusCode: 400, 
        message: error });
        res.status(response.statusCode).send(response);
      return;
    }
  }
};
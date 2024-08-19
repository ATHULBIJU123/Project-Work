const { error_function } = require('../utils/response-handler');
const { success_function } = require('../utils/response-handler');
const users = require("../db/models/users")
const { mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const express = require('express');
const set_password_template = require('../utils/email-templates/set-password').resetPassword;
const sendEmail = require('../utils/send-email').sendEmail;



exports.getUsers = async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const keyword = req.query.keyword

    let filter = {};

    if (keyword) {
      filter = {
        $or: [
          { "name": { $regex: keyword, $options: "i" } },
          { "email": { $regex: keyword, $options: "i" } }
        ]
      };
    }

    const allUsers = await users.find(filter).skip(startIndex).limit(limit);
    const totalUsers = await users.countDocuments(filter);

    //const allUsers = await users.find();
    if (allUsers && allUsers.length > 0) {

      const response = {
        statusCode: 200,
        message: "success",
        data: allUsers,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit)
      };
      res.status(200).send(response);
    } else {

      const response = {
        statusCode: 404,
        message: "No users found"
      };
      res.status(404).send(response);
    }

  } catch (error) {
    const response = {
      statusCode: 400,
      message: "Something went wrong",
    };
    console.error("Error fetching data: ", error);
    res.status(400).send(response);
  }
};

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
      password: hashed_password,
      user_type: "6668bcd7a10df1c8ac10c154"
    });

    let email_template = await set_password_template(
      name,
      email,
      randomPassword
    );

    await sendEmail(email, "Update Password", email_template);

    let response = success_function({
      statusCode: 201,
      data: new_user,
      message: "User created successfully",
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

exports.router = async function (req, res) {
  try {
    const userId = req.params.userId;
    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.log('Error fetching user details:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.Updateuser = async function (req, res) {

  const userId = req.params.userId;
  const userData = req.body;

  try {
    const updateuser = await users.findByIdAndUpdate(userId, userData, { new: true });

    if (updateuser) {
      const response = {
        statusCode: 200,
        message: "User updated successfully",
        data: updateuser
      };
      res.status(200).send(response);
    } else {
      const response = {
        statusCode: 404,
        message: "User not found"
      };
      res.status(404).send(response);
    }
  } catch (error) {
    console.log("Error updating user:", error);
    const response = {
      statusCode: 500,
      message: "Internal server error"
    };
    res.status(500).send(response);
  }
};

exports.deleteUser = async function(req, res) {
  try {
      const userId = req.params.id;

      // Validation
      // if (!userId) {
      //     let response = error_function ({
      //         statusCode : 401,
      //         message : "User Id is required"
      //     });

      //     res.status(400).send(response);
      //     return;;
      // }

      const user = await users.findById(userId);

      if (!user) {
          let response = error_function ({
              statusCode : 401,
              message : "User not found"
          });

          res.status(400).send(response);
          return;
      }

      await users.findByIdAndDelete(userId);

      let response = success_function ({
          statusCode: 200,
          message: "User deleted successfully",
      });
      res.status(200).send(response);

  } catch (error) {
      let response = error_function ({
          statusCode: 500,
          message: "Internal Server Error",
      });
      console.log("error : ", error);
      res.status(500).send(response);
  }
}

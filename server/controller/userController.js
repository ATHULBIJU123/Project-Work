const { error_function } = require('../utils/response-handler');
const { success_function} = require('../utils/response-handler');
const users = require("../db/models/users")


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
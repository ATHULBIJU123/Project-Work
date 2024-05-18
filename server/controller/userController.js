const axios = require('axios');

const { error_function } = require('../utils/response-handler');
const { success_function} = require('../utils/response-handler');

async function checkServer() {
    try {
      const response = await axios.get('http://localhost:4000/test'); // Replace with your server URL
      if (response.status === 200) {
        return success_function();
      }
    } catch (error) {
      return error_function();
    }
  }

  checkServer;

// exports.getUsers = async function (req, res) {
//     const UserModel = mongoose.model('users')
//     try {
//         const userData = await UserModel.find();
//         if(userData) {
//             let response = success_function ({
//                 statusCode : 200,
//                 data : userData,
//                 message : "Datas fetched successfully",
//             })
//             res.status(200).send(response);
//             return;
//         }else {
//             let response = error_function ({
//                 statusCode : 400,
//                 message: "Failed to get Data",
//             })
//             res.status(400).send(response);
//             return;
//         }
        
//     } catch (error) {
//         let response = error_function ({
//             statusCode : 400,
//             message : "Something went wrong",
//         })
//         console.log("error : ", error);
//         res.status(400).send(response);
//         return ;
//     } 
// }
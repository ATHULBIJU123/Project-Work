const {success_function, error_function} = require('../utils/response-handler')
exports.login = async function (req, res) {
  try {
    let email = req.body.email;
    let password = req.body.password;

    if (email && password) {
      let user = await user.findOne({
        $and: [{ email: email }],
      })
        .populate("user_type");

      if (!user) {
        let response = error_function({ "status": 400, "message": "Email invalid" });
        res.status(response.statusCode).send(response);
        return;
      }

      let user_type = user.user_type.user_type;
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
              status: 200,
              data: access_token,
              message: "Login Successful",
            });

            response.user_type = user_type;
            res.status(response.statusCode).send(response);
            return;
          } else {
            let response = error_function({
              status: 401,
              message: "Invalid Credentials",
            });

            res.status(response.statusCode).send(response);
            return;
          }
        });
      } else {
        let response = error_function({
          status: 401,
          message: "Invalid Credentials",
        });
        res.status(response.statusCode).send(response);
        return;
      }
    } else {
      if (!email) {
        let response = error_function({
          status: 422,
          message: "Email is required",
        });
        res.status(response.statusCode).send(response);
        return;
      }
      if (!password) {
        let response = error_function({
          status: 422,
          message: "Password is required",
        });
        res.status(response.statusCode).send(response);
        return;
      }
    }
  } catch (error) {
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
      let response = error_function({ status: 400, message: error });
      res.status(response.statusCode).send(response);
      return;
    }
  }
};
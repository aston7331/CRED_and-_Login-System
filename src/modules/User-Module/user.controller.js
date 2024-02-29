const { SeccessGetResponse, SuccessPostResponse, ErrorResponse } = require("../../utils/apiResponse");
const UserService = require("./user.service");
const userServiceInterface = new UserService();
const methods = {};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns Json response or Error response
 * @comment Create the User.
 */
methods.createUsers = async (req, res) => {
  try {
    const result = await userServiceInterface.createUser(req?.body);

    if (result.success) {
      const response = {
        data: result.body
      }
      return SuccessPostResponse(res, response);
    } else {
      res.status(409).json({
        msg: "Email address already exist.",
        success: false
      });
    }
  } catch (error) {
    console.log(error)
    return ErrorResponse(res, error);
  }
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns Json response or Error response
 * @comment Login the User.
 */
methods.loginUser = async (req, res) => {
  try {
    const result = await userServiceInterface.loginUser(req.body);

    if (result.success) {
      const response = {
        data: result.body,
      };
      return SeccessGetResponse(res, response);
    } else {
      res.status(401).json({
        msg: result.error,
        success: result.success
      });
    };
  } catch (error) {
    return ErrorResponse(res, error)
  }
}


methods.getUsers = async (req, res) => {
  try {
    const result = await userServiceInterface.getUsers(req.query.id)

    if (result.success) {
      const response = {
        data: result.body
      }
      return SuccessPostResponse(res, response);
    } else {
      res.status(409).json({
        msg: "Task not created",
        success: false
      });
    }
  } catch (error) {
    return ErrorResponse(res, error);
  }
}

module.exports = methods;
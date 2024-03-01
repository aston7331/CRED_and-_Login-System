const { SeccessGetResponse, SuccessPostResponse, ErrorResponse, UpdateResponse, DeleteResponse } = require("../../utils/apiResponse");
const TodoService = require("./todo.service");
const todoServiceInterface = new TodoService();
const methods = {};

/**
 * 
 * @method POST
 * @param {Request} req 
 * @param {Response} res 
 * @returns Json response or Error response
 * @comment Create the Task.
 */
methods.createTask = async (req, res) => {
  try {
    const result = await todoServiceInterface.createTask(req.body);

    if (result.success) {
      const response = {
        data: result.body
      };
      return SuccessPostResponse(res, response);
    } else {
      res.status(409).json({
        msg: "Task not created",
        success: false
      });
    };
  } catch (error) {
    return ErrorResponse(res, error);
  };
};

/**
 * 
 * @method GET
 * @param {Request} req 
 * @param {Response} res 
 * @returns Json response or Error response
 * @comment Get all the Task and also get tak by Id. 
 */
methods.getTodoList = async (req, res) => {
  try {
    const result = await todoServiceInterface.getTodoList(req.query.id);

    if (result.success) {
      const response = {
        data: result.body
      };
      return SuccessPostResponse(res, response);
    } else {
      res.status(409).json({
        msg: "Task not created",
        success: false
      });
    }
  } catch (error) {
    return ErrorResponse(res, error);
  };
};

/**
 * 
 * @method PUT
 * @param {Request} req 
 * @param {Response} res 
 * @returns Json response or Error response
 * @comment Update the task.
 */
methods.updateTask = async (req, res) => {
  try {
    const id = req?.params?.id;
    const data = req.body;

    const result = await todoServiceInterface.updateTask(id, data);
    if (result.success) {
      const response = {
        data: result.body
      };
      return UpdateResponse(res, response);
    } else {
      res.status(409).json({
        msg: "Task not created",
        success: false
      });
    };
  } catch (error) {
    return ErrorResponse(res, error);
  };
};

/**
 * 
 * @method DELETE
 * @param {Request} req 
 * @param {Response} res 
 * @returns Json response or Error response
 * @comment Delete the task.
 */
methods.deleteTask = async (req, res) => {
  try {
    const id = req?.params?.id;

    const result = await todoServiceInterface.deleteTask(id);

    if (result.success) {
      const response = {
        data: result.body
      };
      return DeleteResponse(res, response);
    }

  } catch (error) {
    return ErrorResponse(res, error);
  };
};

/**
 * 
 * @method UPDATE
 * @param {Request} req 
 * @param {Response} res 
 * @returns Json response or Error response
 * @comment Bulk status Update the task List.
 */
methods.bulkStatusUpdate = async (req, res) => {
  try {
    const data = req.body;
    const result = await todoServiceInterface.bulkStatusUpdate(data);
    if (result.success) {
      const response = {
        data: result.body
      }
      return UpdateResponse(res, response);
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

/**
 * 
 * @method DELETE
 * @param {Request} req 
 * @param {Response} res 
 * @returns Json response or Error response
 * @comment Bulk Delete the task List.
 */
methods.bulkDelete = async (req, res) => {
  try {
    const data = req.body;
    const result = await todoServiceInterface.bulkDelete(data);
    if (result.success) {
      const response = {
        data: result.body
      }
      return UpdateResponse(res, response);
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
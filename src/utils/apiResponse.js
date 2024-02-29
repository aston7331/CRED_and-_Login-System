const { ValidationError } = require("sequelize")

const ResponseStatus = {
  SUCCESS: 200,
  SUCCESS_CREATE: 201,
  BAD_REQUEST: 400,
  UNAUTHROIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  UNPROCESSABLE: 422
}

const SuccessPostResponse = (res, response) => {
  response.msg = "Record inserted Successfully";
  response.status = true;
  res.status(ResponseStatus.SUCCESS_CREATE).send(response);
}

const DeleteResponse = (res, response) => {
  response.msg = "Record delete Seccessfully";
  response.status = true;
  res.status(ResponseStatus.SUCCESS).send(response);
}

const UpdateResponse = (res, response) => {
  response.msg = "Record Updated Seccessfully";
  response.status = true;
  res.status(ResponseStatus.SUCCESS).send(response);
}

const SeccessGetResponse = (res, response) => {
  response.msg = "Record get seccessfully";
  response.status = true;
  res.status(ResponseStatus.SUCCESS).send(response);
}

const ErrorResponse = (res, err) => {
  let response = {}
  if (err instanceof ValidationError) {
    response.msg = err.errors[0].message
  } else {
    response.msg = err.message;
  }

  response.status = false;
  res.status(ResponseStatus.INTERNAL_ERROR).send(response);
}

const UnAuthorizedResponse = (res, data) => {
  if (!data) {
    data = {}
  }

  data.error = "Unauthorized";
  data.status = false;
  res.status(ResponseStatus.UNAUTHORIZED).send(data);
}

module.exports = {
  SuccessPostResponse,
  DeleteResponse,
  UpdateResponse,
  SeccessGetResponse,
  ErrorResponse,
  UnAuthorizedResponse
}
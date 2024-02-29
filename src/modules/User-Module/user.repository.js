const userModel = require("./user.model");

/**
 * 
 * @param {Object} data 
 * @returns Object
 * @comment Create the User.
 */
const createUser = async (data) => {
  const result = await userModel.create(
    data
  );
  return result;
};

/**
 * 
 * @param {String} email 
 * @returns Object
 * @comment Get the User information based on email.
 */
const findUserByEmail = async (email) => {
  const data = await userModel.findOne({
    where: { email }
  });
  return data;
};

/**
 *
 * @param { Integer } id
 * @returns Object
 * @Comment Find the user info by id.
 */
const findByLoginUserId = async (id) => {
  return userModel.findOne({
    where: { id },
    raw: true
  });
}

const getUsers = async (id) => {
  if (id) {
    return userModel.findOne({
      where: {
        id: id
      }
    })
  } else {
    return userModel.findAndCountAll()
  }
}


module.exports = {
  createUser,
  findUserByEmail,
  findByLoginUserId,
  getUsers
}
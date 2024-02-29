const { createToken } = require("../../middleware/userJWT");
const bcrypt = require("bcrypt");
const { createUser, findUserByEmail, getUsers } = require("./user.repository")

class UserService {
  /**
   * 
   * @param {Object} data 
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   * @comment Create the user.
   */
  async createUser(data) {
    try {
      let userData = {
        emp_id: data?.emp_id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        role_id: data.role_id
      };

      const salt = bcrypt.genSaltSync(10);
      const hasedPassword = bcrypt.hashSync(data?.password, salt);
      userData.password = hasedPassword;

      const checkUniqueEmail = await findUserByEmail(data?.email);

      if (checkUniqueEmail) {
        return { success: false, body: 'Email already exists' };
      } else {
        const result = await createUser(userData);
        return { success: true, body: result };
      }
    } catch (error) {
      console.log(error);
      return { success: false, error: error };
    }
  }

  /**
   * 
   * @param {Object} data 
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   * @comment Login the user.
   */
  async loginUser(data) {
    try {
      const user = await findUserByEmail(data?.email);
      const isPasswordMatched = await bcrypt.compare(
        data?.password,
        user?.password
      );

      if (!user || !isPasswordMatched) {
        return { success: false, error: "Email or Password is not matched." };
      }

      const token = await createToken(user?.id);
      return { success: true, body: { token, user } };
    } catch (error) {
      return { success: false, error: error }
    }
  }

  async getUsers(id) {
    try {
      const result = await getUsers(id)
      return { success: true, body: result };
    } catch (error) {
      return { success: false, error: error }
    }
  }
}

module.exports = UserService;
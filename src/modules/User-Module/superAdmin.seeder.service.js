const Roles = require("../../utils/roleVariable");
const UserService = require("./user.service");
const userServiceInterface = new UserService();


const seedAdmin = async () => {
  const adminUser = {
    emp_id: "",
    first_name: "Admin",
    last_name: "",
    email: "admin@osce.com",
    password: "Admin@123",
    role_id: Roles?.SuperAdmin,
  };


  const result = await userServiceInterface.createUser(adminUser);
  console.log(result)
};

module.exports = { seedAdmin }
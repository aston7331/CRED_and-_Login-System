const { createTask, getTodoList, updateTask, deleteTask } = require("./todo.repository");


class TodoService {
  /**
   * 
   * @param {Object} data 
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   * @comment Create the task.
   */
  async createTask(data) {
    try {
      const result = await createTask(data)
      return { success: true, body: result };
    } catch (error) {
      return { success: false, error: error }
    }
  }

  /**
   * 
   * @param {Integer} id 
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   * @comment Get all the Todo details.
   */
  async getTodoList(id) {
    try {
      const result = await getTodoList(id)
      return { success: true, body: result };
    } catch (error) {
      return { success: false, error: error }
    }
  }

  /**
   * 
   * @param {Integer} id 
   * @param {Object} data 
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   * @comment Update the Todo details.
   */
  async updateTask(id, data) {
    try {
      const result = await updateTask(id, data)
      return { success: true, body: result };
    } catch (error) {
      return { success: false, error: error }
    }
  }

  /**
   * 
   * @param {Integer} id 
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   * @comment Delete the Todo details.
   */
  async deleteTask(id) {
    try {
      const result = await deleteTask(id);
      console.log(result)

      return { success: true, body: result };
    } catch (error) {
      logger.error(error);
      return { success: false, error: error };
    }
  }
};

module.exports = TodoService;
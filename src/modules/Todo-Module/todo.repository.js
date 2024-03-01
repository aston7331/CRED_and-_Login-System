const todoModel = require("./todo.model");

/**
 * 
 * @param {Object} data 
 * @returns Object
 * @comment Create the Task.
 */
const createTask = async (data) => {
  return todoModel.create(data)
};

/**
 * 
 * @param {Integer} id 
 * @returns Object
 * @comment get the Task List
 */
const getTodoList = async (id) => {
  if (id) {
    return todoModel.findOne({
      where: { id }
    })
  } else {
    return todoModel.findAndCountAll()
  }
}

/**
 * 
 * @param {Integer} id 
 * @param {Object} data 
 * @returns Object
 * @comment Update the Task Details 
 */
const updateTask = async (id, data) => {
  return todoModel.update(data, {
    where: {
      id: id
    }
  });
}

/**
 * 
 * @param {Integer} id 
 * @returns Object
 * @comment Delete the Task
 */
const deleteTask = async (id) => {
  return todoModel.destroy({
    where: {
      id: id
    }
  });
}

/**
 * 
 * @param {Object} data 
 * @returns Object
 * @comment Bulk status Update the Task
 */
const bulkStatusUpdate = async (data) => {
  const ids = data?.ids;
  const status = data?.status;
  console.log(ids, status)
  return todoModel.update({
    status: status
  }, {
    where: {
      id: ids
    }
  })
}

/**
 * 
 * @param {Object} data
 * @returns Object
 * @comment Bulk Delete the Task
 */
const bulkDelete = async (data) => {
  const ids = data?.ids;
  return todoModel.destroy({
    where: {
      id: ids
    }
  })
}

module.exports = {
  createTask,
  getTodoList,
  updateTask,
  deleteTask,
  bulkStatusUpdate,
  bulkDelete
}
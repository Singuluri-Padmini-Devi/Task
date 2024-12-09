const TASK_CONSTANTS = require('./constants');

const getPaginationParams = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(
    TASK_CONSTANTS.MAX_PAGE_SIZE,
    Math.max(1, parseInt(query.limit) || TASK_CONSTANTS.DEFAULT_PAGE_SIZE)
  );
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

module.exports = { getPaginationParams };
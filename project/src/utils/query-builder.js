const buildTaskQuery = ({ status, priority, isDeleted = false }) => {
  const query = { isDeleted };
  
  if (status) {
    query.status = status;
  }
  
  if (priority) {
    query.priority = priority;
  }
  
  return query;
};

const buildSortOptions = (sortParam = '-createdAt') => {
  const validSortFields = ['createdAt', 'dueDate', 'priority'];
  const sortField = sortParam.startsWith('-') ? sortParam.slice(1) : sortParam;
  
  if (!validSortFields.includes(sortField)) {
    return '-createdAt';
  }
  
  return sortParam;
};

module.exports = {
  buildTaskQuery,
  buildSortOptions
};
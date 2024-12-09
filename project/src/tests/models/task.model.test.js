const mongoose = require('mongoose');
const Task = require('../../models/task.model');

describe('Task Model Test', () => {
  const validTaskData = {
    title: 'Test Task',
    description: 'Test Description',
    priority: 'HIGH',
    status: 'TODO'
  };

  it('should create & save task successfully', async () => {
    const validTask = new Task(validTaskData);
    const savedTask = await validTask.save();
    
    expect(savedTask._id).toBeDefined();
    expect(savedTask.title).toBe(validTaskData.title);
    expect(savedTask.createdAt).toBeDefined();
    expect(savedTask.isDeleted).toBe(false);
  });

  it('should fail to save task without required fields', async () => {
    const taskWithoutRequiredField = new Task({ description: 'Test' });
    let err;
    
    try {
      await taskWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should fail to save task with invalid priority', async () => {
    const taskWithInvalidPriority = new Task({
      ...validTaskData,
      priority: 'INVALID'
    });
    let err;
    
    try {
      await taskWithInvalidPriority.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
const taskService = require('../../services/task.service');
const Task = require('../../models/task.model');

describe('Task Service Test', () => {
  const mockTask = {
    title: 'Test Task',
    description: 'Test Description',
    priority: 'HIGH',
    status: 'TODO'
  };

  describe('createTask', () => {
    it('should create a new task', async () => {
      const task = await taskService.createTask(mockTask);
      expect(task.title).toBe(mockTask.title);
      expect(task.isDeleted).toBe(false);
    });
  });

  describe('getAllTasks', () => {
    beforeEach(async () => {
      await Task.create([
        { ...mockTask, priority: 'HIGH' },
        { ...mockTask, priority: 'LOW' },
        { ...mockTask, priority: 'MEDIUM' }
      ]);
    });

    it('should return paginated tasks', async () => {
      const result = await taskService.getAllTasks({ limit: 2, page: 1 });
      expect(result.tasks).toHaveLength(2);
      expect(result.total).toBe(3);
      expect(result.page).toBe(1);
    });

    it('should filter tasks by priority', async () => {
      const result = await taskService.getAllTasks({ priority: 'HIGH' });
      expect(result.tasks).toHaveLength(1);
      expect(result.tasks[0].priority).toBe('HIGH');
    });
  });

  describe('getTaskById', () => {
    it('should return task by id', async () => {
      const created = await Task.create(mockTask);
      const task = await taskService.getTaskById(created._id);
      expect(task.title).toBe(mockTask.title);
    });

    it('should return null for non-existent task', async () => {
      const task = await taskService.getTaskById(new mongoose.Types.ObjectId());
      expect(task).toBeNull();
    });
  });

  describe('updateTask', () => {
    it('should update task successfully', async () => {
      const created = await Task.create(mockTask);
      const updated = await taskService.updateTask(created._id, {
        title: 'Updated Title'
      });
      expect(updated.title).toBe('Updated Title');
    });
  });

  describe('deleteTask', () => {
    it('should soft delete task', async () => {
      const created = await Task.create(mockTask);
      const deleted = await taskService.deleteTask(created._id);
      expect(deleted.isDeleted).toBe(true);
      
      const task = await taskService.getTaskById(created._id);
      expect(task).toBeNull();
    });
  });
});
const request = require('supertest');
const app = require('../../server');
const Task = require('../../models/task.model');

describe('Task Controller Test', () => {
  const mockTask = {
    title: 'Test Task',
    description: 'Test Description',
    priority: 'HIGH',
    status: 'TODO'
  };

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send(mockTask);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe(mockTask.title);
    });

    it('should fail with invalid data', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test' }); // Missing required priority
      
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /api/tasks', () => {
    beforeEach(async () => {
      await Task.create([
        mockTask,
        { ...mockTask, title: 'Second Task' },
        { ...mockTask, title: 'Third Task' }
      ]);
    });

    it('should get all tasks with pagination', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .query({ page: 1, limit: 2 });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.tasks).toHaveLength(2);
      expect(res.body.total).toBe(3);
    });

    it('should filter tasks by status', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .query({ status: 'TODO' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.tasks.every(task => task.status === 'TODO')).toBe(true);
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should get task by id', async () => {
      const task = await Task.create(mockTask);
      const res = await request(app).get(`/api/tasks/${task._id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(mockTask.title);
    });

    it('should return 404 for non-existent task', async () => {
      const res = await request(app)
        .get(`/api/tasks/${new mongoose.Types.ObjectId()}`);
      
      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update task', async () => {
      const task = await Task.create(mockTask);
      const res = await request(app)
        .put(`/api/tasks/${task._id}`)
        .send({ title: 'Updated Title' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Updated Title');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should soft delete task', async () => {
      const task = await Task.create(mockTask);
      const res = await request(app).delete(`/api/tasks/${task._id}`);
      
      expect(res.statusCode).toBe(204);
      
      const deletedTask = await Task.findById(task._id);
      expect(deletedTask.isDeleted).toBe(true);
    });
  });
});


import request from 'supertest';
import { app, appContainer } from '../src/main'; // Импортируйте приложение и контейнер
import { TYPES } from '../src/types';
import { ILogger } from '../src/logger/logger.interface';

describe('TaskController', () => {
  const expressApp = app.app;
  const logger = appContainer.get<ILogger>(TYPES.LoggerService); // Получаем логгер из контейнера

  // Test for creating a task
  describe('POST /tasks/createTask', () => {
    it('should create a task successfully', async () => {
      const response = await request(expressApp)
        .post('/tasks/createTask')
        .send({
          title: "Fix critical bug",
          description: "Address the critical performance bug in the data processing module.",
          dueDate: "2023-10-25T00:00:00Z",
          priority: "MEDIUM",
          assignedMember: "Bob"
        });

      // Используем метод test для логирования
      logger.test(`POST /tasks/createTask Response: ${JSON.stringify(response.body)}`);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });
  });

  // Test for updating a task status
  describe('PUT /tasks/editTask/:id', () => {
    it('should update the task status successfully', async () => {
      const response = await request(expressApp)
        .put('/tasks/editTask/1')
        .send({
          status: "COMPLETED",
          completionDate: "2023-10-21T00:00:00Z"
        });

      // Используем метод test для логирования
      logger.test(`PUT /tasks/editTask/1 Response: ${JSON.stringify(response.body)}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'COMPLETED');
    });
  });

  // Test for getting a task by ID
  describe('GET /tasks/getTask/:id', () => {
    it('should retrieve a task by id', async () => {
      const response = await request(expressApp)
        .get('/tasks/getTask/1');

      // Используем метод test для логирования
      logger.test(`GET /tasks/getTask/1 Response: ${JSON.stringify(response.body)}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    });
  });

  // Test for getting task statistics
  describe('GET /tasks/getTaskStatistics', () => {
    it('should retrieve task statistics within the given date range', async () => {
      const response = await request(expressApp)
        .get('/tasks/getTaskStatistics')
        .query({
          startDate: '2023-10-01T00:00:00Z',
          endDate: '2023-10-30T00:00:00Z'
        });

      // Используем метод test для логирования
      logger.test(`GET /tasks/getTaskStatistics Response: ${JSON.stringify(response.body)}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('count');
      expect(response.body).toHaveProperty('averageCompletionTime');
    });
  });

  // Test for getting completed tasks by assigned member
  describe('GET /tasks/getCompletedTasks', () => {
    it('should retrieve completed tasks for a specific assigned member', async () => {
      const response = await request(expressApp)
        .get('/tasks/getCompletedTasks')
        .send({
          assignedMember: 'Alice'
        });

      // Используем метод test для логирования
      logger.test(`GET /tasks/getCompletedTasks Response: ${JSON.stringify(response.body)}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach(task => {
        expect(task).toHaveProperty('status', 'COMPLETED');
        expect(task).toHaveProperty('assignedMember', 'Alice');
      });
    });
  });
});

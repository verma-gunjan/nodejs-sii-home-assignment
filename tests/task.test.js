const request = require('supertest');
const app = require('../src/app');

describe('Task API', () => {
  it('GET /api/tasks should return 401 if no token provided', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(401);
  });
});
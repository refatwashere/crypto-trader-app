const request = require('supertest');
const app = require('../app');

describe('GET /api/prices', () => {
  test('returns 200 and JSON', async () => {
    const res = await request(app).get('/api/prices');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('BTC');
  });
});

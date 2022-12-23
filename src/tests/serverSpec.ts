import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Test api Endpoint', () => {
  it('test api endpoint Success', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toEqual(200);
  });
  it('test api endpoint failures', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(302);
  });
});

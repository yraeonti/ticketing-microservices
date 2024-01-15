import request from 'supertest';
import { app } from '../../app';

it('returns a 201', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'hghjbjhbhj'
    })
    .expect(201);
});

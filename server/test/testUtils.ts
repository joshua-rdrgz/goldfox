import supertest from 'supertest';

export type TestApp = supertest.SuperTest<supertest.Test>;

export const get = async <T>(
  testApp: TestApp,
  route: `/api/v1/${string}`,
  token?: string
): Promise<{ statusCode: number; body: T }> => {
  let res: supertest.Response;

  if (token) {
    res = await testApp.get(route).set('Authorization', `Bearer ${token}`);
  } else {
    res = await testApp.get(route);
  }

  return {
    statusCode: res.statusCode,
    body: res.body as T,
  };
};

export const post = async <T, B extends {} = {}>(
  testApp: TestApp,
  route: `/api/v1/${string}`,
  body?: B,
  token?: string
): Promise<{ statusCode: number; body: T }> => {
  let res: supertest.Response;

  if (token) {
    res = await testApp
      .post(route)
      .send(body)
      .set('Authorization', `Bearer ${token}`);
  } else {
    res = await testApp.post(route).send(body);
  }

  return {
    statusCode: res.statusCode,
    body: res.body as T,
  };
};

import { describe, it, expect } from 'vitest';
import { createApiClient, ApiError } from '../openapi';

interface MockCapture {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | null;
}

function createMockClient(responseBody: any, status = 200) {
  const capture: MockCapture = { url: '', method: '', headers: {}, body: null };

  const httpClient = async ({ url, ...rest }: any): Promise<Response> => {
    capture.url = url.toString();
    capture.method = rest.method;
    capture.headers = rest.headers || {};
    capture.body = rest.body ?? null;

    return new Response(JSON.stringify(responseBody), {
      status,
      headers: { 'content-type': 'application/json' },
    });
  };

  const api = createApiClient({ baseUrl: 'http://localhost:8000', httpClient });

  return { api, capture };
}

describe('Authentication API (openapi)', () => {
  it('auth jwt login', async () => {
    const payload = { username: 'test', password: 'pwd' };
    const { api, capture } = createMockClient({ access_token: 'abc', token_type: 'bearer' });

    const response = await api('/auth/jwt/login', 'post', { body: payload });

    expect(capture.url).toBe('http://localhost:8000/auth/jwt/login');
    expect(capture.method.toLowerCase()).toBe('post');
    expect(capture.body).toBe(JSON.stringify(payload));
    expect(response.data).toEqual({ access_token: 'abc', token_type: 'bearer' });
  });

  it('auth register', async () => {
    const payload = { email: 'a@b.com', password: 'pwd', full_name: 'Test' };
    const { api, capture } = createMockClient({ id: 'id01', email: 'a@b.com', full_name: 'Test' }, 201);

    const response = await api('/auth/register', 'post', { body: payload });

    expect(capture.url).toBe('http://localhost:8000/auth/register');
    expect(capture.method.toLowerCase()).toBe('post');
    expect(response.data).toEqual({ id: 'id01', email: 'a@b.com', full_name: 'Test' });
  });

  it('users me get + patch', async () => {
    const { api, capture } = createMockClient({ id: 'u1', email: 'u@x.com', full_name: 'User1' });

    const me = await api('/users/me', 'get');
    expect(capture.url).toBe('http://localhost:8000/users/me');
    expect(me.data).toEqual({ id: 'u1', email: 'u@x.com', full_name: 'User1' });

    const update = { full_name: 'User1X' };
    const resp2 = await api('/users/me', 'patch', { body: update });
    expect(capture.url).toBe('http://localhost:8000/users/me');
    expect(capture.body).toBe(JSON.stringify(update));
    expect(resp2.data).toEqual({ id: 'u1', email: 'u@x.com', full_name: 'User1' });
  });

  it('users id path params and authenticated-route / auth logout path', async () => {
    const { api, capture } = createMockClient({ id: 'u123', email: 'u@x.com', full_name: 'User123' });

    const user = await api('/users/{id}', 'get', { params: { id: 'u123' } });
    expect(capture.url).toBe('http://localhost:8000/users/u123');
    expect(user.data.id).toBe('u123');

    const deleteResp = await api('/users/{id}', 'delete', { params: { id: 'u123' } });
    expect(capture.url).toBe('http://localhost:8000/users/u123');
    expect(deleteResp.response.status).toBe(200); // body is still JSON

    await api('/authenticated-route', 'get');
    expect(capture.url).toBe('http://localhost:8000/authenticated-route');

    await api('/auth/jwt/logout', 'post', { body: {} });
    expect(capture.url).toBe('http://localhost:8000/auth/jwt/logout');
  });

  it('error path from user not found should throw ApiError', async () => {
    const { api } = createMockClient({ detail: 'Not found' }, 404);
    await expect(api('/users/{id}', 'get', { params: { id: 'missing' } })).rejects.toBeInstanceOf(ApiError);
  });
});

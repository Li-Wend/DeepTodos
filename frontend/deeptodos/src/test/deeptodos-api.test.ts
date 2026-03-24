import { describe, it, expect } from 'vitest';
import { createApiClient } from '../openapi';

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

describe('DeepTodos API (openapi)', () => {
  it('create and read tasks list with query params', async () => {
    const taskCreate = { id: 't1', title: 'Task 1', is_completed: false };
    const { api, capture } = createMockClient(taskCreate, 201);
    const created = await api('/deeptodos/create-task', 'post', { body: { title: 'Task 1' } });

    expect(capture.url).toBe('http://localhost:8000/deeptodos/create-task');
    expect(capture.method.toLowerCase()).toBe('post');
    expect(created.data).toEqual(taskCreate);

    const tasksSummary = await api('/deeptodos/read-tasks', 'get', { query: { skip: 0, limit: 5, is_completed: false } });
    expect(capture.url).toContain('http://localhost:8000/deeptodos/read-tasks');
    expect(capture.url).toContain('skip=0');
    expect(capture.url).toContain('limit=5');
    expect(tasksSummary.data).toEqual(taskCreate);
  });

  it('read categories and single task by id', async () => {
    const { api, capture } = createMockClient(['work', 'life']);
    const categories = await api('/deeptodos/read-categories', 'get');
    expect(capture.url).toBe('http://localhost:8000/deeptodos/read-categories');
    expect(categories.data).toEqual(['work', 'life']);

    const singleTask = await api('/deeptodos/read-task/{task_id}', 'get', { params: { task_id: 't1' } });
    expect(capture.url).toBe('http://localhost:8000/deeptodos/read-task/t1');
  });

  it('update, complete and delete task', async () => {
    const updateTask = { id: 't1', title: 'Task 1 updated', is_completed: false };
    const { api, capture } = createMockClient(updateTask);

    const updated = await api('/deeptodos/update-task/{task_id}', 'patch', { params: { task_id: 't1' }, body: { title: 'Task 1 updated' } });
    expect(capture.url).toBe('http://localhost:8000/deeptodos/update-task/t1');
    expect(updated.data).toEqual(updateTask);

    const completion = await api('/deeptodos/complete-task/{task_id}', 'post', { params: { task_id: 't1' } });
    expect(capture.url).toBe('http://localhost:8000/deeptodos/complete-task/t1');

    const deletion = await api('/deeptodos/delete-task/{task_id}', 'delete', { params: { task_id: 't1' } });
    expect(capture.url).toBe('http://localhost:8000/deeptodos/delete-task/t1');
    expect(deletion.response.status).toBe(200);
  });

  it('read tasks summary', async () => {
    const summary = [{ total: 5, completed: 2 }];
    const { api, capture } = createMockClient(summary);

    const result = await api('/deeptodos/read-tasks-summary', 'get', { query: { skip: 0, limit: 10 } });
    expect(capture.url).toContain('/deeptodos/read-tasks-summary');
    expect(result.data).toEqual(summary);
  });
});

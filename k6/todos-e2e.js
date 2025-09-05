import http from 'k6/http';
import { check, sleep, fail } from 'k6';

// ---- 可調參數 ----
export const options = {
  scenarios: {
    list: { executor: 'constant-vus', vus: 5, duration: '20s', exec: 'list' },
    create: { executor: 'constant-vus', vus: 3, duration: '20s', exec: 'create' },
  },
  thresholds: {
    http_req_failed: ['rate<0.05'],     // 失敗率 < 5%
    'checks{endpoint:list}': ['rate>0.98'],
    'checks{endpoint:create}': ['rate>0.95'],
    http_req_duration: ['p(95)<300'],   // 95p 延遲 < 300ms
  },
};

// ---- 取設定 ----
function getBaseUrl() {
  const base = __ENV.BASE_URL || 'http://localhost:3001';
  if (!base) fail('Missing BASE_URL');
  return base.replace(/\/+$/, '');
}

// ---- 測試前：註冊 → 登入，回傳 token ----
export function setup() {
  const BASE_URL = getBaseUrl();

  const username = `k6_${Date.now()}`;
  const password = 'P@ssw0rd!';

  // register
  let reg = http.post(`${BASE_URL}/api/auth/register`,
    JSON.stringify({ username, password }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  if (![201, 409].includes(reg.status)) {
    fail(`Register failed: ${reg.status} body=${reg.body}`);
  }

  // login
  let login = http.post(`${BASE_URL}/api/auth/login`,
    JSON.stringify({ username, password }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  if (login.status !== 200) {
    fail(`Login failed: ${login.status} body=${login.body}`);
  }

  const token = login.json('token');
  if (!token) fail('No token received from login');

  return { BASE_URL, token };
}

// ---- 場景一：GET /api/todos ----
export function list(data) {
  const { BASE_URL, token } = data;
  const res = http.get(`${BASE_URL}/api/todos`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status !== 200) {
    console.error(`LIST fail: ${res.status} body=${String(res.body).slice(0,200)}`);
  }
  check(res, { 'status 200': (r) => r.status === 200 }, { endpoint: 'list' });
  sleep(1);
}

// ---- 場景二：POST /api/todos ----
export function create(data) {
  const { BASE_URL, token } = data;
  const payload = JSON.stringify({ title: `k6-${Date.now()}-${__ITER}` });
  const res = http.post(`${BASE_URL}/api/todos`, payload, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });

  if (res.status !== 201) {
    console.error(`CREATE fail: ${res.status} body=${String(res.body).slice(0,200)}`);
  }
  check(res, { 'status 201': (r) => r.status === 201 }, { endpoint: 'create' });
  sleep(1);
}

async function request(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    credentials: 'include',
    ...options
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(payload.message || '请求失败，请稍后再试')
  }
  return payload
}

export function submitRegistration(data) {
  return request('/registrations', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export function loginAdmin(data) {
  return request('/admin/login', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export function logoutAdmin() {
  return request('/admin/logout', { method: 'POST' })
}

export function getAdminMe() {
  return request('/admin/me')
}

export function getRegistrations() {
  return request('/admin/registrations')
}

export function deleteRegistration(id) {
  return request(`/admin/registrations/${id}`, { method: 'DELETE' })
}

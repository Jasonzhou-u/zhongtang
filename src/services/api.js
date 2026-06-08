async function request(path, options = {}) {
  const isFormData = options.body instanceof FormData
  const response = await fetch(`/api${path}`, {
    headers: isFormData ? options.headers : { 'Content-Type': 'application/json', ...(options.headers || {}) },
    credentials: 'include',
    ...options
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(payload.message || '请求失败，请稍后再试')
  }
  return payload
}

export function getContentHome() {
  return request('/content/home')
}

export function getContentNews() {
  return request('/content/news')
}

export function getContentActivities() {
  return request('/content/activities')
}

export function getContentSpaces() {
  return request('/content/spaces')
}

export function getContentTeachers() {
  return request('/content/teachers')
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

export function getAdminContent() {
  return request('/admin/content')
}

export function saveAdminSettings(data) {
  return request('/admin/content/settings', {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

export function createContentItem(type, data) {
  return request(`/admin/content/${type}`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export function updateContentItem(type, id, data) {
  return request(`/admin/content/${type}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

export function deleteContentItem(type, id) {
  return request(`/admin/content/${type}/${encodeURIComponent(id)}`, { method: 'DELETE' })
}

export function uploadImage(data) {
  return request('/admin/upload', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

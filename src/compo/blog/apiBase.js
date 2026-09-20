const API_BASE = String(import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '')

if (!API_BASE || /^(false|null|undefined)$/i.test(API_BASE)) {
  throw new Error('VITE_API_BASE_URL is not configured. Set it in the deployment environment.')
}

export { API_BASE }
export const DOCS_API = `${API_BASE}/api/docs`
export const CATEGORIES_API = `${API_BASE}/api/docs/categories`
export const CATERORIES_API = CATEGORIES_API

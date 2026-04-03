const LOCAL_BACKEND = 'http://localhost:3001'
const RENDER_BACKEND = import.meta.env.DEV 

const normalizeBase = (url = '') => String(url).trim().replace(/\/+$/, '')

const isLocalHost = (url = '') => /localhost|127\.0\.0\.1/i.test(url)

const isBrowserLocal = () => {
  if (typeof window === 'undefined') return false
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
}

const envBase = normalizeBase(import.meta.env.VITE_API_BASE_URL)

export const API_BASE = (() => {
  if (!envBase) {
    return import.meta.env.DEV ? LOCAL_BACKEND : RENDER_BACKEND
  }

  if (isLocalHost(envBase) && !isBrowserLocal()) {
    return RENDER_BACKEND
  }

  return envBase
})()

export const DOCS_API = `${API_BASE}/api/docs`

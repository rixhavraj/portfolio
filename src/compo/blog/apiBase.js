const normaliZeBase = (url = '')=>
  String(url).trim().replace(/\/+$/, '');

/* const isBrowserLocal = ()=>{
  if(typeof window === 'undefined'){
    return false;
  }

  return(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  );
}; */

const envBase = normaliZeBase(
  import.meta.env.VITE_API_BASE_URL
);

if (!envBase || /^(false|null|undefined)$/i.test(envBase)) {
  throw new Error('VITE_API_BASE_URL is not configured. Set it in .env or the deployment environment.');
}

export const API_BASE = (()=>{
  // Use the running local API directly in development. This also works when
  // the frontend is opened under a nested path or an old Vite process.
  if(envBase){
    return envBase;
  }

  throw new Error(
    `VITE_API_BASE_URL is not configured. Set it in .env or the deployment environment.`
  );
});

export const DOCS_API = `${API_BASE}/api/docs`;
export const CATEGORIES_API = `${API_BASE}/api/docs/categories`;
// Keep the old misspelled export temporarily for any existing imports.
export const CATERORIES_API = CATEGORIES_API;

const normaliZeBase = (url = '')=>
  String(url).trim().replace(/\/+$/, '');

const isBrowserLocal = ()=>{
  if(typeof windows === 'undefined'){
    return false;
  }

  return(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  );
};

const envBase = normaliZeBase(
  import.meta.env.VITE_API_BASE_URL
);

export const API_BASE = (()=>{
  if(envBase){
    return envBase;
  }
  if(import.meta.env.DEV &&isBrowserLocal()){
    return 'http://localhost:3000';
  }

  throw new Error(
    `VITE_API_BASE_URL IS not configure.`
  );
});

export const DOCS_API = `${API_BASE}/api/docs`;
export const CATERORIES_API = `${API_BASE}//api/docs/categories`;
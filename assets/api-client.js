window.ecoloopApiFetch = (path, options = {}) => {
  const baseUrl = (window.ECOLOOP_SUPABASE?.apiBaseUrl || '').trim().replace(/\/+$/, '');
  const token = baseUrl ? sessionStorage.getItem('ecoloop_session_token') : null;
  const headers = new Headers(options.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);

  return fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
    credentials: baseUrl ? 'omit' : 'same-origin'
  });
};

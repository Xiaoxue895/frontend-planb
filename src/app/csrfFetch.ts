
import Cookies from 'js-cookie';

export async function csrfFetch(url: string, options: RequestInit = {}) {
  // Default method to GET
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== 'GET') {
    // Automatically add Content-Type header if not present
    (options.headers as Record<string, string>)['Content-Type'] =
      (options.headers as Record<string, string>)['Content-Type'] || 'application/json';

    // Read CSRF token from cookie and add it to headers
    const csrfToken = Cookies.get('csrf_token');
    if (csrfToken) {
      (options.headers as Record<string, string>)['X-CSRFToken'] = csrfToken;
    }
  }

  // Include credentials (cookies) for cross-origin requests
  options.credentials = 'include';

  const response = await fetch(url, options);

  if (response.status >= 400) {
    throw response;
  }

  return response;
}

// Call this to get CSRF token cookie from backend
export function restoreCSRF() {
  return csrfFetch('/api/auth/csrf/restore');
}

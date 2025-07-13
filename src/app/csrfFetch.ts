import Cookies from 'js-cookie';
import { API_ENDPOINTS } from '@/config/api';

export async function csrfFetch(url: string, options: RequestInit = {}) {

  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== 'GET') {

    const isFormData = options.body instanceof FormData;

    if (!isFormData) {
      (options.headers as Record<string, string>)['Content-Type'] =
        (options.headers as Record<string, string>)['Content-Type'] || 'application/json';
    }

    const csrfToken = Cookies.get('csrf_token');
    if (csrfToken) {
      (options.headers as Record<string, string>)['X-CSRFToken'] = csrfToken;
    }
  }

  options.credentials = 'include';

  const response = await fetch(url, options);

  if (response.status >= 400) {
    throw response;
  }

  return response;
}

export function restoreCSRF() {
  return csrfFetch(`${API_ENDPOINTS.auth}/csrf/restore`);
}
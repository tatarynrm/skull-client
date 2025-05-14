import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5001',
  withCredentials: true
});

// 🔄 Запит
api.interceptors.request.use(config => {
  // Початковий лічильник спроб
  (config as any)._retryCount = (config as any)._retryCount || 0;
  return config;
});

// 📩 Відповідь з обробкою помилок і retry
// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const config = error.config;

//     // Якщо помилка відповіді сервера або мережі
//     const shouldRetry = error.code === 'ECONNABORTED' || error.response?.status >= 500;

//     if (shouldRetry && config && (config as any)._retryCount < 3) {
//       (config as any)._retryCount += 1;
//       console.warn(`Retrying request... (${(config as any)._retryCount})`);
      
//       // Можна додати затримку (наприклад, 500мс)
//       await new Promise(res => setTimeout(res, 500));

//       return api(config);
//     }

//     if (error.response?.status === 401) {
//       console.warn('Unauthorized, redirecting to login...');
//       window.location.href = '/login';
//     }

//     return Promise.reject(error);
//   }
// );

export default api;

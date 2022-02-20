import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.ezfrontend.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data; // Chỉ lấy data từ cái response. Còn các dữ liệu khác trong response không quan tâm
  },
  function (error) {
    console.log('Error Response: ', error.response);
    // Lấy ra cái lỗi chi tiết để hiển thị ra
    const { config, status, data } = error.response;
    const URLS = ['/auth/local/register', '/auth/local'];
    if (URLS.includes(config.url) && status === 400) {
      const errorList = data.data || [];
      const firstError = errorList.length > 0 ? errorList[0] : {};
      const messageList = firstError.messages || [];
      const firstMessage = messageList.length > 0 ? messageList[0] : {};
      throw new Error(firstMessage.message); // Parse Error ra để thằng khác có thể gọi và hiển thị ra
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

// Lý thuyết
// + Interceptors: Mình muốn làm 1 cái gì đó cho tất cả các request hoặc là tất cả các response thì mình gắn Interceptors này vào

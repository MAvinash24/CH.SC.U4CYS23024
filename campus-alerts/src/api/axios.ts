import axios from "axios";

let cachedToken = import.meta.env.VITE_BEARER_TOKEN;

const api = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${cachedToken}`,
    clientID: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
  },
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Token invalid/expired, attempting to refresh...");
      
      try {
        const refreshResponse = await axios.post(
          `${import.meta.env.DEV ? "/api" : import.meta.env.VITE_BASE_URL}/auth`,
          {
            email: "avinash72006@gmail.com",
            clientID: import.meta.env.VITE_CLIENT_ID,
            clientSecret: import.meta.env.VITE_CLIENT_SECRET,
          }
        );

        cachedToken = refreshResponse.data.access_token || refreshResponse.data.token || refreshResponse.data.bearerToken;
        
        if (!cachedToken) {
          console.error("Token not found in auth response:", refreshResponse.data);
          throw new Error("No token in auth response");
        }
        api.defaults.headers.Authorization = `Bearer ${cachedToken}`;
        
        console.log("Token refreshed successfully");

        // Retry original request with new token
        return api(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Debug logging
console.log("Axios config:", {
  baseURL: api.defaults.baseURL,
  hasAuth: !!cachedToken,
  clientID: import.meta.env.VITE_CLIENT_ID?.substring(0, 10) + "...",
});

export default api;
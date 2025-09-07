import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      // Server responded with error status
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const complaintService = {
  getAllComplaints: () => api.get('/complaints'),
  getComplaintById: (id) => api.get(`/complaints/${id}`),
  createComplaint: (complaint) => api.post('/complaints', complaint),
  updateComplaint: (id, complaint) => api.put(`/complaints/${id}`, complaint),
  getComplaintsByStatus: (status) => api.get(`/complaints/status/${status}`),
  getComplaintsByUser: (username) => api.get(`/complaints/user/${username}`),
  getComplaintsByWorker: (username) => api.get(`/complaints/worker/${username}`),
};

// Test backend connection
export const testConnection = async () => {
  try {
    const response = await api.get('/complaints');
    console.log('Backend connection successful');
    return true;
  } catch (error) {
    console.error('Backend connection failed:', error);
    return false;
  }
};

export default api;
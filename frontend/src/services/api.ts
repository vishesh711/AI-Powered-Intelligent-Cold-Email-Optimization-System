import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// API base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

class ApiService {
  // Auth endpoints
  async login(email: string, password: string) {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  }

  async logout() {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  }

  // Prospect endpoints
  async getProspects(params?: any) {
    const response = await apiClient.get('/prospects', { params });
    return response.data;
  }

  async getProspect(id: number) {
    const response = await apiClient.get(`/prospects/${id}`);
    return response.data;
  }

  async createProspect(data: any) {
    const response = await apiClient.post('/prospects', data);
    return response.data;
  }

  async updateProspect(id: number, data: any) {
    const response = await apiClient.put(`/prospects/${id}`, data);
    return response.data;
  }

  async deleteProspect(id: number) {
    const response = await apiClient.delete(`/prospects/${id}`);
    return response.data;
  }

  async importProspects(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post('/prospects/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async segmentProspects(params: any) {
    const response = await apiClient.get('/prospects/segment', { params });
    return response.data;
  }

  // Campaign endpoints
  async getCampaigns(params?: any) {
    const response = await apiClient.get('/campaigns', { params });
    return response.data;
  }

  async getCampaign(id: number) {
    const response = await apiClient.get(`/campaigns/${id}`);
    return response.data;
  }

  async createCampaign(data: any) {
    const response = await apiClient.post('/campaigns', data);
    return response.data;
  }

  async updateCampaign(id: number, data: any) {
    const response = await apiClient.put(`/campaigns/${id}`, data);
    return response.data;
  }

  async deleteCampaign(id: number) {
    const response = await apiClient.delete(`/campaigns/${id}`);
    return response.data;
  }

  async startCampaign(id: number) {
    const response = await apiClient.post(`/campaigns/${id}/start`);
    return response.data;
  }

  async pauseCampaign(id: number) {
    const response = await apiClient.post(`/campaigns/${id}/pause`);
    return response.data;
  }

  // Email template endpoints
  async getTemplates(params?: any) {
    const response = await apiClient.get('/templates', { params });
    return response.data;
  }

  async getTemplate(id: number) {
    const response = await apiClient.get(`/templates/${id}`);
    return response.data;
  }

  async createTemplate(data: any) {
    const response = await apiClient.post('/templates', data);
    return response.data;
  }

  async updateTemplate(id: number, data: any) {
    const response = await apiClient.put(`/templates/${id}`, data);
    return response.data;
  }

  async deleteTemplate(id: number) {
    const response = await apiClient.delete(`/templates/${id}`);
    return response.data;
  }

  async generateEmailContent(params: any) {
    const response = await apiClient.post('/templates/generate', params);
    return response.data;
  }

  async sendTestEmail(params: any) {
    const response = await apiClient.post('/emails/send-test', params);
    return response.data;
  }

  // Analytics endpoints
  async getCampaignAnalytics(campaignId: number) {
    const response = await apiClient.get(`/analytics/campaigns/${campaignId}`);
    return response.data;
  }

  async getOverallAnalytics() {
    const response = await apiClient.get('/analytics/overall');
    return response.data;
  }
}

export default new ApiService(); 
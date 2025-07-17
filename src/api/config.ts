// API Configuration
export const API_BASE_URL: string = 'http://localhost:3001';

// Add other API related configurations here
export interface ApiConfig {
    baseUrl: string;
}

export const apiConfig: ApiConfig = {
    baseUrl: API_BASE_URL
};
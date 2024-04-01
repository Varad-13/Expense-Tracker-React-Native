import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getApiConfig } from './ApiConfig';

// Function to make a GET request to apiUrl/auth with a custom header
export const getAuthData = async (deviceId: string): Promise<AxiosResponse | null> => {
  try {
    // Get API configuration
    const apiConfig = await getApiConfig();
    if (!apiConfig) {
      console.error('API configuration not found.');
      return null;
    }

    // Set up the request headers
    const headers = {
      'Content-Type': 'application/json',
      DEVICEID: deviceId,
    };

    // Set up the request config
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${apiConfig.apiUrl}/auth`,
      headers,
    };

    // Make the API call
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('Error making GET request:', error);
    return null;
  }
};

